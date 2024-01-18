import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class PaymentPage extends AbstractPage {
  readonly payeeSelectbox: Locator
  readonly payeeDetailButton: Locator
  readonly payeeDetail: Locator
  readonly accountSelectbox: Locator
  readonly amountInput: Locator
  readonly dateInput: Locator
  readonly descriptionInput: Locator
  readonly submitPaymentButton: Locator
  readonly message: Locator

  constructor(page: Page) {
    super(page)
    this.payeeSelectbox = page.locator('#sp_payee')
    this.payeeDetailButton = page.locator('#sp_get_payee_details')
    this.payeeDetail = page.locator('#sp_payee_details')
    this.accountSelectbox = page.locator('#sp_account')
    this.amountInput = page.locator('#sp_amount')
    this.dateInput = page.locator('#sp_date')
    this.descriptionInput = page.locator('#sp_description')
    this.submitPaymentButton = page.locator('#pay_saved_payees')
    this.message = page.locator('#alert_content > span')
  }

  async createPayment() {
    await this.payeeSelectbox.selectOption('apple')
    await this.payeeDetailButton.click()
    await expect(this.payeeDetail).toBeVisible()
    await this.accountSelectbox.selectOption('6')
    await this.amountInput.fill('5000')
    await this.dateInput.fill('2024-01-04')
    await this.descriptionInput.fill('This is a test')
    await this.submitPaymentButton.click()
  }

  async assertSuccessMessage() {
    const successMessage = await this.message.textContent()
    expect(successMessage).toContain(
      'The payment was successfully submitted'
    )
  }
}
