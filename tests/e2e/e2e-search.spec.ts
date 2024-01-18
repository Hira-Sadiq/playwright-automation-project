import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Search Results', () => {

  test('Should find search results', async ({ page }) => {
    let homePage: HomePage = new HomePage(page)

    await homePage.visit()
    await homePage.searchFor('bank')
    await homePage.verifySearchedItems(2)  
  })
})
