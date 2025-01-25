const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.proceedToCheckoutButton = page.locator('a[href="/checkout"]');
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}

module.exports = CartPage;