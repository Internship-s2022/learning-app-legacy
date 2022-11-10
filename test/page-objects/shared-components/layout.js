/* eslint-disable no-undef */
class layout {
  get layoutContainer() {
    return $('[data-testid=layout-container-div]');
  }
}

export default new layout();
