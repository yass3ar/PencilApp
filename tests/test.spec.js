const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const LoginPage = require('../pages/loginPage');
const ProductPage = require('../pages/productPage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkoutPage');
const testData = require('../testData/testData.json');
const logger = require('../utils/logger');

test('Complete order flow', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  try {
    // Navigate to the homepage
    await homePage.navigate();
    logger.info('Navigated to homepage');

    // Login
    await homePage.clickLoginLink();
    await loginPage.login(testData.email, testData.password);
    logger.info('Logged in successfully');

    // Add product to cart
    await homePage.clickProductsLink();
    await productPage.viewProduct();
    await productPage.addToCart();
    logger.info('Product added to cart');

    // Proceed to checkout
    await cartPage.proceedToCheckout();
    logger.info('Proceeded to checkout');

    // Enter payment details
    await checkoutPage.enterPaymentDetails(
      testData.cardName,
      testData.cardNumber,
      testData.cvc,
      testData.expiryMonth,
      testData.expiryYear
    );
    logger.info('Payment details entered');

    // Complete the order
    await checkoutPage.clickPayButton();
    logger.info('Order completed successfully');
  } catch (error) {
    logger.error(`Test failed: ${error.message}`);
    throw error;
  }
});