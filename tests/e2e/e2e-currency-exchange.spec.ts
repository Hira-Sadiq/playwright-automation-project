import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { CurrencyExchangePage } from '../../page-objects/CurrencyExchangePage'

test.describe('Currency Exchange Form', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let navbar: Navbar
  let currencyExchangePage: CurrencyExchangePage

  test.beforeEach(async ({ page }) => { 
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    navbar = new Navbar(page)
    currencyExchangePage = new CurrencyExchangePage(page);

    homePage.visit()
    homePage.clickOnSignIn()
    loginPage.login('username', 'password')
    homePage.navigateTo('http://zero.webappsecurity.com/index.html')
  })

  test('Should make currency exchange', async () => {
    await homePage.clickOnTransferFundsLink()
    await navbar.clickOnTab('Pay Bills')
    await navbar.clickOnPayBillsSubtab('Purchase Foreign Currency')
    await currencyExchangePage.submitCurrencyExchange('EUR', '1000');
  })
})
