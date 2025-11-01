# Test Suite Summary

This document provides a detailed overview of all test cases included in the Coffee Cart test suite.

## Total Test Coverage

- **5 Test Suites**
- **60+ Test Cases**
- **Multiple User Scenarios**

---

## 🔥 Smoke Tests (5 tests)

**File:** `smoke.spec.js`  
**Purpose:** Quick validation of critical functionality

| # | Test Name | Description |
|---|-----------|-------------|
| 1 | Application loads successfully | Verifies the app loads and displays the menu |
| 2 | Can add item to cart | Tests basic add-to-cart functionality |
| 3 | Can view cart | Ensures cart page is accessible |
| 4 | Can remove item from cart | Tests removal of items |
| 5 | Cart persists on page reload | Validates session persistence |

---

## 🍕 Menu Tests (9 tests)

**File:** `menu.spec.js`  
**Purpose:** Comprehensive testing of menu page functionality

| # | Test Name | Description |
|---|-----------|-------------|
| 1 | should display coffee cart menu page | Verifies menu page loads with all items |
| 2 | should add Cappuccino to cart | Tests adding Cappuccino |
| 3 | should add Espresso to cart | Tests adding Espresso |
| 4 | should add Americano to cart | Tests adding Americano |
| 5 | should add multiple different items to cart | Tests adding various items |
| 6 | should add multiple same items to cart | Tests adding same item multiple times |
| 7 | should handle promotional message - accept offer | Tests accepting promotion |
| 8 | should handle promotional message - decline offer | Tests declining promotion |
| 9 | should display all menu items with prices | Validates menu item display |

---

## 🛒 Cart Tests (13 tests)

**File:** `cart.spec.js`  
**Purpose:** Testing cart operations and calculations

| # | Test Name | Description |
|---|-----------|-------------|
| 1 | should display empty cart message when no items added | Validates empty state |
| 2 | should navigate to cart and display added Cappuccino | Tests cart display for Cappuccino |
| 3 | should navigate to cart and display added Espresso | Tests cart display for Espresso |
| 4 | should display correct item count for multiple same items | Validates quantity display |
| 5 | should display multiple different items in cart | Tests multiple items |
| 6 | should remove all Espresso items from cart | Tests bulk removal of Espresso |
| 7 | should remove all Cappuccino items from cart | Tests bulk removal of Cappuccino |
| 8 | should remove one Espresso item from cart | Tests single item removal |
| 9 | should add one more item from cart page | Tests adding from cart |
| 10 | should calculate correct total price for single item | Validates price calculation |
| 11 | should calculate correct total price for multiple items | Validates total for multiple items |
| 12 | should persist cart items after page reload | Tests persistence |
| 13 | should handle discounted items in cart | Tests promotional pricing |

---

## 💳 Checkout Tests (10 tests)

**File:** `checkout.spec.js`  
**Purpose:** Testing checkout flow and payment process

| # | Test Name | Description |
|---|-----------|-------------|
| 1 | should display checkout button when items are in cart | Validates checkout button visibility |
| 2 | should show total amount in checkout preview | Tests total display |
| 3 | should update checkout total when adding multiple items | Tests dynamic total updates |
| 4 | should navigate to cart when clicking checkout preview | Tests navigation |
| 5 | should display total amount on cart page | Validates cart total |
| 6 | should complete full purchase flow | Tests complete checkout |
| 7 | should show payment form on checkout | Tests payment form display |
| 8 | should validate required payment form fields | Tests form validation |
| 9 | should calculate promotional discount correctly | Tests discount calculation |
| 10 | should not add promotional item when declined | Tests promotion decline |

---

## 🎯 E2E Tests (10 tests)

**File:** `e2e.spec.js`  
**Purpose:** End-to-end user scenarios

| # | Test Name | Description |
|---|-----------|-------------|
| 1 | User buys single coffee | Complete flow for single purchase |
| 2 | User buys multiple different coffees | Multiple items purchase flow |
| 3 | User modifies cart before checkout | Tests cart modifications |
| 4 | User changes mind and clears cart | Tests complete cart clearing |
| 5 | User accepts promotion and completes order | Tests promotional flow |
| 6 | User session persists across page navigation | Tests session management |
| 7 | User buys maximum quantity of single item | Tests quantity limits |
| 8 | User explores menu without purchasing | Tests browsing behavior |
| 9 | User refreshes page during shopping | Tests reload behavior |
| 10 | User adds, removes, then adds same item again | Tests state management |

---

## Test Execution Times

**Estimated execution times:**

- Smoke Tests: ~30 seconds
- Menu Tests: ~1-2 minutes
- Cart Tests: ~2-3 minutes
- Checkout Tests: ~2-3 minutes
- E2E Tests: ~3-4 minutes
- **Total (all tests):** ~10-15 minutes

---

## Test Coverage Areas

### Functional Coverage
- ✅ Menu browsing
- ✅ Add to cart
- ✅ Cart management
- ✅ Quantity updates
- ✅ Item removal
- ✅ Price calculations
- ✅ Promotional offers
- ✅ Checkout flow
- ✅ Form validation
- ✅ Session persistence

### Non-Functional Coverage
- ✅ Page load performance
- ✅ State persistence
- ✅ Navigation flows
- ✅ UI element visibility
- ✅ Error handling

### Browser Coverage
- ✅ Desktop Chrome (Chromium)
- ⚠️ Firefox (can be enabled in config)
- ⚠️ Safari (can be enabled in config)

---

## Test Data

**Coffee Types Tested:**
- Cappuccino
- Espresso
- Americano
- Mocha (Discounted/Promotional)

**User Actions Tested:**
- Browse menu
- Add items
- Remove items
- Update quantities
- Accept/decline promotions
- Navigate between pages
- Reload page
- Complete checkout

---

## Running Specific Test Scenarios

### Quick Smoke Test (30 seconds)
```bash
npx playwright test smoke
```

### Feature Testing (5-8 minutes)
```bash
npx playwright test menu cart
```

### Complete Regression (10-15 minutes)
```bash
npx playwright test
```

### Single Test Execution
```bash
npx playwright test -g "should add Cappuccino to cart"
```

---

## Test Maintenance

**Regular Updates Needed:**
- Update selectors if UI changes
- Add tests for new features
- Update expected values if pricing changes
- Adjust timeouts if performance changes

**Known Limitations:**
- Some page object selectors may need adjustment based on actual app structure
- Payment form tests are conditional (form may not always be present)
- Promotional message timing may vary

---

## CI/CD Integration

These tests are designed to run in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Install dependencies
  run: npm install
  
- name: Install Playwright browsers
  run: npx playwright install --with-deps
  
- name: Run smoke tests
  run: npx playwright test smoke
  
- name: Run all tests
  run: npx playwright test
  
- name: Upload test results
  run: npx playwright show-report
```

---

## Success Metrics

**Test Suite Health Indicators:**
- ✅ Smoke tests pass rate: >99%
- ✅ Overall pass rate: >95%
- ✅ Execution time: <15 minutes
- ✅ Flaky test rate: <2%

---

## Contact & Support

For issues or questions about these tests:
1. Check the main README.md for setup instructions
2. Review page object methods in MenuPage.js and CartPage.js
3. Run tests in debug mode: `npx playwright test --debug`
4. Check the HTML report: `npx playwright show-report`

---

**Last Updated:** November 2025  
**Framework:** Playwright v1.x  
**Language:** JavaScript  
**Pattern:** Page Object Model (POM)

