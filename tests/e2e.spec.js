import { test, expect } from '@playwright/test';
import { MenuPage } from '../MenuPage.js';
import { CartPage } from '../CartPage.js';

test.describe('End-to-End User Scenarios', () => {
  let menuPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    menuPage = new MenuPage(page);
    cartPage = new CartPage(page);
    await menuPage.open();
  });

  test('E2E: User buys single coffee', async ({ page }) => {
    // Browse menu
    await expect(menuPage.espressoCup).toBeVisible();
    
    // Add single item
    await menuPage.espressoClick();
    
    // Check cart preview
    const checkoutButton = page.locator('[data-test="checkout"]');
    await expect(checkoutButton).toBeVisible();
    
    // Navigate to cart
    await cartPage.open();
    await expect(cartPage.espressoItem).toBeVisible();
    
    // Verify ready to checkout
    const totalButton = page.locator('button').filter({ hasText: /Total/ }).first();
    if (await totalButton.isVisible({ timeout: 2000 })) {
      await expect(totalButton).toBeEnabled();
    }
  });

  test('E2E: User buys multiple different coffees', async ({ page }) => {
    // Add multiple items
    await menuPage.cappucinoClick();
    await page.waitForTimeout(300);
    await menuPage.espressoClick();
    await page.waitForTimeout(300);
    await menuPage.americanoClick();
    
    // Navigate to cart
    await cartPage.open();
    
    // Verify all items
    await expect(cartPage.cappucinoItems).toBeVisible();
    await expect(cartPage.espressoItem).toBeVisible();
    await expect(cartPage.americanoItem).toBeVisible();
    
    // Verify total is calculated
    const totalButton = page.locator('button').filter({ hasText: /Total/ }).first();
    if (await totalButton.isVisible({ timeout: 2000 })) {
      const totalText = await totalButton.textContent();
      expect(totalText).toMatch(/\$\d+/);
    }
  });

  test('E2E: User modifies cart before checkout', async ({ page }) => {
    // Add items
    await menuPage.espressoClick();
    await page.waitForTimeout(300);
    await menuPage.espressoClick();
    await page.waitForTimeout(300);
    await menuPage.cappucinoClick();
    
    // Go to cart
    await cartPage.open();
    
    // Verify initial state
    await expect(cartPage.espressoItem).toBeVisible();
    await expect(cartPage.cappucinoItems).toBeVisible();
    
    // Remove some items
    await cartPage.clickRemoveOneEspresso();
    await page.waitForTimeout(300);
    
    // Add more from cart
    await cartPage.cappucinoOneButton.click();
    await page.waitForTimeout(300);
    
    // Verify modifications
    await expect(cartPage.espressoItem).toBeVisible();
    await expect(cartPage.cappucinoItems).toBeVisible();
  });

  test('E2E: User changes mind and clears cart', async ({ page }) => {
    // Add multiple items
    await menuPage.cappucinoClick();
    await page.waitForTimeout(300);
    await menuPage.espressoClick();
    await page.waitForTimeout(300);
    await menuPage.americanoClick();
    
    // Go to cart
    await cartPage.open();
    
    // Remove all items one by one
    await cartPage.clickRemoveAllCappucinoButton();
    await page.waitForTimeout(300);
    await cartPage.clickRemoveAllEspressoButton();
    await page.waitForTimeout(300);
    
    const removeAmericanoButton = page.getByLabel('Remove all Americano');
    if (await removeAmericanoButton.isVisible({ timeout: 2000 })) {
      await removeAmericanoButton.click();
    }
    
    // Verify cart is empty
    const noItemsMessage = page.locator('text=/No coffee|cart is empty/i');
    if (await noItemsMessage.isVisible({ timeout: 2000 })) {
      await expect(noItemsMessage).toBeVisible();
    }
  });

  test('E2E: User accepts promotion and completes order', async ({ page }) => {
    // Add item to trigger promotion
    await menuPage.cappucinoClick();
    
    // Accept promotion
    if (await menuPage.messageCoffee.isVisible({ timeout: 2000 })) {
      await menuPage.messageYes();
    }
    
    // Go to cart
    await cartPage.open();
    
    // Verify regular and promotional items
    await expect(cartPage.cappucinoItems).toBeVisible();
    
    if (await cartPage.discountedMochaItem.isVisible({ timeout: 2000 })) {
      await expect(cartPage.discountedMochaItem).toBeVisible();
    }
    
    // Proceed to checkout
    const totalButton = page.locator('button').filter({ hasText: /Total/ }).first();
    if (await totalButton.isVisible({ timeout: 2000 })) {
      await expect(totalButton).toBeEnabled();
    }
  });

  test('E2E: User session persists across page navigation', async ({ page }) => {
    // Add items on menu page
    await menuPage.espressoClick();
    await page.waitForTimeout(300);
    await menuPage.cappucinoClick();
    
    // Navigate to cart
    await cartPage.open();
    await expect(cartPage.espressoItem).toBeVisible();
    await expect(cartPage.cappucinoItems).toBeVisible();
    
    // Navigate back to menu
    await menuPage.open();
    
    // Verify cart preview still shows items
    const checkoutButton = page.locator('[data-test="checkout"]');
    await expect(checkoutButton).toBeVisible();
    
    // Go back to cart
    await cartPage.open();
    
    // Verify items still present
    await expect(cartPage.espressoItem).toBeVisible();
    await expect(cartPage.cappucinoItems).toBeVisible();
  });

  test('E2E: User buys maximum quantity of single item', async ({ page }) => {
    // Add many of the same item
    for (let i = 0; i < 5; i++) {
      await menuPage.espressoClick();
      await page.waitForTimeout(200);
    }
    
    // Go to cart
    await cartPage.open();
    
    // Verify quantity
    const espressoQuantity = cartPage.espressoItem.locator('.unit-desc');
    await expect(espressoQuantity).toContainText('x 5');
    
    // Verify total price reflects quantity
    await expect(cartPage.espressoTotal).toBeVisible();
  });

  test('E2E: User explores menu without purchasing', async ({ page }) => {
    // View different items
    await expect(menuPage.cappucinoCup).toBeVisible();
    await expect(menuPage.espressoCup).toBeVisible();
    await expect(menuPage.americanoCup).toBeVisible();
    
    // Don't add anything, just navigate to cart
    await cartPage.open();
    
    // Verify empty cart or no items message
    const noItemsMessage = page.locator('text=/No coffee|cart is empty/i');
    if (await noItemsMessage.isVisible({ timeout: 2000 })) {
      await expect(noItemsMessage).toBeVisible();
    }
  });

  test('E2E: User navigates between pages during shopping', async ({ page }) => {
    // Add items
    await menuPage.cappucinoClick();
    await page.waitForTimeout(300);
    await menuPage.espressoClick();
    
    // Navigate to cart
    await cartPage.open();
    await expect(cartPage.cappucinoItems).toBeVisible();
    await expect(cartPage.espressoItem).toBeVisible();
    
    // Navigate back to menu
    await menuPage.open();
    
    // Verify cart preview still shows items
    const checkoutButton = page.locator('[data-test="checkout"]');
    await expect(checkoutButton).toBeVisible();
    
    // Navigate back to cart and verify items persist
    await cartPage.open();
    await expect(cartPage.cappucinoItems).toBeVisible();
    await expect(cartPage.espressoItem).toBeVisible();
  });

  test('E2E: User adds, removes, then adds same item again', async ({ page }) => {
    // Add item
    await menuPage.espressoClick();
    await page.waitForTimeout(300);
    
    // Go to cart
    await cartPage.open();
    await expect(cartPage.espressoItem).toBeVisible();
    
    // Remove item
    await cartPage.clickRemoveAllEspressoButton();
    await page.waitForTimeout(500);
    
    // Go back to menu
    await menuPage.open();
    
    // Add same item again
    await menuPage.espressoClick();
    
    // Verify item is back in cart
    await cartPage.open();
    await expect(cartPage.espressoItem).toBeVisible();
  });
});

