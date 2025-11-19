import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class UserProfilePage extends BasePage {
  readonly userProfileName: Locator;
  readonly uploadProfilePhoto: Locator;
  readonly editButton: Locator;
  readonly aqaPracticeSection: Locator;
  readonly positionLabel: Locator;
  readonly positionValue: Locator;
  readonly technologiesLabel: Locator;
  readonly technologiesValue: Locator;
  readonly emailLabel: Locator;
  readonly emailValue: Locator;
  readonly dobLabel: Locator;
  readonly dobValue: Locator;
  readonly signOutButton: Locator;
  readonly expandButton: Locator;

  constructor(page: Page) {
    super(page);

    this.userProfileName = page.locator("h1").first();
    this.uploadProfilePhoto = page
      .locator('//img[contains(@class, "w-[95px]")]')
      .nth(1);
    this.editButton = page.locator('img[alt="Edit"]');
    this.aqaPracticeSection = page.locator('div:has-text("AQA Practice")');
    this.positionLabel = page.locator('div:has-text("Position")');
    this.positionValue = page.locator('div:has-text("Position") + div');
    this.technologiesLabel = page.locator('div:has-text("Technologies")');
    this.technologiesValue = page.locator('div:has-text("Technologies") + div');
    this.emailLabel = page.locator('div:has-text("E-mail")');
    this.emailValue = page.locator('div:has-text("E-mail")+div');
    this.dobLabel = page.locator('div:has-text("Date of birth")');
    this.dobValue = page.locator('div:has-text("Date of birth") + div');
    this.signOutButton = page.locator('div:has-text("Sign Out")');
    this.expandButton = page.locator('img[alt="Expand"]');
  }

  public async checkAllElementsPresent(): Promise<void> {
    await expect(this.userProfileName).toBeVisible();
    await expect(this.editButton).toBeVisible();
    await expect(this.positionValue).toBeVisible();
    await expect(this.technologiesValue).toBeVisible();
    await expect(this.emailValue).toBeVisible();
    await expect(this.dobValue).toBeVisible();
    await expect(this.aqaPracticeSection).toBeVisible();
    await expect(this.expandButton).toBeVisible();
    await expect(this.uploadProfilePhoto).toBeVisible();
    await expect(this.signOutButton).toBeVisible();
  }

  public async checkFieldValue(
    fieldName: "Profile Name" | "Position" | "Technologies" | "Email" | "DOB",
    expectedValue: string
  ): Promise<void> {
    let locator: Locator;

    switch (fieldName) {
      case "Profile Name":
        locator = this.userProfileName;
        break;
      case "Position":
        locator = this.positionValue;
        break;
      case "Technologies":
        locator = this.technologiesValue;
        break;
      case "Email":
        locator = this.emailValue;
        break;
      case "DOB":
        locator = this.dobValue;
        break;
      default:
        throw new Error(`Unknown field: ${fieldName}`);
    }

    await expect(locator).toHaveText(expectedValue);
  }
}
