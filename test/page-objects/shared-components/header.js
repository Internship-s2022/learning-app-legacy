/* eslint-disable no-undef */
class header {
  get headerContainer() {
    return $('[data-testid=header-container-div]');
  }
  get headerlogoIconRR() {
    return $('[data-testid=header-logo-button]');
  }
  get headerTab0() {
    return $('[data-testid=tabs-header-0]');
  }
  get headerTab1() {
    return $('[data-testid=tabs-header-1]');
  }
  get headerLogOutBtn() {
    return $('[data-testid=header-logout-button]');
  }
}

export default new header();
