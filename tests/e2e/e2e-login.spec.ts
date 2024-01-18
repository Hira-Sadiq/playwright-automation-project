import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel('Login / Logout Flow', () => {
  let loginPage: LoginPage
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    homePage = new HomePage(page)

    await homePage.visit()
  })

  test('Negative Scenario for login', async () => {
    await homePage.clickOnSignIn()
    await loginPage.login('invalid username', 'invalid password')
    await loginPage.wait(3000)
    await loginPage.assertErrorMessage()
  })

  test('Positive Scenario for login + logout', async ({ page }) => {
    await homePage.clickOnSignIn()
    await loginPage.login('username', 'password')

    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

    await page.goto('http://zero.webappsecurity.com/logout.html')
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})















// import { test, expect } from '@playwright/test'
// import { LoginPage } from '../../page-objects/LoginPage'
// import { HomePage } from '../../page-objects/HomePage'

// test.describe.only("Login functionality", async () => {
//   let loginPage: LoginPage
//   let homePage: HomePage

//   test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page)
//     homePage = new HomePage(page)

//     await loginPage.visit()

//   })

//   test("InValid login credentials", async ({ page }) => {

//     await page.click('#signin_button')
//     await loginPage.login('invalid username', 'invalid password')
//     await loginPage.assertErrorMessage()

//   })

//   test("Valid login credentials and logout", async ({ page }) => {

//     await page.click('#signin_button')
//     await loginPage.login('username', 'password')

//     await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

//     await page.goto('http://zero.webappsecurity.com/logout.html')
//     await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')


//   })

// })



