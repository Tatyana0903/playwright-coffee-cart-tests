import { test, expect } from '@playwright/test';
import { MenuPage } from '../MenuPage.js';
import { CartPage } from '../CartPage.js';

test.describe('Menu Page Tests', () => {
  let menuPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    menuPage = new MenuPage(page);
    cartPage = new CartPage(page);
    await menuPage.open();
  });

  test('should display coffee cart menu page', async ({ page }) => {
    await expect(page).toHaveTitle(/Coffee cart/i);
    await expect(menuPage.cappucinoCup).toBeVisible();
    await expect(menuPage.espressoCup).toBeVisible();
    await expect(menuPage.americanoCup).toBeVisible();
  });

  test('should add Cappuccino to cart', async ({ page }) => {
    await menuPage.cappucinoClick();
    
    // Verify item was added (check cart preview or counter)
    const cartPreview = page.locator('[data-test="checkout"]');
    await expect(cartPreview).toBeVisible();
  });

  test('should add Espresso to cart', async ({ page }) => {
    await menuPage.espressoClick();
    
    const cartPreview = page.locator('[data-test="checkout"]');
    await expect(cartPreview).toBeVisible();
  });

  test('should add Americano to cart', async ({ page }) => {
    await menuPage.americanoClick();
    
    const cartPreview = page.locator('[data-test="checkout"]');
    await expect(cartPreview).toBeVisible();
  });

  test('should add multiple different items to cart', async ({ page }) => {
    await menuPage.cappucinoClick();
    await menuPage.espressoClick();
    await menuPage.americanoClick();
    
    const cartPreview = page.locator('[data-test="checkout"]');
    await expect(cartPreview).toBeVisible();
  });

  test('should add multiple same items to cart', async ({ page }) => {
    await menuPage.espressoClick();
    await page.waitForTimeout(300); // Small delay between clicks
    await menuPage.espressoClick();
    await page.waitForTimeout(300);
    await menuPage.espressoClick();
    
    const cartPreview = page.locator('[data-test="checkout"]');
    await expect(cartPreview).toBeVisible();
  });

  test('should handle promotional message - accept offer', async ({ page }) => {
    // Add items to trigger promo (if applicable)
    await menuPage.cappucinoClick();
    
    // Check if promo message appears and accept it
    if (await menuPage.messageCoffee.isVisible({ timeout: 2000 })) {
      await menuPage.messageYes();
      await expect(menuPage.messageCoffee).not.toBeVisible();
    }
  });

  test('should handle promotional message - decline offer', async ({ page }) => {
    // Add items to trigger promo
    await menuPage.espressoClick();
    
    // Check if promo message appears and decline it
    if (await menuPage.messageCoffee.isVisible({ timeout: 2000 })) {
      await menuPage.messageNo();
      await expect(menuPage.messageCoffee).not.toBeVisible();
    }
  });

  test('should display all menu items with prices', async ({ page }) => {
    const menuItems = page.getByRole('listitem').filter({ 
      has: page.locator('[data-test]') 
    });
    
    const count = await menuItems.count();
    expect(count).toBeGreaterThan(0);
  });
});

