/* eslint-disable no-undef */
class UserTablePage {
  get headerContainer() {
    return $('[data-testid=layout-container-div]');
  }

  //Setters

  // async setEmail(email) {
  //   await this.EmailField.setValue(email);
  // }
  // async setPassword(password) {
  //   await this.PasswordField.setValue(password);
  // }

  // //methods
  // async login(email, password) {
  //   await this.setEmail(email);
  //   await this.setPassword(password);
  //   await this.LogInBtn.click();
  // }

  // async clickLoginBtn() {
  //   await this.LogInBtn.click();
  // }
}

export default new UserTablePage();
