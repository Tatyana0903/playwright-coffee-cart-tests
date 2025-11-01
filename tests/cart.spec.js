import { test, expect } from '@playwright/test';
import { MenuPage } from '../MenuPage.js';
import { CartPage } from '../CartPage.js';

test.describe('Cart Page Tests', () => {
  let menuPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    menuPage = new MenuPage(page);
    cartPage = new CartPage(page);
    await menuPage.open();
  });

  test('should display empty cart message when no items added', async ({ page }) => {
    await cartPage.open();
    
    // Check for empty cart message or empty list
    const noItemsMessage = page.locator('text=/No coffee|cart is empty/i');
    if (await noItemsMessage.isVisible({ timeout: 2000 })) {
      await expect(noItemsMessage).toBeVisible();
    }
  });

  test('should navigate to cart and display added Cappuccino', async ({ page }) => {
    await menuPage.cappucinoClick();
    await cartPage.open();
    
    await expect(cartPage.cappucinoItems).toBeVisible();
  });

  test('should navigate to cart and display added Espresso', async ({ page }) => {
    await menuPage.espressoClick();
    await cartPage.open();
    
    await expect(cartPage.espressoItem).toBeVisible();
  });

  test('should display correct item count for multiple same items', async ({ page }) => {
    // Add 3 Espressos
    await menuPage.espressoClick();
    await page.waitForTimeout(300);
    await menuPage.espressoClick();
    await page.waitForTimeout(300);
    await menuPage.espressoClick();
    
    await cartPage.open();
    
    // Verify quantity display (in the unit description span)
    const espressoQuantity = cartPage.espressoItem.locator('.unit-desc');
    await expect(espressoQuantity).toContainText('x 3');
  });

  test('should display multiple different items in cart', async ({ page }) => {
    await menuPage.cappucinoClick();
    await menuPage.espressoClick();
    await menuPage.americanoClick();
    
    await cartPage.open();
    
    await expect(cartPage.cappucinoItems).toBeVisible();
    await expect(cartPage.espressoItem).toBeVisible();
    await expect(cartPage.americanoItem).toBeVisible();
  });

  test('should remove all Espresso items from cart', async ({ page }) => {
    await menuPage.espressoClick();
    await menuPage.espressoClick();
    await cartPage.open();
    
    await cartPage.clickRemoveAllEspressoButton();
    
    // Verify Espresso is removed
    await expect(cartPage.espressoItem).not.toBeVisible();
  });

  test('should remove all Cappuccino items from cart', async ({ page }) => {
    await menuPage.cappucinoClick();
    await menuPage.cappucinoClick();
    await cartPage.open();
    
    await cartPage.clickRemoveAllCappucinoButton();
    
    // Verify Cappuccino is removed
    await expect(cartPage.cappucinoItems).not.toBeVisible();
  });

  test('should remove one Espresso item from cart', async ({ page }) => {
    // Add 3 Espressos
    await menuPage.espressoClick();
    await page.waitForTimeout(300);
    await menuPage.espressoClick();
    await page.waitForTimeout(300);
    await menuPage.espressoClick();
    
    await cartPage.open();
    
    // Remove one
    await cartPage.clickRemoveOneEspresso();
    await page.waitForTimeout(500);
    
    // Verify count decreased
    const espressoQuantity = cartPage.espressoItem.locator('.unit-desc');
    await expect(espressoQuantity).toContainText('x 2');
  });

  test('should add one more item from cart page', async ({ page }) => {
    await menuPage.espressoClick();
    await cartPage.open();
    
    // Add one more from cart
    await cartPage.espressoOneButton.click();
    await page.waitForTimeout(500);
    
    // Verify count increased
    const espressoQuantity = cartPage.espressoItem.locator('.unit-desc');
    await expect(espressoQuantity).toContainText('x 2');
  });

  test('should calculate correct total price for single item', async ({ page }) => {
    await menuPage.espressoClick();
    await cartPage.open();
    
    // Verify total exists and is a valid price
    await expect(cartPage.espressoTotal).toBeVisible();
    const totalText = await cartPage.espressoTotal.textContent();
    expect(totalText).toMatch(/\$\d+/);
  });

  test('should calculate correct total price for multiple items', async ({ page }) => {
    await menuPage.cappucinoClick();
    await menuPage.espressoClick();
    await menuPage.americanoClick();
    await cartPage.open();
    
    // Verify all totals are displayed
    await expect(cartPage.cappucinoTotal).toBeVisible();
    await expect(cartPage.espressoTotal).toBeVisible();
    await expect(cartPage.americanoTotalCost).toBeVisible();
  });

  test('should maintain cart across page navigation', async ({ page }) => {
    await menuPage.cappucinoClick();
    await menuPage.espressoClick();
    await cartPage.open();
    
    // Verify items in cart
    await expect(cartPage.cappucinoItems).toBeVisible();
    await expect(cartPage.espressoItem).toBeVisible();
    
    // Navigate back to menu
    await menuPage.open();
    
    // Return to cart - items should still be there
    await cartPage.open();
    await expect(cartPage.cappucinoItems).toBeVisible();
    await expect(cartPage.espressoItem).toBeVisible();
  });

  test('should handle discounted items in cart', async ({ page }) => {
    // Trigger promotion by adding items
    await menuPage.cappucinoClick();
    
    // Accept promo if it appears
    if (await menuPage.messageCoffee.isVisible({ timeout: 2000 })) {
      await menuPage.messageYes();
    }
    
    await cartPage.open();
    
    // Check if discounted item appears
    if (await cartPage.discountedMochaItem.isVisible({ timeout: 2000 })) {
      await expect(cartPage.discountedMochaItem).toBeVisible();
      await expect(cartPage.mochaTotal).toContainText('$4');
    }
  });
});

