/* eslint-disable no-undef */
class AddUserPage {
  get addUser() {
    return $('[data-testid=add-user-container-section]');
  }
  get addUserTittle() {
    return $('[data-testid=add-user-container-section] h1');
  }
  get addUserText01() {
    return $('[data-testid=text-01]');
  }
  get addUserText02() {
    return $('[data-testid=text-02]');
  }
  get addUserForm() {
    return $('[data-testid="add-user-container-form"]');
  }

  get dniField() {
    return $('[data-testid=dni-field]');
  }
  get dniLabel() {
    return $('[data-testid=dni-field] label');
  }
  get dniInput() {
    return $('[data-testid=dni-field] input');
  }
  get dniErrors() {
    return $('[data-testid=dni-field] p');
  }
  get dniBtn() {
    return $('[data-testid="dniBtn"]');
  }

  get nameField() {
    return $('[data-testid=firstName-field]');
  }
  get nameLabel() {
    return $('[data-testid=firstName-field] label');
  }
  get nameInput() {
    return $('[data-testid=firstName-field] input');
  }
  get nameErrors() {
    return $('[data-testid=firstName-field] p');
  }

  get lastNameField() {
    return $('[data-testid=lastName-field]');
  }
  get lastNameLabel() {
    return $('[data-testid=lastName-field] label');
  }
  get lastNameInput() {
    return $('[data-testid=lastName-field] input');
  }
  get lastNameErrors() {
    return $('[data-testid=lastName-field] p');
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
  get emailErrors() {
    return $('[data-testid=email-field] p');
  }

  get birthDateField() {
    return $('[data-testid=birthDate-field]');
  }
  get birthDateLabel() {
    return $('[data-testid=birthDate-field] label');
  }
  get birthDateInput() {
    return $('[data-testid=birthDate-field] input');
  }
  get birthDateErrors() {
    return $('[data-testid=birthDate-field] p');
  }

  get locationField() {
    return $('[data-testid=location-field]');
  }
  get locationLabel() {
    return $('[data-testid=location-field] label');
  }
  get locationInput() {
    return $('[data-testid=location-field] input');
  }
  get locationErrors() {
    return $('[data-testid=location-field] p');
  }

  get telField() {
    return $('[data-testid=phone-field]');
  }
  get telLabel() {
    return $('[data-testid=phone-field] label');
  }
  get telInput() {
    return $('[data-testid=phone-field] input');
  }
  get telErrors() {
    return $('[data-testid=phone-field] p');
  }
  get submitBtn() {
    return $('[data-testid=submitBtn]');
  }

  async dniSearch(dni) {
    await this.dniInput.setValue(dni);
    await this.dniBtn.click();
    browser.pause(20000);
  }
  async dniClear(dni) {
    await this.dniInput.clearValue(dni);
  }

  async formComplete(name, lastName, email, birthDate, location, tel) {
    await this.nameInput.setValue(name);
    await this.lastNameInput.setValue(lastName);
    await this.emailInput.setValue(email);
    await this.birthDateInput.setValue(birthDate);
    await this.locationInput.setValue(location);
    await this.telInput.setValue(tel);
  }

  async submitBtnClick() {
    await this.submitBtn.click();
    browser.pause(2000000000000);
  }
}

export default new AddUserPage();
