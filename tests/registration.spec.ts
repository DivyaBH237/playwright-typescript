import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';

test.describe('Registration Tests', () => {
    let registrationPage: RegistrationPage; 

    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page); 
        await registrationPage.navigate('https://qa-course-01.andersenlab.com/registration');
    });

    test('Availability of links Register/sign in in sign in page', async () => {
        await registrationPage.signInLink.scrollIntoViewIfNeeded();
        await expect(registrationPage.signInLink).toBeVisible();
    });

    test('Successful registration with valid data', async () => {
        const newUser = {
            firstName: 'John',
            lastName: 'Doe',
            dob: '10/07/1997',
            email: '',
            password: 'StrongPass123!'
        };

        await registrationPage.fillRegistrationForm(newUser);
        await registrationPage.clickSubmit();
        await expect(registrationPage.page).toHaveURL('https://qa-course-01.andersenlab.com/login');
    });

    test.describe('First Name Field Validations', () => {
        test.beforeEach(async () => {
            await registrationPage.navigate('https://qa-course-01.andersenlab.com/registration');
        });

        const fillCommonFields = async () => {
            await registrationPage.fillLastName('Test');
            await registrationPage.fillDOB('01/May/1990');
            await registrationPage.fillEmail();
            await registrationPage.fillPassword('Password123!');
        };

        test('Max length first name (255 characters)', async () => {
            await registrationPage.fillFirstName('A'.repeat(255));
            await fillCommonFields();
            await registrationPage.clickSubmit();
            await expect(registrationPage.page).toHaveURL('https://qa-course-01.andersenlab.com/login',({timeout:3000}));
        });

        test('Min length first name (1 character)', async () => {
            await registrationPage.fillFirstName('A');
            await fillCommonFields();
            await registrationPage.clickSubmit();
            await expect(registrationPage.page).toHaveURL('https://qa-course-01.andersenlab.com/login');
        });

        test('First name exceeding max length (256 characters)', async () => {
            await registrationPage.fillFirstName('A'.repeat(256));
            await fillCommonFields();
            await registrationPage.clickSubmit();
            await expect(registrationPage.page).toHaveURL(/registration/);
        });

        test('Empty first name', async () => {
            await registrationPage.fillFirstName('');
            await fillCommonFields();
            const isEnabled = await registrationPage.isSubmitEnabled();
            expect(isEnabled).toBeFalsy();
            await registrationPage.firstNameField.click();
            await registrationPage.firstNameField.blur();
            const errorLocator = registrationPage.page.locator('span', { hasText: 'Required' });
            await expect(errorLocator).toBeVisible({ timeout: 10000 });
        });

        test('First name with spaces', async () => {
            await registrationPage.fillFirstName('D i v y a');
            await fillCommonFields();
            await registrationPage.clickSubmit();
            await expect(registrationPage.page).toHaveURL('https://qa-course-01.andersenlab.com/login',{timeout:3000});
        });
    });

    
});
