import {expect, Locator,Page } from "@playwright/test";
import { BasePage } from "./basePage";
import{SignInDto} from "../dto/SignInDto";

export class SignInPage extends BasePage{
  
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;
  readonly invalidEmailAddress: Locator;
  readonly requiredErrorMessage: Locator; 
  readonly passwordErrorLocator: Locator;
  
  constructor(page:Page){
  super(page);

    this.emailField = page.locator('input[name="email"]');
    this.passwordField = page.locator('input[name="password"]');
    this.signInButton = page.locator('button:has-text("Sign in")');
    this.errorMessage = page.locator('text=Email or password is not valid');
    this.invalidEmailAddress = page.locator('text=Invalid email address');
    this.requiredErrorMessage = page.locator('text=Required');
    this.passwordErrorLocator = page.locator('text=Maximum 20 characters').or(page.locator('text=Minimum 8 characters'));

  }
   
    async fillEmail(email: string): Promise<void> {
    await this.fillInputField(this.emailField, email);
  }

   async fillPassword(password: string): Promise<void> {
    await this.fillInputField(this.passwordField, password);
  }

   async expectInvalidLoginError():Promise<void>{
    const allErrors = this.errorMessage;
    const count = await allErrors.count();
    
    for (let i = 0; i < count; i++) {
    await expect(allErrors.nth(i)).toBeVisible();
    await expect(allErrors.nth(i)).toHaveText('Email or password is not valid');
  }
   }

   async expectinvalidEmailAddressError():Promise<void>{

    await expect(this.invalidEmailAddress).toBeVisible();
    await expect(this.invalidEmailAddress).toHaveText('Invalid email address');
    await expect(this.emailField).toHaveCSS('border-color', 'rgb(244, 63, 94)');
   } 
  
   async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

   async requiredError():Promise<void>{
    const allErrors = this.requiredErrorMessage;
    const count = await allErrors.count();
    
    for (let i = 0; i < count; i++) {
    await expect(allErrors.nth(i)).toBeVisible();
    await expect(allErrors.nth(i)).toHaveText('Required');
    await expect(this.emailField).toHaveCSS('border-color', 'rgb(244, 63, 94)');
  }
   }

   async validatePasswordError(expectedText: string):Promise<void> {
    await this.page.locator('input[name="email"]').click();
    await expect(this.passwordErrorLocator).toHaveText(expectedText);
    await expect(this.passwordField).toHaveCSS('border-color', 'rgb(244, 63, 94)');
}
}