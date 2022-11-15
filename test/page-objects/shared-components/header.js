/* eslint-disable no-undef */
class header {
  get headerContainer() {
    return $('[data-testid=header-container-div]');
  }
  get headerLogoIconRR() {
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

  async goToUserTablePage() {
    await this.headerTab0.click();
  }

  async goToCourseTablePage() {
    await this.headerTab1.click();
  }
}

export default new header();
