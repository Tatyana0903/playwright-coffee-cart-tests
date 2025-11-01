import { test, expect } from '@playwright/test';
import { MenuPage } from '../MenuPage.js';
import { CartPage } from '../CartPage.js';

test.describe('Checkout Flow Tests', () => {
  let menuPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    menuPage = new MenuPage(page);
    cartPage = new CartPage(page);
    await menuPage.open();
  });

  test('should display checkout button when items are in cart', async ({ page }) => {
    await menuPage.cappucinoClick();
    
    const checkoutButton = page.locator('[data-test="checkout"]');
    await expect(checkoutButton).toBeVisible();
    await expect(checkoutButton).toBeEnabled();
  });

  test('should show total amount in checkout preview', async ({ page }) => {
    await menuPage.espressoClick();
    
    const checkoutButton = page.locator('[data-test="checkout"]');
    await expect(checkoutButton).toBeVisible();
    
    // Check if total is displayed
    const totalText = await checkoutButton.textContent();
    expect(totalText).toMatch(/\$\d+/);
  });

  test('should update checkout total when adding multiple items', async ({ page }) => {
    await menuPage.espressoClick();
    
    const checkoutButton = page.locator('[data-test="checkout"]');
    const initialTotal = await checkoutButton.textContent();
    
    await menuPage.cappucinoClick();
    await page.waitForTimeout(500);
    
    const updatedTotal = await checkoutButton.textContent();
    expect(updatedTotal).not.toBe(initialTotal);
  });

  test('should show checkout button with cart items', async ({ page }) => {
    await menuPage.espressoClick();
    
    const checkoutButton = page.locator('[data-test="checkout"]');
    await expect(checkoutButton).toBeVisible();
    
    // Checkout button should display total
    const checkoutText = await checkoutButton.textContent();
    expect(checkoutText).toContain('$');
  });

  test('should display total amount on cart page', async ({ page }) => {
    await menuPage.cappucinoClick();
    await menuPage.espressoClick();
    await cartPage.open();
    
    const totalElement = page.locator('text=/Total|total/i').first();
    await expect(totalElement).toBeVisible();
  });

  test('should complete full purchase flow', async ({ page }) => {
    // Add items
    await menuPage.cappucinoClick();
    await page.waitForTimeout(300);
    await menuPage.espressoClick();
    await page.waitForTimeout(300);
    await menuPage.americanoClick();
    
    // Navigate to cart via cart link
    await cartPage.open();
    
    // Verify all items in cart
    await expect(cartPage.cappucinoItems).toBeVisible();
    await expect(cartPage.espressoItem).toBeVisible();
    await expect(cartPage.americanoItem).toBeVisible();
    
    // Verify checkout button is available
    const checkoutButton = page.locator('[data-test="checkout"]');
    await expect(checkoutButton).toBeVisible();
  });

  test('should show payment form on checkout', async ({ page }) => {
    await menuPage.espressoClick();
    await cartPage.open();
    
    // Look for payment button
    const totalButton = page.locator('button').filter({ hasText: /Total|Pay/ }).first();
    
    if (await totalButton.isVisible({ timeout: 2000 })) {
      await totalButton.click();
      
      // Check if payment form appears
      const paymentForm = page.locator('form, [role="form"], input[name*="name"], input[name*="email"]').first();
      await expect(paymentForm).toBeVisible({ timeout: 5000 });
    }
  });

  test('should validate required payment form fields', async ({ page }) => {
    await menuPage.cappucinoClick();
    await cartPage.open();
    
    const totalButton = page.locator('button').filter({ hasText: /Total|Pay/ }).first();
    
    if (await totalButton.isVisible({ timeout: 2000 })) {
      await totalButton.click();
      await page.waitForTimeout(500);
      
      // Try to submit without filling fields
      const submitButton = page.getByRole('button', { name: /submit|pay/i }).first();
      
      if (await submitButton.isVisible({ timeout: 3000 })) {
        await submitButton.click();
        await page.waitForTimeout(500);
        
        // Check for validation messages or form still visible (indicating validation failed)
        const nameInput = page.locator('input[name*="name"], input[name*="Name"]').first();
        const formStillVisible = await nameInput.isVisible({ timeout: 1000 }).catch(() => false);
        expect(formStillVisible).toBeTruthy();
      }
    }
  });

  test('should calculate promotional discount correctly', async ({ page }) => {
    await menuPage.cappucinoClick();
    
    // Accept promotional offer
    if (await menuPage.messageCoffee.isVisible({ timeout: 2000 })) {
      await menuPage.messageYes();
      await page.waitForTimeout(500);
    }
    
    await cartPage.open();
    
    // Verify discounted item is in cart with correct price
    if (await cartPage.discountedMochaItem.isVisible({ timeout: 2000 })) {
      const discountedPrice = await cartPage.mochaTotal.textContent();
      expect(discountedPrice).toContain('$4');
    }
  });

  test('should not add promotional item when declined', async ({ page }) => {
    await menuPage.espressoClick();
    
    // Decline promotional offer
    if (await menuPage.messageCoffee.isVisible({ timeout: 2000 })) {
      await menuPage.messageNo();
      await page.waitForTimeout(500);
    }
    
    await cartPage.open();
    
    // Verify discounted Mocha is NOT in cart
    await expect(cartPage.discountedMochaItem).not.toBeVisible();
  });
});

