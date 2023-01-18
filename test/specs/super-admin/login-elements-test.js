/* eslint-disable no-undef */
import LogInPage from '../../page-objects/General/login.page';

describe('Login elements and different errors', () => {
  beforeAll('Open Browser', () => {
    browser.url('/login');
  });

  it('Verify layout shared component', async () => {
    await expect(LogInPage.loginPageContainer).toBeDisplayed();
  });

  it('Verify Radium Learning Logo', async () => {
    await expect(LogInPage.logoContainer).toBeDisplayed();
    await expect(LogInPage.logoIconRR).toBeDisplayed();
    await expect(LogInPage.logoTextRR).toBeDisplayed();
  });
  it('Verify welcome messages', async () => {
    await expect(LogInPage.welcomeMsgContainer).toBeDisplayed();
    await expect(LogInPage.welcomeMsgTittle).toBeDisplayed();
    await expect(LogInPage.welcomeMsgText).toBeDisplayed();
  });

  it('Login attempt with empty fields', async () => {
    await LogInPage.loginClick();

    await expect(LogInPage.emailField).toBeDisplayed();
    await expect(LogInPage.emailLabel).toBeDisplayed();
    await expect(LogInPage.emailLabel).toHaveTextContaining('Ingresá tu mail');
    await expect(LogInPage.emailInput).toBeDisplayed();
    await expect(LogInPage.emailError).toBeDisplayed();
    await expect(LogInPage.emailError).toHaveTextContaining('El email es requerido');

    await expect(LogInPage.passwordField).toBeDisplayed();
    await expect(LogInPage.passwordLabel).toBeDisplayed();
    await expect(LogInPage.passwordLabel).toHaveTextContaining('Ingresá tu password');
    await expect(LogInPage.passwordInput).toBeDisplayed();
    await expect(LogInPage.passwordVisibilityBtn).toBeDisplayed();
    await LogInPage.passwordVisibilityBtnClick();
    await expect(LogInPage.passwordError).toBeDisplayed();
    await expect(LogInPage.passwordError).toHaveTextContaining('La contraseña es requerida');
  });

  it('Login attempt with invalid mail and wrong password', async () => {
    browser.refresh();
    await LogInPage.login('@radiumrocket.com', 'Passw0rd1234');
    await expect(LogInPage.emailField).toBeDisplayed();
    await expect(LogInPage.emailLabel).toBeDisplayed();
    await expect(LogInPage.emailInput).toBeDisplayed();
    await expect(LogInPage.emailError).toBeDisplayed();
    await expect(LogInPage.emailError).toHaveTextContaining('Formato de email no valido');

    await expect(LogInPage.passwordField).toBeDisplayed();
    await expect(LogInPage.passwordLabel).toBeDisplayed();
    await expect(LogInPage.passwordInput).toBeDisplayed();
    await expect(LogInPage.passwordVisibilityBtn).toBeDisplayed();
    await LogInPage.passwordVisibilityBtnClick();
    await expect(LogInPage.passwordError).toBeDisplayed();
    await expect(LogInPage.passwordError).toHaveTextContaining('');
  });

  it('Verify Buttons', async () => {
    await expect(LogInPage.logInBtn).toBeDisplayed();
    await expect(LogInPage.logInBtn).toHaveTextContaining('Ingresar');
    await expect(LogInPage.logInBtn).toBeClickable();
    await expect(LogInPage.forgotPassword).toBeDisplayed();
    await expect(LogInPage.forgotPassword).toHaveTextContaining('¿Olvidaste tu contraseña?');
    await expect(LogInPage.forgotPassword).toBeClickable();
  });
});
