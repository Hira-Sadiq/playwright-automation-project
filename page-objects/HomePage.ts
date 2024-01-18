import { Locator, Page, expect } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class HomePage extends AbstractPage {
  readonly signInButton: Locator
  readonly searchBox: Locator
  readonly linkFeedback: Locator
  readonly linkTransferFunds: Locator
  readonly searchedLinks: Locator

  constructor(page: Page) {
    super(page)
    this.signInButton = page.locator('#signin_button')
    this.searchBox = page.locator('#searchTerm')
    this.linkFeedback = page.locator('#feedback')
    this.linkTransferFunds = page.locator('//span[@id="transfer_funds_link"]')
    this.searchedLinks = page.locator('li > a')
  }

  async visit(){
    await this.page.goto('http://zero.webappsecurity.com')
  }

  async navigateTo(url: string) {
    await this.page.waitForTimeout(3000)
    await this.page.goto(url)
  }

  async clickOnSignIn() {
    await this.signInButton.click()
  }

  async clickOnFeedbackLink() {
    await this.linkFeedback.click()
  }

  async clickOnTransferFundsLink() {
    await this.linkTransferFunds.waitFor({ state: 'visible', timeout: 5000 })
    await this.linkTransferFunds.click()
  } 

  async searchFor(phrase: string) {
    await this.searchBox.fill(phrase)
    await this.page.keyboard.press('Enter')
  }

  async verifySearchedItems(count: number) {
    await expect(this.searchedLinks).toHaveCount(count)
  }
}
