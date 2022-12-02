/* eslint-disable no-undef */
class Tabs {
  get tabsContainer() {
    return $('[data-testid=tab-common-container]');
  }
  get tab01() {
    return $('[data-testid=tab-0]');
  }
  get tab02() {
    return $('[data-testid=tab-1]');
  }

  async goToTab01() {
    await this.tab01.click();
  }

  async goToTab02() {
    await this.tab02.click();
  }
}
export default new Tabs();
