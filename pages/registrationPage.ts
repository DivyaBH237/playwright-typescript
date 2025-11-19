import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { RegistrationDTO } from "../dto/RegistrationDto";

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
  readonly registrationLink: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameField = page.locator('input[name="firstName"]');
    this.lastNameField = page.locator('input[name="lastName"]');
    this.dobField = page.locator('input[name="dateOfBirth"]');
    this.emailField = page.locator('input[name="email"]');
    this.passwordField = page.locator('input[name="password"]');
    this.confirmPasswordField = page.locator(
      'input[name="passwordConfirmation"]'
    );
    this.submitButton = page.locator('button[type="submit"]');
    this.signInLink = page.locator("text=Sing in");
    this.registrationLink = page.locator("span", { hasText: "Registration" });
    this.passwordMismatchError = page.locator(
      'span:has-text("Passwords must match")'
    );
  }

  async fillFirstName(name: string): Promise<void> {
    await this.fillInputField(this.firstNameField, name);
  }

  async fillLastName(name: string): Promise<void> {
    await this.fillInputField(this.lastNameField, name);
  }

  async fillDOB(dob: string): Promise<void> {
    await this.dobField.click();
    await this.fillInputField(this.dobField, dob);
  }

  async fillEmail(): Promise<string> {
    const email = `john${Math.floor(Math.random() * 10000)}@example.com`;
    await this.fillInputField(this.emailField, email);
    return email;
  }

  async fillPassword(password: string): Promise<void> {
    await this.fillInputField(this.passwordField, password);
    await this.fillInputField(this.confirmPasswordField, password);
  }

  async fillRegistrationForm(user: RegistrationDTO): Promise<string> {
    await this.fillFirstName(user.firstName);
    await this.fillLastName(user.lastName);
    await this.fillDOB(user.dob);
    const email = await this.fillEmail();
    await this.fillPassword(user.password);
    return email;
  }

  async clickSubmit(): Promise<void> {
    await this.closeDatePickerIfOpen();
    await this.submitButton.click();
  }

  async clickSignIn(): Promise<void> {
    await this.signInLink.click();
  }

  async expectPasswordMismatchError(): Promise<void> {
    await expect(this.passwordMismatchError).toBeVisible();
  }

  async expectSignInLinkVisible(): Promise<void> {
    await expect(this.signInLink).toBeVisible();
  }

  async isSubmitEnabled(): Promise<boolean> {
    return this.submitButton.isEnabled();
  }

  private async closeDatePickerIfOpen(): Promise<void> {
    const datepicker = this.page.locator(".react-datepicker__header");
    if (await datepicker.isVisible()) {
      await this.page.mouse.click(0, 0);
    }
  }

  async expectRegistrationLinkVisible(): Promise<void> {
    await expect(this.registrationLink).toBeVisible();
  }

  async fillCommonFields(): Promise<void> {
    await this.fillLastName("Test");
    await this.fillDOB("01/May/1990");
    await this.fillEmail();
    await this.fillPassword("Password123!");
  }
}
