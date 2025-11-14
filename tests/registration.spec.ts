import { test, expect } from '../fixtures/fixtures';
import { RegistrationDTO } from '../dto/RegistrationDto.ts';
import { URLs } from '../constants/urls.ts';

test.describe('Registration Tests', () => {
  test.beforeEach(async ({ registrationPage }) => {
    await registrationPage.navigate(URLs.Registration);
  });

  test('[AQAPRACT-507] Availability of links Register/sign in in sign in page', async ({ registrationPage }) => {
    await registrationPage.navigate(URLs.Registration);
    await registrationPage.expectSignInLinkVisible();
    await registrationPage.navigate(URLs.Login); 
    await registrationPage.expectRegistrationLinkVisible();
  });

  test('[AQAPRACT-508] Successful registration with valid data', async ({ registrationPage }) => {
    const newUser: RegistrationDTO = {
      firstName: 'John',
      lastName: 'Doe',
      dob: '10/07/1997',
      email: '',
      password: 'StrongPass123!',
    };

    await registrationPage.fillRegistrationForm(newUser);
    await registrationPage.clickSubmit();
    await registrationPage.page.waitForURL(URLs.Login);
  });

  test.describe('First Name Field Validations', () => {
    
    test('[AQAPRACT-514] Max length first name (255 characters)', async ({ registrationPage }) => {
      await registrationPage.fillFirstName('A'.repeat(255));
      await registrationPage.fillCommonFields();
      await registrationPage.clickSubmit();
      await registrationPage.page.waitForURL(URLs.Login);
    });

    test('[AQAPRACT-515] Min length first name (1 character)', async ({ registrationPage }) => {
      await registrationPage.fillFirstName('A');
      await registrationPage.fillCommonFields();
      await registrationPage.clickSubmit();
      await registrationPage.page.waitForURL(URLs.Login);
    });

    test('[AQAPRACT-516] First name exceeding max length (256 characters)', async ({ registrationPage }) => {
      await registrationPage.fillFirstName('A'.repeat(256));
      await registrationPage.fillCommonFields();
      await registrationPage.clickSubmit();
      await expect(registrationPage.page).toHaveURL(/registration/);
    });

    test('[AQAPRACT-517] Empty first name', async ({ registrationPage }) => {
      await registrationPage.fillFirstName('');
      await registrationPage.fillCommonFields();
      const isEnabled = await registrationPage.isSubmitEnabled();
      expect(isEnabled).toBeFalsy();
    });

    test('[AQAPRACT-518] First name with spaces', async ({ registrationPage }) => {
      await registrationPage.fillFirstName('D i v y a');
      await registrationPage.fillCommonFields();
      await registrationPage.clickSubmit();
      await registrationPage.page.waitForURL(URLs.Login);
    });
  });
});
