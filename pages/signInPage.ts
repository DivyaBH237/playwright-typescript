import {expect, Locator,Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SignInPage extends BasePage{
  
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  
  constructor(page:Page){
  super(page);

    this.emailField = page.locator('input[@name="email"]');
    this.passwordField = page.locator('input[@name="password"]');
    this.signInButton = page.locator('button[text()="Sign in"]');
  }
   
    async fillemail(name: string): Promise<void> {
    await this.fillInputField(this.emailField, name);
  }

   async fillpassword(name: string): Promise<void> {
    await this.fillInputField(this.passwordField, name);
  }
  
   async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

}