/* eslint-disable no-undef */
class Modal {
  get modalContainer() {
    return $('[data-testid=modal-container-div]');
  }
  get modalTitle() {
    return $('[data-testid=modal-container-div] h2');
  }
  get modalText() {
    return $('[data-testid=modal-container-div] p');
  }
  get modalCancelBtn() {
    return $('[data-testid=modal-cancel-btn]');
  }
  get modalConfirmBtn() {
    return $('[data-testid=modal-confirm-btn]');
  }
  get modalContinueBtn() {
    return $('[data-testid=modal-continue-btn]');
  }

  async modalConfirmBtnClick() {
    await this.modalConfirmBtn.click();
    browser.pause(2000000000000);
  }
  async modalContinueBtnClick() {
    await this.modalContinueBtn.click();
    browser.pause(2000000000000);
  }
}

export default new Modal();
