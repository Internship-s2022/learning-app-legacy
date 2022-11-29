/* eslint-disable no-undef */
class stepper {
  get stepperContainer() {
    return $('[data-testid=stepper-container]');
  }
  get step01() {
    return $('[data-testid=step-0]');
  }
  get step02() {
    return $('[data-testid=step-1]');
  }
  get step03() {
    return $('[data-testid=step-2]');
  }
  get step04() {
    return $('[data-testid=step-3]');
  }

  get goBackBtn() {
    return $('[data-testid=goBack-button]');
  }
  get continueBtn() {
    return $('[data-testid=continue-button]');
  }

  async goBackBtnClick() {
    await this.goBackBtn.click();
    browser.pause(2000);
  }

  async continueBtnClick() {
    await this.continueBtn.click();
    browser.pause(2000);
  }
}
export default new stepper();
