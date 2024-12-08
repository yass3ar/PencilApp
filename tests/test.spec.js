// playwright-test.spec.js
const { test, expect } = require('@playwright/test');
const testData = require('../Data/testData.json');
const {LoginPage} = require('../POM/loginPage');
const {SpaceListPage} = require('../POM/spaceListPage');
const {SpacePage} = require('../POM/spacePage');

test('Integration Test for Pencil App', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const spaceListPage = new SpaceListPage(page);
    const spacePage = new SpacePage(page);

    // Navigate to login page and login
    await page.goto(testData.loginURL);
    await loginPage.login(testData.username, testData.password);

    // Verify page load time
    const navigationStart = performance.now();
    await page.waitForLoadState('domcontentloaded');
    const loadTime = performance.now() - navigationStart;
    expect(loadTime).toBeLessThan(1000);

    // Verify space list page UI
   await spaceListPage.verifySpaceList(testData.spaceTitle);
   await spaceListPage.verifyUIElements();

    // Enter the first space
    await spaceListPage.enterFirstSpace();

    // Draw a vertical line
    await spacePage.drawHorizontalLine(10);
    await spacePage.drawVerticalLine(50);

    // Move the line right by 10px
    await spacePage.moveElementRightBy(10);

    // Insert a text box and add text
    await spacePage.insertText(testData.textBoxContent);

   // Logout and verify redirection
   await spaceListPage.logout();
   await expect(page).toHaveURL(testData.loginURL);

    // Change URL and verify redirection
    await page.goto(testData.redirectURL);
    await expect(page).toHaveURL(testData.loginURL);
 });
