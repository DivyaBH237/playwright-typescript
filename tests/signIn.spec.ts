import{test,expect} from '../fixtures/fixtures.ts';
import { URLs } from '../constants/urls.ts';

test.describe('SignIn Page validations Tests',()=>{
    test.beforeEach(async({signInPage})=>{
      await signInPage.navigate(URLs.Login);
    });

test('[AQAPRACT-534] Sign in with valid email and password',async({signInPage }) =>{
    
    await expect(signInPage.emailField).toHaveValue('');
    await expect(signInPage.passwordField).toHaveValue('');
    await signInPage.fillEmail(process.env.TEST_EMAIL!);
    await expect(signInPage.signInButton).toBeDisabled();
    await signInPage.fillPassword(process.env.TEST_PASSWORD!);
    await signInPage.clickSignIn();
});

test('[AQAPRACT-535] Sign in with invalid email and valid password',async({signInPage })=>{

    await signInPage.fillEmail('wrong@example.com');
    await signInPage.fillPassword(process.env.TEST_PASSWORD!);
    await signInPage.clickSignIn();
    await expect(signInPage.signInButton).toBeDisabled();
    await expect(signInPage.emailField).toHaveCSS('border-color', 'rgb(244, 63, 94)');
    await signInPage.expectInvalidLoginError();
})

test('[AQAPRACT-536] Sign in with valid email and invalid password',async({signInPage })=>{

    await signInPage.fillEmail(process.env.TEST_EMAIL!);
    await signInPage.fillPassword('Password123');
    await signInPage.clickSignIn();
    await expect(signInPage.signInButton).toBeDisabled();
    await expect(signInPage.passwordField).toHaveCSS('border-color', 'rgb(244, 63, 94)');
    await signInPage.expectInvalidLoginError();
})

test('[AQAPRACT-537] Sign in with invalid email and invalid password',async({signInPage })=>{

    await signInPage.fillEmail('wrong@example.com');
    await signInPage.fillPassword('Password123');
    await expect(signInPage.signInButton).toBeEnabled();
    await signInPage.clickSignIn();
    await expect(signInPage.signInButton).toBeDisabled();
    await signInPage.expectInvalidLoginError();
    await expect(signInPage.emailField).toHaveCSS('border-color', 'rgb(244, 63, 94)');
})

test('[AQAPRACT-538] Sign in with email address with invalid format',async({signInPage})=>{

    await signInPage.fillEmail('john.doe561@example.');
    await signInPage.fillPassword(process.env.TEST_PASSWORD!);
    await signInPage.expectinvalidEmailAddressError();
    await expect(signInPage.signInButton).toBeDisabled();
})
});

test.describe('SignIn Page Email Field Validation Test',()=>{

    test('[AQAPRACT-539] Validation of empty "Email" field on "Sign in" page',async({signInPage})=>{
        await signInPage.navigate(URLs.Login);
        await signInPage.emailField.click();
        await signInPage.fillEmail("");
        await signInPage.fillPassword(process.env.TEST_PASSWORD!);
        await signInPage.requiredError();
        await expect(signInPage.signInButton).toBeDisabled();
    })
})

test.describe('SignIn Page Password Field Validation',()=>{

    test.beforeEach(async({signInPage})=>{
        await signInPage.navigate(URLs.Login);
    })

    test('[AQAPRACT-540] Validation of empty "Password" field on sign in page',async({signInPage})=>{

        await signInPage.fillEmail(process.env.TEST_EMAIL!);
        await signInPage.fillPassword("");
        await signInPage.emailField.click()
        await signInPage.requiredError();
        await expect(signInPage.signInButton).toBeDisabled();
    });

    test('[AQAPRACT-543] Validation of "Password" on 7 characters', async ({ signInPage }) => {
    await signInPage.fillEmail(process.env.TEST_EMAIL!);
    await signInPage.fillPassword('12345');
    await signInPage.validatePasswordError('Minimum 8 characters');
    await expect(signInPage.signInButton).toBeDisabled();
  });

    test('[AQAPRACT-544] Validation of "Password" on 20 characters', async ({ signInPage }) => {
    await signInPage.fillEmail(process.env.TEST_EMAIL!);
    await signInPage.fillPassword('12345678901234567890123');
    await signInPage.validatePasswordError('Maximum 20 characters');
    await expect(signInPage.signInButton).toBeDisabled();
  });
})