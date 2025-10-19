import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.list = page.getByRole('list').nth(1);

    this.cappucinoItems = page.getByRole('listitem').filter({
      hasText: 'Cappuccino'
    });

    this.cappucinoName = this.cappuccinoItem.locator('div').nth(0);
    this.cappucinoUnit = this.cappuccinoItem.locator('div').nth(1);
    this.cappucinoTotal = this.cappuccinoItem.locator('div').nth(3);

    this.espressoItem = page.getByRole('listitem').filter({
      hasText: 'Espresso'
    });
    this.espressoName = this.espressoItem.locator('div').nth(0);
    this.espressoLocator = this.espressoItem.locator('div').nth(1);
    this.espressoTotal = this.espressoItem.locator('div').nth(3);

    this.discountedMochaItem = this.cartListLocator.getByRole('listitem')
      .filter({ hasText: '(Discounted) Mocha' });
    this.mochaTotal = this.mochaDiscountedItem.locator('div').nth(3);

    this.americanoItem = this.cartLocator.getByRole('listitem')
      .filter({ hasText: 'Americano' });
    this.americanoTotalCost = this.americanoItem.locator('div').nth(3);

    this.removeOneEspressoButton = page.getByRole('button', { name: 'Remove one Espresso' });
    this.removeAllCappucinoButton = page.getByLabel('Remove all Cappuccino');
    this.removeAllEspressoButton = page.getByLabel('Remove all Espresso');
    this.espressoOneButton = page.getByRole('button', { name: 'Add one Espresso' });
    this.cappucinoOneButton = page.getByRole('button', { name: 'Add one Cappuccino' });
  }
  async open() {
    await this.page.goto('https://coffee-cart.app/cart');
  }

  async waitForLoading() {
    await this.page.waitForURL('https://coffee-cart.app/cart');
  }

  async reload() {
    await this.page.reload();
  }

  async clickRemoveAllEspressoButton() {
    await this.removeAllEspressoButton.click();
  }

  async clickRemoveAllCappucinoButton() {
    await this.clickRemoveAllCappucinoButton();
  }

  async clickRemoveOneEspresso() {
    await this.clickRemoveOneEspresso.click();
  }

  async clickOneCappucinoButton() {
    await this.cappucinoOneButton.click();
  }

}
