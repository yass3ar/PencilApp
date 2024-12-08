const { test, expect } = require('@playwright/test');
exports.SpaceListPage = class SpaceListPage {
    constructor(page) {
        this.page = page;
        this.spaceList = page.locator('xpath=//*/tbody');
        this.spaceItem = page.locator('xpath=//*/tbody/tr[@class="space-row ng-star-inserted"]');
        this.spaceTitle = page.locator('app-space-list-title-section');
        this.createSpaceButton = page.locator('xpath=//*[@data-name="header-spaces-create"]');
        this.enterSpaceButton = page.locator('button').filter({ hasText: 'Enter Space' })
        this.homeNav = page.locator('li').filter({ hasText: 'Home' });
        this.scheduleNav = page.locator('li').filter({ hasText: 'Schedule' });
        this.profileAvatar = page.locator('ui-header #btn-home-avatar-menu');
        this.logoutButton = page.getByRole('button', { name: 'logout Sign-out' });
    }

    async verifySpaceList(expectedTitle) {
        // await this.page.waitForSelector('xpath=//*/tbody', { timeout: 8000 })
        await expect(this.spaceList).toBeVisible()
        const spaceCount = await this.spaceItem.count();
        expect(spaceCount).toBe(1);
        const title = await this.spaceList.nth(0).textContent();
        await expect(this.spaceTitle).toContainText('My First Space');
    }

    async verifyUIElements() {
        await expect(this.homeNav).toBeVisible();
        await expect(this.scheduleNav).toBeVisible();
        await expect(this.createSpaceButton).toBeVisible();
        await expect(this.profileAvatar).toBeVisible();
    }

    async enterFirstSpace() {
        await this.enterSpaceButton.click();
    }
    async logout() {
        await this.profileAvatar.click();
        await this.logoutButton.click();
    }
}