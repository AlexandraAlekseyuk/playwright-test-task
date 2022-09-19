const {test, expect} = require('@playwright/test');
import { allure } from "allure-playwright";

const validLogin = 'TestTestovich';
const validPassword = 'Poiller0987!';

const positiveLoginTestData = [
    {login: validLogin, password: validPassword, description: 'valid login and password '},
    {login: `${validLogin} `, password: validPassword, description: 'valid password and login  with extra whitespace'},
    {login: validLogin , password: `${validPassword} `, description: 'valid login and  password  with extra whitespace'},
]
for (const testData of positiveLoginTestData) {
    test(`Log-in with ${testData.description}`, async ({ page }) =>{
        allure.epic("Login test");
        allure.story("Positive");

        await page.goto('/login');
        await page.locator('#login').click();
        await page.locator('#userName').fill(testData.login);
        await page.locator('#password').fill(testData.password);
        await page.locator('#login').click();

        await expect(page).toHaveURL('/profile');
    });
}


const negativeLoginTestData = [
    {login: '', password: '', description: 'empty fields'},
    {login: validLogin, password: '', description: 'empty password and valid login'},
    {login: '', password: validPassword, description: 'empty login and valid password'},
    {login: 'invalidLogin', password: validPassword, description: 'invalid login and valid password'},
    {login: validLogin, password: 'invalidPassword', description: 'valid login and invalid password'},
    {login: 'invalidLogin', password: 'invalidPassword', description: 'invalid login and password'},

]
for ( const testData of negativeLoginTestData) {
    test(`Log-in with ${testData.description}`, async ({ page }) =>{
        allure.epic("Login test");
        allure.story("Negative");

        await page.goto('/login');
        await page.locator('#login').click();
        await page.locator('#userName').fill(testData.login);
        await page.locator('#password').fill(testData.password);
        await page.locator('#login').click();
    
        await expect(page.locator('#login')).toBeVisible();
        await expect(page).toHaveURL('/login');
    });
}



