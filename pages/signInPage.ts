import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { CSS_COLORS } from "../constants/style";

export class SignInPage extends BasePage {
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;
  readonly invalidEmailAddress: Locator;
  readonly requiredErrorMessage: Locator;
  readonly passwordErrorLocator: Locator;

  constructor(page: Page) {
    super(page);

    this.emailField = page.locator('input[name="email"]');
    this.passwordField = page.locator('input[name="password"]');
    this.signInButton = page.locator('button:has-text("Sign in")');
    this.errorMessage = page.getByText("Email or password is not valid");
    this.invalidEmailAddress = page.getByText("Invalid email address");
    this.requiredErrorMessage = page.getByText("Required");
    this.passwordErrorLocator = page.getByText(
      /Maximum 20 characters|Minimum 8 characters/
    );
  }

  async fillEmail(email: string): Promise<void> {
    await this.fillInputField(this.emailField, email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.fillInputField(this.passwordField, password);
  }

  async expectInvalidLoginError(): Promise<void> {
    const count = await this.errorMessage.count();
    for (let i = 0; i < count; i++) {
      await expect(this.errorMessage.nth(i)).toBeVisible();
      await expect(this.errorMessage.nth(i)).toHaveText(
        "Email or password is not valid"
      );
    }
  }

  async expectinvalidEmailAddressError(): Promise<void> {
    await expect(this.invalidEmailAddress).toBeVisible();
    await expect(this.invalidEmailAddress).toHaveText("Invalid email address");
    await expect(this.emailField).toHaveCSS(
      CSS_COLORS.BORDER_COLOR,
      CSS_COLORS.ERROR_BORDER
    );
  }

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async requiredError(): Promise<void> {
    const count = await this.errorMessage.count();
    for (let i = 0; i < count; i++) {
      await expect(this.errorMessage.nth(i)).toBeVisible();
      await expect(this.errorMessage.nth(i)).toHaveText("Required");
      await expect(this.emailField).toHaveCSS(
        CSS_COLORS.BORDER_COLOR,
        CSS_COLORS.ERROR_BORDER
      );
    }
  }

  async validatePasswordError(expectedText: string): Promise<void> {
    await this.emailField.click();
    await expect(this.passwordErrorLocator).toHaveText(expectedText);
  }

  async expectPasswordFieldErrorBorder(field: Locator): Promise<void> {
    await expect(field).toHaveCSS(
      CSS_COLORS.BORDER_COLOR,
      CSS_COLORS.ERROR_BORDER
    );
  }
}
