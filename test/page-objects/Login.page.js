/* eslint-disable no-undef */
class LoginPage {
  get logoContainer() {
    return $('[data-testid=logo-container-div]');
  }
  get logoIconRR() {
    return $('[data-testid=logo-container-div] img');
  }
  get logoTextRR() {
    return $('[data-testid=logo-container-div] span');
  }
  get WelcomeMsgContainer() {
    return $('[data-testid=welcomeMsg-container-div]');
  }
  get WelcomeMsgTittle() {
    return $('[data-testid=welcomeMsg-container-div] h1');
  }
  get WelcomeMsgText() {
    return $('[data-testid=welcomeMsg-container-div] h3');
  }

  get LogInContainer() {
    return $('[data-testid=login-container-div]');
  }

  get EmailField() {
    return $('[data-testid=email-field]');
  }
  get EmailLabel() {
    return $('[data-testid=email-field] label');
  }
  get EmailInput() {
    return $('[data-testid=email-field] input');
  }
  get EmailError() {
    return $('[data-testid=email-field] p');
  }

  get PasswordField() {
    return $('[data-testid=password-field]');
  }
  get PasswordLabel() {
    return $('[data-testid=password-field] label');
  }
  get PasswordInput() {
    return $('[data-testid=password-field] input');
  }
  get PasswordError() {
    return $('[data-testid=password-field] p');
  }

  get ForgotPassword() {
    return $('[data-testid=login-container-section] span');
  }
  get LogInBtn() {
    return $('[data-testid=login-btn]');
  }
  // //Setters

  // async setEmail(email) {
  //   await this.EmailField.setValue(email);
  // }
  // async setPassword(password) {
  //   await this.PasswordField.setValue(password);
  // }

  //methods
  // async login(email, password) {
  //   await this.setEmail(email);
  //   await this.setPassword(password);
  //   await this.LogInBtn.click();
  // }

  async login(email, password) {
    await this.EmailInput.setValue(email);
    await this.PasswordInput.setValue(password);
    await this.LogInBtn.click();
  }

  // async clickLoginBtn() {
  //   await this.LogInBtn.click();
  // }
}

export default new LoginPage();
