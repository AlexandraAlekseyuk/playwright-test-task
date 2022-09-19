const {test, expect} = require('@playwright/test');
import { allure } from "allure-playwright";


const searchTestData = [
    {
        inputData: 'g', 
        expectedBookTitles: [
            'Git Pocket Guide', 
            'Learning JavaScript Design Patterns', 
            'Designing Evolvable Web APIs with ASP.NET', 
            'Speaking JavaScript', 
            'Programming JavaScript Applications',
            'Understanding ECMAScript 6'
        ], 
        description: 'search by existing char in lowercase'
    },
    {
        inputData: 'G', 
        expectedBookTitles: [
            'Git Pocket Guide', 
            'Learning JavaScript Design Patterns', 
            'Designing Evolvable Web APIs with ASP.NET', 
            'Speaking JavaScript', 
            'Programming JavaScript Applications',
            'Understanding ECMAScript 6'
        ], 
        description: 'search by existing char in uppercase'
    },
    {
        inputData: ',', 
        expectedBookTitles: ['Eloquent JavaScript, Second Edition'], 
        description: 'search by existing symbol '
    }
]
for ( const testData of searchTestData) {
    test(`Log-in with ${testData.description}`, async ({ page }) =>{
        allure.epic("Search field");

        await page.goto('/books');
        await page.locator('#searchBox').fill(testData.inputData);

        for (const expectedBookTitle of testData.expectedBookTitles) {
            await expect(page.locator(`text = ${expectedBookTitle}`)).toBeVisible();
        } 
    });
}

test('search by non-existing char', async ({ page }) => {
    allure.epic("Search field");

    await page.goto('/books');
    await page.locator('#searchBox').fill('f');
    await expect(page.locator('.rt-noData')).toBeVisible();
});