import { Locator, Page } from '@playwright/test'
import { AbstractPage } from '../AbstractPage'

export class Navbar extends AbstractPage {
  readonly accountSummary: Locator
  readonly accountActivity: Locator
  readonly transferFunds: Locator
  readonly payBills: Locator
  readonly myMoneyApp: Locator
  readonly onlineStatements: Locator

  // Subtabs under 'Pay Bills' tab
  readonly paySavedPayee: Locator
  readonly addNewPayee: Locator
  readonly purchaseForeignCurrency: Locator

  constructor(page: Page) {
    super(page)
    this.accountSummary = page.locator('#account_summary_tab')
    this.accountActivity = page.locator('#account_activity_tab')
    this.transferFunds = page.locator('#transfer_funds_tab')
    this.payBills = page.locator('#pay_bills_tab')
    this.myMoneyApp = page.locator('#money_map_tab')
    this.onlineStatements = page.locator('#online_statements_tab')

    // Initialize subtabs locators
    this.paySavedPayee = page.locator('text=Pay Saved Payee')
    this.addNewPayee = page.locator('text=Add New Payee')
    this.purchaseForeignCurrency = page.locator('text=Purchase Foreign Currency')
  }

  async clickOnTab(tabName: string) {
    switch (tabName) {
      case 'Account Summary':
        await this.accountSummary.click()
        break
      case 'Account Activity':
        await this.accountActivity.click()
        break
      case 'Transfer Funds':
        await this.transferFunds.click()
        break
      case 'Pay Bills':
        await this.payBills.click()
        break
      case 'My Money App':
        await this.myMoneyApp.click()
        break
      case 'Online Statements':
        await this.onlineStatements.click()
        break
      default:
        throw new Error('This tab does not exist..')
    }
  }

  async clickOnPayBillsSubtab(subtabName: string) {
    switch (subtabName) {
      case 'Pay Saved Payee':
        await this.paySavedPayee.click()
        break
      case 'Add New Payee':
        await this.addNewPayee.click()
        break
      case 'Purchase Foreign Currency':
        await this.purchaseForeignCurrency.click()
        break
      default:
        throw new Error('This subtab does not exist..')
        
    }
  }
}
