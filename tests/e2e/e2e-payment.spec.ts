import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { PaymentPage } from '../../page-objects/PaymentPage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe('New Payment', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let paymentPage: PaymentPage
  let navbar: Navbar

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    paymentPage = new PaymentPage(page)
    navbar = new Navbar(page)

    homePage.visit()
    homePage.clickOnSignIn()
    loginPage.login('username', 'password')
    homePage.navigateTo('http://zero.webappsecurity.com/index.html')
  })

  test('Should send new payment', async () => {
    await homePage.clickOnTransferFundsLink()
    await navbar.clickOnTab('Pay Bills')
    await paymentPage.createPayment()
    await paymentPage.assertSuccessMessage()
  })
})
