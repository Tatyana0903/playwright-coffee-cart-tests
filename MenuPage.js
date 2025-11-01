import { expect } from '@playwright/test';

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.cappucinoCup = page.getByTestId('Cappuccino');
    this.listItem = this.page.getByRole('listitem').filter({ has: this.cappucinoCup });
    this.espressoCup = this.page.getByTestId('Espresso');
    this.espressoListItem = this.page.getByRole('listitem').filter({ has: this.espressoCup });
    this.americanoCup = this.page.getByTestId('Americano');
    this.messageCoffee = this.page.getByText("It's your lucky day! Get an extra cup of Mocha for $4.");
    this.positiveMessage = this.page.getByRole('button', { name: 'Yes, of course!' });
    this.negativeMessage = this.page.getByRole('button', { name: "Nah, I'll skip." });
  }

  async open() {
    // Check if already on the site to preserve cart state
    const currentUrl = this.page.url();
    if (currentUrl.includes('coffee-cart.app')) {
      // Navigate via menu link to preserve state
      const menuLink = this.page.locator('a[href="/"]');
      await menuLink.click();
      await this.page.waitForURL('**/');
    } else {
      // First time navigation
      await this.page.goto('https://coffee-cart.app/');
    }
  }

  async cappucinoClick() {
    await this.cappucinoCup.click();
  }

  async clickPage() {
    await this.cartPage.click();
  }

  async espressoClick() {
    await this.espressoCup.click();
  }

  async americanoClick() {
    await this.americanoCup.click();
  }

  async messageButton() {
    await this.messageCoffee.click();
  }

  async messageYes() {
    await this.positiveMessage.click();
  }

  async messageNo() {
    await this.negativeMessage.click();
  }
}
