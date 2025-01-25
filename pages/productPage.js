const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
    this.viewProductButton = page.locator('a[href="/product_details/1"]');
    this.addToCartButton = page.locator('button.cart');
  }

  async viewProduct() {
    await this.viewProductButton.click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}

module.exports = ProductPage;