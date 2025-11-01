# Playwright: Coffee Cart Test Suite

This repository contains comprehensive test suites for the Coffee Cart application (https://coffee-cart.app/), implemented using Playwright and following the Page Object Model (POM) design pattern.

## Technologies Used
- Playwright (JavaScript)
- Node.js
- Page Object Model (POM)
- VS Code

## Project Structure
```
playwright-coffee-cart-tests/
├── MenuPage.js              # Page Object for menu/homepage
├── CartPage.js              # Page Object for cart page
├── tests/                   # Test suites
│   ├── smoke.spec.js        # Smoke tests (quick validation)
│   ├── menu.spec.js         # Menu functionality tests
│   ├── cart.spec.js         # Cart operations tests
│   ├── checkout.spec.js     # Checkout flow tests
│   └── e2e.spec.js          # End-to-end scenarios
├── playwright.config.js     # Playwright configuration
└── README.md
```

## Test Suites Overview

### 🔥 Smoke Tests (`smoke.spec.js`)
Quick validation of critical functionality:
- Application loads
- Add item to cart
- View cart
- Remove item
- Cart persistence

**Run smoke tests:** `npx playwright test smoke`

### 🍕 Menu Tests (`menu.spec.js`)
Tests for menu page interactions:
- Display menu items
- Add different coffee types
- Add multiple items
- Handle promotional messages
- Verify prices

**Run menu tests:** `npx playwright test menu`

### 🛒 Cart Tests (`cart.spec.js`)
Tests for cart operations:
- Display cart items
- Update quantities
- Remove items
- Calculate totals
- Cart persistence
- Handle discounts

**Run cart tests:** `npx playwright test cart`

### 💳 Checkout Tests (`checkout.spec.js`)
Tests for checkout flow:
- Display checkout button
- Show total amounts
- Navigate to cart
- Payment form validation
- Apply promotions

**Run checkout tests:** `npx playwright test checkout`

### 🎯 E2E Tests (`e2e.spec.js`)
End-to-end user scenarios:
- Complete purchase flows
- Multiple items purchase
- Cart modifications
- Session persistence
- Promotion acceptance
- Edge cases

**Run E2E tests:** `npx playwright test e2e`

## How to Run

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test Suite
```bash
npx playwright test smoke          # Smoke tests only
npx playwright test menu           # Menu tests only
npx playwright test cart           # Cart tests only
npx playwright test checkout       # Checkout tests only
npx playwright test e2e            # E2E tests only
```

### Run Tests in UI Mode (Interactive)
```bash
npx playwright test --ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

### Run Specific Test File
```bash
npx playwright test tests/menu.spec.js
```

### Run Tests with Specific Browser
```bash
npx playwright test --project=chromium
```

### View Test Report
```bash
npx playwright show-report
```

### Debug Tests
```bash
npx playwright test --debug
```

## Test Execution Strategy

**Recommended order for test execution:**

1. **First Run:** Smoke tests for quick validation
   ```bash
   npx playwright test smoke
   ```

2. **Component Testing:** Individual feature tests
   ```bash
   npx playwright test menu
   npx playwright test cart
   npx playwright test checkout
   ```

3. **Integration Testing:** End-to-end scenarios
   ```bash
   npx playwright test e2e
   ```

4. **Full Regression:** All tests
   ```bash
   npx playwright test
   ```

## Configuration

The test configuration is defined in `playwright.config.js`:
- Test directory: `./tests`
- Parallel execution: Disabled (sequential)
- Workers: 1
- Reporter: HTML
- Test ID attribute: `data-test`
- Browser: Chromium (Desktop Chrome)

## Page Objects

### MenuPage
Methods for interacting with the menu/homepage:
- `open()` - Navigate to menu page
- `cappucinoClick()` - Add Cappuccino to cart
- `espressoClick()` - Add Espresso to cart
- `americanoClick()` - Add Americano to cart
- `messageYes()` - Accept promotional offer
- `messageNo()` - Decline promotional offer

### CartPage
Methods for interacting with the cart:
- `open()` - Navigate to cart page
- `reload()` - Refresh cart page
- `clickRemoveAllEspressoButton()` - Remove all Espresso items
- `clickRemoveAllCappucinoButton()` - Remove all Cappuccino items
- `clickRemoveOneEspresso()` - Remove one Espresso item
- `clickOneCappucinoButton()` - Add one more Cappuccino

## Test Data

Application URL: https://coffee-cart.app/

## Continuous Integration

To run tests in CI/CD pipeline:
```bash
npm install
npx playwright install --with-deps
npx playwright test
```

## Troubleshooting

### Tests failing due to timeouts
- Increase timeout in specific tests: `test.setTimeout(60000)`
- Or globally in `playwright.config.js`

### Element not found errors
- Ensure page objects are up to date
- Check if selectors match the application
- Use `--headed` mode to debug visually

### Flaky tests
- Add appropriate waits: `await page.waitForTimeout()`
- Use Playwright's auto-waiting: `await expect().toBeVisible()`
- Check network conditions

## Contributing

When adding new tests:
1. Follow the Page Object Model pattern
2. Use descriptive test names
3. Add appropriate assertions
4. Group related tests in describe blocks
5. Clean up test data after execution

## License

ISC
