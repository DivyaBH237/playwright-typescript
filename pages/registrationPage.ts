import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

interface User {
    firstName: string;
    lastName: string;
    dob: string; 
    email: string;
    password: string;
    
}

export class RegistrationPage extends BasePage {
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly dobField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly confirmPasswordField: Locator;
    readonly submitButton: Locator;
    readonly signInLink: Locator;
    readonly passwordMismatchError: Locator;


    constructor(page: Page) {
        super(page);

        this.firstNameField = page.locator('input[name="firstName"]');
        this.lastNameField = page.locator('input[name="lastName"]');
        this.dobField = page.locator('input[name="dateOfBirth"]');
        this.emailField = page.locator('input[name="email"]');
        this.passwordField = page.locator('input[name="password"]');
        this.confirmPasswordField = page.locator('input[name="passwordConfirmation"]');
        this.submitButton = page.locator('button[type="submit"]');
        this.signInLink = page.locator('text=Sing in');
        this.passwordMismatchError = page.locator('span:has-text("Passwords must match")');
        
    }

    public async fillFirstName(name: string): Promise<void> {
        await this.fillInputField(this.firstNameField, name);
    }

    public async fillLastName(name: string): Promise<void> {
        await this.fillInputField(this.lastNameField, name);
    }

    public async fillDOB(dob: string): Promise<void> {
        await this.dobField.click();
        await this.fillInputField(this.dobField, dob);
        await this.dobField.click();
       
        
       
}
     public async fillEmail(): Promise<void> {
    const randomNumber = Math.floor(Math.random() * 1000);
    const paddedNumber = randomNumber.toString().padStart(3, '0');
    const email = `john${paddedNumber}@example.com`;

    await this.fillInputField(this.emailField, email);
    await this.passwordField.scrollIntoViewIfNeeded();

    console.log('Generated email:', email); 
}

    public async fillPassword(password: string): Promise<void> {
        await this.fillInputField(this.passwordField, password);
        await this.fillInputField(this.confirmPasswordField, password);
    }

    public async fillRegistrationForm(user: User): Promise<void> {
        await this.fillFirstName(user.firstName);
        await this.fillLastName(user.lastName);
        await this.fillDOB(user.dob);
        await this.fillEmail();
        await this.fillPassword(user.password);
    }

    public async clickSubmit(): Promise<void> {
        await this.closeDatePickerIfOpen();
        await this.submitButton.click();
    }

    public async clickSignIn(): Promise<void> {
        await this.signInLink.click();
    }

    public async checkPasswordMismatchError(): Promise<void> {
       await this.assertText(this.passwordMismatchError, 'Passwords must match');

    }

    public async isSubmitEnabled(): Promise<boolean> {
        return await this.submitButton.isEnabled();
    }

   public async closeDatePickerIfOpen(): Promise<void> {
    const datepicker = this.page.locator('.react-datepicker__header');
    if (await datepicker.isVisible()) {
        await this.page.mouse.click(0, 0);
        await this.page.waitForTimeout(1000);
    }
}


}
