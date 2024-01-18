import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class TransferFundsPage extends AbstractPage {
    readonly fromAccountSelectbox: Locator
    readonly toAccountSelectbox: Locator
    readonly amountInput: Locator
    readonly descriptionInput: Locator
    readonly continueButton: Locator
    readonly verifyHeader: Locator
    readonly message: Locator

    constructor(page: Page) {
        super(page)
        this.fromAccountSelectbox = page.locator('#tf_fromAccountId')
        this.toAccountSelectbox = page.locator('#tf_toAccountId')
        this.amountInput = page.locator('#tf_amount')
        this.descriptionInput = page.locator('#tf_description')
        this.continueButton = page.locator('#btn_submit')
        this.verifyHeader = page.locator('h2.board-header')
        this.message = page.locator('.alert-success')
    }

    async fillTransferMoneyForm(){
        await this.fromAccountSelectbox.selectOption('2')
        await this.toAccountSelectbox.selectOption('3')
        await this.amountInput.fill('500')
        await this.descriptionInput.fill('Test message')
    }

    async clickOnContinueButton(){
        await this.continueButton.click()
    }

    async verifyBoardHeader(){
        await expect(this.verifyHeader).toContainText('Verify')
    }

    async assertSuccessMessage(){
        await expect(this.message).toContainText(
            'You successfully submitted your transaction'
          )

    }
}