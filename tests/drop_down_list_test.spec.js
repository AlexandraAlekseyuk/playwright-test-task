const {test, expect} = require('@playwright/test');
import { allure } from "allure-playwright";


test.describe('Drop down books per page', () => {
    test('should be visible', async ({ page }) => {
        allure.epic("Drop down books per page selector");

        await page.goto('/books');
        await expect(page.locator('.-pageSizeOptions')).toBeVisible();
    });
    
    test('should have 10 rows by default', async ({ page }) => {
        allure.epic("Drop down books per page selector");

        await page.goto('/books');
        await expect(page.locator('.rt-tr-group')).toHaveCount(10);
    });
    
    const dropDownlist = [
        {selected: 5, description: '5 rows per page selected '},
        {selected: 25, description: '25 rows per page selected '},
        {selected: 100, description: '100 rows per page selected '},
    ]
    for (const dropDownOption of dropDownlist) {
        test(`check number of rows with ${dropDownOption.description}`, async ({ page }) =>{
            allure.epic("Drop down books per page selector");

            await page.goto('/books');
            await page.locator('[aria-label = "rows per page"]').selectOption(`${dropDownOption.selected}`);
            await expect(page.locator('.rt-tr-group')).toHaveCount(dropDownOption.selected);
        });
    }
})
