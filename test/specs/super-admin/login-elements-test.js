/* eslint-disable no-undef */
import logInPage from '../../page-objects/General/login.page';

describe('Login elements and different errors', () => {
  beforeAll('Open Browser', () => {
    browser.url('/login');
  });

  it('Verify layout shared component', async () => {
    await expect(logInPage.loginPageContainer).toBeDisplayed();
  });

  it('Verify Radium Learning Logo', async () => {
    await expect(logInPage.logoContainer).toBeDisplayed();
    await expect(logInPage.logoIconRR).toBeDisplayed();
    await expect(logInPage.logoTextRR).toBeDisplayed();
  });
  it('Verify welcome messages', async () => {
    await expect(logInPage.WelcomeMsgContainer).toBeDisplayed();
    await expect(logInPage.WelcomeMsgTittle).toBeDisplayed();
    await expect(logInPage.WelcomeMsgText).toBeDisplayed();
  });

  it('Login attempt with empty fields', async () => {
    await logInPage.loginClick();

    await expect(logInPage.EmailField).toBeDisplayed();
    await expect(logInPage.EmailLabel).toBeDisplayed();
    await expect(logInPage.EmailLabel).toHaveTextContaining('Ingresá tu mail');
    await expect(logInPage.EmailInput).toBeDisplayed();
    await expect(logInPage.EmailError).toBeDisplayed();
    await expect(logInPage.EmailError).toHaveTextContaining('El email es requerido');

    await expect(logInPage.PasswordField).toBeDisplayed();
    await expect(logInPage.PasswordLabel).toBeDisplayed();
    await expect(logInPage.PasswordLabel).toHaveTextContaining('Ingresá tu password');
    await expect(logInPage.PasswordInput).toBeDisplayed();
    await expect(logInPage.PasswordVisibilityBtn).toBeDisplayed();
    await logInPage.passwordVisibilityBtnClick();
    await expect(logInPage.PasswordError).toBeDisplayed();
    await expect(logInPage.PasswordError).toHaveTextContaining('La contraseña es requerida');
  });

  it('Login attempt with invalid mail and wrong password', async () => {
    browser.refresh();
    await logInPage.login('@radiumrocket.com', 'Passw0rd1234');
    await expect(logInPage.EmailField).toBeDisplayed();
    await expect(logInPage.EmailLabel).toBeDisplayed();
    await expect(logInPage.EmailInput).toBeDisplayed();
    await expect(logInPage.EmailError).toBeDisplayed();
    await expect(logInPage.EmailError).toHaveTextContaining('Formato de email no valido');

    await expect(logInPage.PasswordField).toBeDisplayed();
    await expect(logInPage.PasswordLabel).toBeDisplayed();
    await expect(logInPage.PasswordInput).toBeDisplayed();
    await expect(logInPage.PasswordVisibilityBtn).toBeDisplayed();
    await logInPage.passwordVisibilityBtnClick();
    await expect(logInPage.PasswordError).toBeDisplayed();
    await expect(logInPage.PasswordError).toHaveTextContaining('');
  });

  it('Verify Buttons', async () => {
    await expect(logInPage.LogInBtn).toBeDisplayed();
    await expect(logInPage.LogInBtn).toHaveTextContaining('Ingresar');
    await expect(logInPage.LogInBtn).toBeClickable();
    await expect(logInPage.ForgotPassword).toBeDisplayed();
    await expect(logInPage.ForgotPassword).toHaveTextContaining('¿Olvidaste tu contraseña?');
    await expect(logInPage.ForgotPassword).toBeClickable();
  });
});
