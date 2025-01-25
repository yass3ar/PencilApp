const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.locator('a[href="/login"]');
    this.productsLink = page.locator('a[href="/products"]');
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/');
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }

  async clickProductsLink() {
    await this.productsLink.click();
  }
}

module.exports = HomePage;