const {test, expect} = require('@playwright/test');
import { allure } from "allure-playwright";


test.describe("Navigation buttons", () => {

    test('when page count > 1, next button should be visible', async ({ page }) => {
        allure.epic("Navigation buttons");

        await page.goto('/books');
        await page.locator('[aria-label = "rows per page"]').selectOption('5');
        await expect(page.locator('.rt-tr-group')).toHaveCount(5);
        await expect(page.locator('.-next')).toBeVisible();
    });
    
    test('when page count > 1, next button should be clickable', async ({ page }) => {
        allure.epic("Navigation buttons");

        await page.goto('/books');
        await page.locator('[aria-label = "rows per page"]').selectOption('5');
    
        expect(await page.locator('[aria-label="jump to page"]').getAttribute('value')).toEqual('1');
        await page.locator('.-next').click();
        expect(await page.locator('[aria-label="jump to page"]').getAttribute('value')).toEqual('2');
    });
    
    test('when current page > 1, back button should be clickable', async ({ page }) => {
        allure.epic("Navigation buttons");

        await page.goto('/books');
        await page.locator('[aria-label = "rows per page"]').selectOption('5');
        expect(await page.locator('[aria-label="jump to page"]').getAttribute('value')).toEqual('1');
        await page.locator('.-next').click();
        expect(await page.locator('[aria-label="jump to page"]').getAttribute('value')).toEqual('2');
        await expect(page.locator('.-previous')).toBeVisible();
        await page.locator('.-previous').click();
        expect(await page.locator('[aria-label="jump to page"]').getAttribute('value')).toEqual('1');
    });
})

