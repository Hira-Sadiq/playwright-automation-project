import { Page, Locator } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class TransactionPage extends AbstractPage {
  readonly accountIdDropdown: Locator

  constructor(page: Page) {
    super(page)
    this.accountIdDropdown = page.locator('#aa_accountId')
    
  }

  async selectOptionAndValidateCount(optionValue: string, expectedCount: number) {
    await this.accountIdDropdown.selectOption(optionValue)
    await this.page.waitForFunction(
      (expectedCount) => {
        const results = document.querySelectorAll('#all_transactions_for_account tbody tr')
        return results.length === expectedCount
      },
      expectedCount
    )
  }
}
