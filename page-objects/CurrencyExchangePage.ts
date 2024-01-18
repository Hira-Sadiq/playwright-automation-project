import { Page, Locator, expect } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class CurrencyExchangePage extends AbstractPage {
  readonly purchaseForeignCurrencyLink: Locator
  readonly currencyDropdown: Locator
  readonly rate: Locator
  readonly amountInput: Locator
  readonly inDollarsRadioButton: Locator
  readonly calculateCostsButton: Locator
  readonly conversionAmount: Locator
  readonly purchaseCashButton: Locator
  readonly successMessage: Locator

  constructor(page: Page) {
    super(page)
    this.purchaseForeignCurrencyLink = page.locator('text=Purchase Foreign Currency')
    this.currencyDropdown = page.locator('#pc_currency')
    this.rate = page.locator('#sp_sell_rate')
    this.amountInput = page.locator('#pc_amount')
    this.inDollarsRadioButton = page.locator('#pc_inDollars_true')
    this.calculateCostsButton = page.locator('#pc_calculate_costs')
    this.conversionAmount = page.locator('#pc_conversion_amount')
    this.purchaseCashButton = page.locator('#purchase_cash')
    this.successMessage = page.locator('#alert_content')
  }

  async submitCurrencyExchange(currency: string, amount: string) {
    await this.purchaseForeignCurrencyLink.click()
    await this.currencyDropdown.selectOption(currency)
    await expect(this.rate).toContainText('1 euro (EUR)')
    await this.amountInput.fill(amount)
    await this.inDollarsRadioButton.click()
    await this.calculateCostsButton.click()
    await expect(this.conversionAmount).toContainText('1000.00 U.S. dollar (USD)')
    await this.purchaseCashButton.click()
    await expect(this.successMessage).toBeVisible()
    await expect(this.successMessage).toContainText(
           'Foreign currency cash was successfully purchased'
         )
  }
}