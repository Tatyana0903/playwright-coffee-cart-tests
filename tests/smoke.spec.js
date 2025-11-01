import { test, expect } from '@playwright/test';
import { MenuPage } from '../MenuPage.js';
import { CartPage } from '../CartPage.js';

/**
 * Smoke Tests - Quick validation of critical functionality
 * Run these first to ensure basic features work before running full test suite
 */
test.describe('Smoke Tests', () => {
  let menuPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    menuPage = new MenuPage(page);
    cartPage = new CartPage(page);
  });

  test('SMOKE: Application loads successfully', async ({ page }) => {
    await menuPage.open();
    await expect(page).toHaveTitle(/Coffee cart/i);
    await expect(menuPage.cappucinoCup).toBeVisible();
  });

  test('SMOKE: Can add item to cart', async ({ page }) => {
    await menuPage.open();
    await menuPage.espressoClick();
    
    const checkoutButton = page.locator('[data-test="checkout"]');
    await expect(checkoutButton).toBeVisible();
  });

  test('SMOKE: Can view cart', async ({ page }) => {
    await menuPage.open();
    await menuPage.cappucinoClick();
    await cartPage.open();
    
    await expect(page).toHaveURL(/.*cart/);
    await expect(cartPage.cappucinoItems).toBeVisible();
  });

  test('SMOKE: Can remove item from cart', async ({ page }) => {
    await menuPage.open();
    await menuPage.espressoClick();
    await cartPage.open();
    
    await cartPage.clickRemoveAllEspressoButton();
    await expect(cartPage.espressoItem).not.toBeVisible();
  });

  test('SMOKE: Cart persists across navigation', async ({ page }) => {
    await menuPage.open();
    await menuPage.espressoClick();
    await cartPage.open();
    
    // Verify item is in cart
    await expect(cartPage.espressoItem).toBeVisible();
    
    // Navigate back to menu
    await menuPage.open();
    
    // Navigate back to cart - item should still be there
    await cartPage.open();
    await expect(cartPage.espressoItem).toBeVisible();
  });
});

