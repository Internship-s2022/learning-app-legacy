/* eslint-disable no-undef */
class addUserPage {
  get addUser() {
    return $('[data-testid=add-users-container-section]');
  }
  get addUserTittle() {
    return $('[data-testid=add-users-container-section] h1');
  }
  get addUserText01() {
    return $('[data-testid=text-01]');
  }
  get addUserText02() {
    return $('[data-testid=text-02]');
  }

  get dniField() {
    return $('[data-testid=dni-field]');
  }
}

export default new addUserPage();
