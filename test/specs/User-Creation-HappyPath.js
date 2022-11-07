/* eslint-disable no-undef */
import LoginPage from '../page-objects/Login.page';
import UserTablePage from '../page-objects/UsersTable.page';

describe('My Login application', () => {
  beforeAll('Open Browser', () => {
    browser.url('http://localhost:3000/login');
  });
  it('Verify Radium Learning Logo', async () => {
    await expect(LoginPage.logoContainer).toBeDisplayed();
    await expect(LoginPage.logoIconRR).toBeDisplayed();
    await expect(LoginPage.logoTextRR).toBeDisplayed();
  });
  it('Verify welcome messages', async () => {
    await expect(LoginPage.WelcomeMsgContainer).toBeDisplayed();
    await expect(LoginPage.WelcomeMsgTittle).toBeDisplayed();
    await expect(LoginPage.WelcomeMsgText).toBeDisplayed();
  });
  it('Verify login fields', async () => {
    await LoginPage.login('juli@mail.com', '');

    await expect(LoginPage.EmailField).toBeDisplayed();
    await expect(LoginPage.EmailLabel).toBeDisplayed();
    await expect(LoginPage.EmailInput).toBeDisplayed();
    await expect(LoginPage.EmailError).toBeDisplayed();

    await expect(LoginPage.PasswordField).toBeDisplayed();
    await expect(LoginPage.PasswordLabel).toBeDisplayed();
    await expect(LoginPage.PasswordInput).toBeDisplayed();
    await expect(LoginPage.PasswordError).toBeDisplayed();
  });
  it('Verify Buttons', async () => {
    await expect(LoginPage.LogInBtn).toBeDisplayed();
    await expect(LoginPage.LogInBtn).toBeClickable();
    await expect(LoginPage.ForgotPassword).toBeDisplayed();
    await expect(LoginPage.ForgotPassword).toBeClickable();
  });

  it('Login Success', async () => {
    browser.refresh();
    await LoginPage.login('super.admin@radiumrocket.com', 'Passw0rd1234');
  });

  // This test needs further investigation on how to read the elements from the inputs on material ui

  it('Verify Users Table Page header', async () => {
    await expect(UserTablePage.headerContainer).toBeDisplayed();
  });
});
