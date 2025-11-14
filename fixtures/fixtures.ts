import { test as base, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';
import { SignInPage } from '../pages/signInPage';
import { UserProfilePage } from '../pages/userProfilePage';

type MyFixtures = {
  registrationPage: RegistrationPage;
  signInPage: SignInPage;
  userProfilePage: UserProfilePage;
};

export const test = base.extend<MyFixtures>({
    
    registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
    },

  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);
    await use(signInPage);
    },

  userProfilePage: async ({ page }, use) => {
    const userProfilePage = new UserProfilePage(page);
    await use(userProfilePage);
  }
});
  
   export { expect };

