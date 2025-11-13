import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  private removeSpaces(value: string): string {
    return value.replace(/\s+/g, '');
  }

  public async fillInputField(locator: Locator, expectedValue: string): Promise<void> {
    const currentValue = await locator.inputValue();
    if (currentValue !== expectedValue) {
      await locator.fill(expectedValue);
      expect(this.removeSpaces(await locator.inputValue())).toEqual(
        this.removeSpaces(expectedValue)
      );
    }
  }

  public async assertText(locator: Locator, expectedText: string): Promise<void> {
    const actualText = (await locator.textContent())?.trim();
    expect(actualText).toBe(expectedText);
  }

  
  public async waitForVisible(locator: Locator, timeout = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }
}
