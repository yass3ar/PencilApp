const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.cardNameField = page.locator('input[name="name_on_card"]');
    this.cardNumberField = page.locator('input[name="card_number"]');
    this.cvcField = page.locator('input[name="cvc"]');
    this.expiryMonthField = page.locator('input[name="expiry_month"]');
    this.expiryYearField = page.locator('input[name="expiry_year"]');
    this.payButton = page.locator('button#submit');
  }

  async enterPaymentDetails(cardName, cardNumber, cvc, expiryMonth, expiryYear) {
    await this.cardNameField.fill(cardName);
    await this.cardNumberField.fill(cardNumber);
    await this.cvcField.fill(cvc);
    await this.expiryMonthField.fill(expiryMonth);
    await this.expiryYearField.fill(expiryYear);
  }

  async clickPayButton() {
    await this.payButton.click();
  }
}

module.exports = CheckoutPage;