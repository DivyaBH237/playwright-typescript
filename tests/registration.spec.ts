import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RegistrationDTO } from '../dto/RegistrationDto.ts';

test.describe('Registration Tests', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate('/registration');
  });

  test('[AQAPRACT-507]Availability of links Register/sign in in sign in page', async () => {
    await registrationPage.navigate('/registration');
    await registrationPage.expectSignInLinkVisible();
    await registrationPage.navigate('/login');
     await registrationPage.expectRegistrationLinkVisible();
  });

  test('[AQAPRACT-508] Successful registration with valid data', async () => {
    const newUser: RegistrationDTO = {
      firstName: 'John',
      lastName: 'Doe',
      dob: '10/07/1997',
      email: '',
      password: 'StrongPass123!',
    };

    await registrationPage.fillRegistrationForm(newUser);
    await registrationPage.clickSubmit();
    await registrationPage.page.waitForURL('/login');
  });

  test.describe('First Name Field Validations', () => {
    const fillCommonFields = async () => {
      await registrationPage.fillLastName('Test');
      await registrationPage.fillDOB('01/May/1990');
      await registrationPage.fillEmail();
      await registrationPage.fillPassword('Password123!');
    };

    test('[AQAPRACT-514] Max length first name (255 characters)', async () => {
      await registrationPage.fillFirstName('A'.repeat(255));
      await fillCommonFields();
      await registrationPage.clickSubmit();
      await registrationPage.page.waitForURL('/login');
    });

    test('[AQAPRACT-515] Min length first name (1 character)', async () => {
      await registrationPage.fillFirstName('A');
      await fillCommonFields();
      await registrationPage.clickSubmit();
      await registrationPage.page.waitForURL('/login');
    });

    test('[AQAPRACT-516] First name exceeding max length (256 characters)', async () => {
      await registrationPage.fillFirstName('A'.repeat(256));
      await fillCommonFields();
      await registrationPage.clickSubmit();
      await expect(registrationPage.page).toHaveURL(/registration/);
    });

    test('[AQAPRACT-517] Empty first name', async () => {
      await registrationPage.fillFirstName('');
      await fillCommonFields();
      const isEnabled = await registrationPage.isSubmitEnabled();
      expect(isEnabled).toBeFalsy();
      
    });

    test('[AQAPRACT-518] First name with spaces', async () => {
      await registrationPage.fillFirstName('D i v y a');
      await fillCommonFields();
      await registrationPage.clickSubmit();
      await registrationPage.page.waitForURL('/login');
    });
  });
});
