import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { TransactionPage } from '../../page-objects/TransactionPage';

test.describe('Filter Transactions', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let navbar: Navbar
  let transactionPage: TransactionPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    navbar = new Navbar(page)
    transactionPage = new TransactionPage(page);

    homePage.visit()
    homePage.clickOnSignIn()
    loginPage.login('username', 'password')
    homePage.navigateTo('http://zero.webappsecurity.com/index.html')
  })

  test('Verify the results for each account', async () => {
    await homePage.clickOnTransferFundsLink()
    await navbar.clickOnTab('Account Activity')

    // Select option '2'
    await transactionPage.selectOptionAndValidateCount('2', 3);

    // Select option '4'
    await transactionPage.selectOptionAndValidateCount('4', 2);

    // Select option '6'
    await transactionPage.selectOptionAndValidateCount('6', 0);
  })
})
