import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    private removeSpaces(value: string): string {
        return value.replace(/\s+/g, '');
    }

    public async fillInputField(locator: Locator, expectedValue: string): Promise<void> {
        if ((await locator.inputValue()) !== expectedValue) {
            await locator.fill(expectedValue);
            expect(this.removeSpaces(await locator.inputValue())).toEqual(
                this.removeSpaces(expectedValue),
            );
        }
    }

    public async assertText(locator: Locator, expectedText: string): Promise<void> {
        const actualText = await locator.textContent();
        expect(actualText?.trim()).toBe(expectedText);
    }

   public async waitForElement(locator: Locator, timeout = 5000): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout });
    }
}
