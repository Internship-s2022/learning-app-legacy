/* eslint-disable no-undef */
class Layout {
  get layoutContainer() {
    return $('[data-testid=layout-container-div]');
  }
}

export default new Layout();
