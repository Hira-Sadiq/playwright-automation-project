import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { TransferFundsPage } from '../../page-objects/TransferFundsPage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe('Transfer Funds and Make Payments', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let transferFundsPage: TransferFundsPage
  let navbar: Navbar

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    transferFundsPage = new TransferFundsPage(page)
    navbar = new Navbar(page)

    homePage.visit()
    homePage.clickOnSignIn()
    loginPage.login('username', 'password')
    homePage.navigateTo('http://zero.webappsecurity.com/index.html')
  })

  test('Transfer funds', async () => {
    await homePage.clickOnTransferFundsLink()
    await navbar.clickOnTab('Transfer Funds')
    await transferFundsPage.fillTransferMoneyForm()
    await transferFundsPage.clickOnContinueButton()
    await transferFundsPage.verifyBoardHeader()
    await transferFundsPage.clickOnContinueButton()
    await transferFundsPage.assertSuccessMessage()
  })
})
