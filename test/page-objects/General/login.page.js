/* eslint-disable no-undef */
class LogInPage {
  get loginPageContainer() {
    return $('[data-testid=login-container-section]');
  }

  get logoContainer() {
    return $('[data-testid=logo-container-div]');
  }
  get logoIconRR() {
    return $('[data-testid=logo-container-div] img');
  }
  get logoTextRR() {
    return $('[data-testid=logo-container-div] span');
  }
  get welcomeMsgContainer() {
    return $('[data-testid=welcomeMsg-container-div]');
  }
  get welcomeMsgTittle() {
    return $('[data-testid=welcomeMsg-container-div] h1');
  }
  get welcomeMsgText() {
    return $('[data-testid=welcomeMsg-container-div] h6');
  }

  get logInContainer() {
    return $('[data-testid=login-container-div]');
  }

  get emailField() {
    return $('[data-testid=email-field]');
  }
  get emailLabel() {
    return $('[data-testid=email-field] label');
  }
  get emailInput() {
    return $('[data-testid=email-field] input');
  }
  get emailError() {
    return $('[data-testid=email-field] p');
  }

  get passwordField() {
    return $('[data-testid=password-field]');
  }
  get passwordLabel() {
    return $('[data-testid=password-field] label');
  }
  get passwordInput() {
    return $('[data-testid=password-field] input');
  }
  get passwordError() {
    return $('[data-testid=password-field] p');
  }
  get passwordVisibilityBtn() {
    return $('[data-testid=VisibilityIcon]');
  }

  get forgotPassword() {
    return $('[data-testid=forgotPassword-container-span] span');
  }
  get logInBtn() {
    return $('[data-testid=login-btn]');
  }

  async passwordVisibilityBtnClick() {
    await this.passwordVisibilityBtn.click();
    browser.pause(4000);
  }
  async loginClick() {
    await this.logInBtn.click();
    browser.pause(4000);
  }

  async login(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.logInBtn.click();
    browser.pause(4000);
  }
  // async clickLoginBtn() {
  //   await this.LogInBtn.click();
  // }
}

export default new LogInPage();
