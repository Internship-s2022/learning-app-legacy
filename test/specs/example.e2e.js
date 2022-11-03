/* eslint-disable no-undef */
import HomePage from '../page-objects/home.page';

describe('My Login application', () => {
  beforeAll('Open Browser', () => {
    browser.url('https://test.learning.app.radiumrocket.com/home');
  });
  it('Verify Log In Page Logo', async () => {
    await expect(HomePage.logoIconRR).toBeDisplayed();
  });
});
