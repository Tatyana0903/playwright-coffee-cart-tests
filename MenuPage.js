import { expect } from '@playwright/test';

export class MenuPage {
  constructor(page) {
    this.page = page;
    this.cappucinoCup = page.getByTestId('Cappuccino');
    this.listItem = this.page.getByRole('listitem').filter({ has: cappucionCup });
    this.espressoCup = this.page.getByTestId('Espresso');
    this.espressoListItem = this.page.getByRole('listitem').filter({ has: espressoCup });
    this.americanoCup = this.page.getByTestId('Americano');
    this.messageCoffee = this.page.getByText("It's your lucky day! Get an extra cup of Mocha for $4.");
    this.positiveMessage = this.page.getByRole('button', { name: 'Yes, of course!' });
    this.negativeMessage = this.page.getByRole('button', { name: "Nah, I'll skip." });
  }

  async open() {
    await this.page.goto('https://coffee-cart.app/');
  }

  async cappucinoClick() {
    this.cappucinoCup.click();
  }

  async clickPage() {
    this.cartPage.click();
  }

  async espressoClick() {
    this.espressoCup.click();
  }

  async americanoClick() {
    this.americanoCup.click();
  }

  async messageButton() {
    this.messageCoffee.click();
  }

  async messageYes() {
    this.positiveMessage.click();
  }

  async messageNo() {
    this.negativeMessage.click();
  }
}
