const { test, expect } = require('@playwright/test');
exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailFiled = page.getByRole('button', { name: 'Continue with Email' })
        this.usernameField = page.locator('xpath=//*[@id="email-value"]');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact : true }); 
        this.passwordField = page.locator('xpath=//*[@id="password-value"]');
        }    

    async login(username, password) {
        await this.emailFiled.click();
        await this.usernameField.fill(username);
        await this.continueButton.click();
        await this.passwordField.fill(password);
        await this.continueButton.click();
    }
}