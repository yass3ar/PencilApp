const { test, expect } = require('@playwright/test');
exports.SpacePage = class SpacePage {
    constructor(page) {
        this.page = page;
        this.canvas = page.locator('#overlay-canvas')
        this.shapesButton = page.getByRole('button', { name: 'Shapes' });
        this.moveButon = page.getByRole('button', { name: 'Move' })
        this.pencilButton = page.locator('xpath=//*/button[@data-name="space-toolbar-button-draw"]')
        this.textToolButton = page.getByRole('button', { name: 'Text title' });
        this.menuButton = page.locator('button').filter({ hasText: 'menu' });
        this.leavebutton = page.getByRole('button', { name: 'Leave this Space' })
    }

    async drawVerticalLine(height) {
        const boundingBox = await this.canvas.boundingBox();
        await this.page.mouse.move(boundingBox.x + 50, boundingBox.y + 50);
        await this.page.mouse.down();
        await this.page.mouse.move(boundingBox.x + 50, boundingBox.y + 50 + height);
        await this.page.mouse.up();
    }
    async drawHorizontalLine(width) {
        const boundingBox = await this.page.locator('canvas').nth(3).boundingBox();
        await this.pencilButton.click();
        await this.page.mouse.move(boundingBox.x + 50, boundingBox.y + 50);
        await this.page.mouse.down();
        await this.page.mouse.move(boundingBox.x + 50 + width, boundingBox.y + 50);
        await this.page.mouse.up();
    }

    async moveElementRightBy(distance) {
        await this.moveButon.click();
        const box = await this.canvas.boundingBox();
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(box.x + box.width / 2 + distance, box.y + box.height / 2);
        await this.page.mouse.up();
    }

    async insertText(content) {
        await this.textToolButton.click();
        await this.page.mouse.click(100, 100); // Click on canvas
        await this.page.keyboard.type(content);
        await this.page.keyboard.press('Escape'); // Deselect text tool
    }

    async leaveSpacePage() {
        await this.menuButton.click();
        await this.leavebutton.click();
    }
}