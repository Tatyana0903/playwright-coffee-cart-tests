# Quick Start Guide - Coffee Cart Tests

## 🚀 Get Started in 3 Steps

### 1️⃣ Install
```bash
npm install
```

### 2️⃣ Run Smoke Tests (30 seconds)
```bash
npx playwright test smoke
```

### 3️⃣ View Results
```bash
npx playwright show-report
```

---

## 📋 Common Commands

### Run Tests

| Command | What it does | Time |
|---------|-------------|------|
| `npx playwright test smoke` | Quick validation | ~30s |
| `npx playwright test menu` | Menu functionality | ~1-2min |
| `npx playwright test cart` | Cart operations | ~2-3min |
| `npx playwright test checkout` | Checkout flow | ~2-3min |
| `npx playwright test e2e` | Full scenarios | ~3-4min |
| `npx playwright test` | All tests | ~10-15min |

### Debug & Report

| Command | What it does |
|---------|-------------|
| `npx playwright test --ui` | Interactive UI mode |
| `npx playwright test --headed` | See browser |
| `npx playwright test --debug` | Debug mode |
| `npx playwright show-report` | View HTML report |

### Run Specific Test

```bash
# Run by test name (partial match)
npx playwright test -g "Cappuccino"

# Run specific file
npx playwright test tests/menu.spec.js

# Run specific test in file
npx playwright test tests/menu.spec.js -g "should add Cappuccino"
```

---

## 🎯 Test Suites Explained

### 🔥 Smoke Tests
**When to use:** Before deploying, after major changes  
**What it tests:** Critical paths work  
```bash
npx playwright test smoke
```

### 🍕 Menu Tests
**When to use:** After menu UI changes  
**What it tests:** All menu interactions  
```bash
npx playwright test menu
```

### 🛒 Cart Tests
**When to use:** After cart feature updates  
**What it tests:** Cart management, calculations  
```bash
npx playwright test cart
```

### 💳 Checkout Tests
**When to use:** After payment flow changes  
**What it tests:** Checkout process, forms  
```bash
npx playwright test checkout
```

### 🎯 E2E Tests
**When to use:** Before releases, weekly  
**What it tests:** Complete user journeys  
```bash
npx playwright test e2e
```

---

## 🐛 Troubleshooting

### Tests are failing
1. **Check if the app is accessible:**
   ```bash
   curl https://coffee-cart.app/
   ```

2. **Run in headed mode to see what's happening:**
   ```bash
   npx playwright test --headed
   ```

3. **Run in debug mode to step through:**
   ```bash
   npx playwright test --debug
   ```

### Slow internet connection
```bash
# Increase timeout globally
npx playwright test --timeout=60000
```

### Want to see what's happening
```bash
# Open UI mode for interactive debugging
npx playwright test --ui
```

### Test failed but I can't see why
```bash
# Generate and view HTML report
npx playwright show-report
```

---

## 📊 Interpreting Results

### ✅ All Green
```
Running 5 tests using 1 worker
  ✓ [chromium] › smoke.spec.js:15:3 › Smoke Tests › SMOKE: Application loads successfully (2s)
  ✓ [chromium] › smoke.spec.js:21:3 › Smoke Tests › SMOKE: Can add item to cart (1s)
  ...
```
**Action:** You're good to go! 🎉

### ❌ Some Red
```
Running 5 tests using 1 worker
  ✓ [chromium] › smoke.spec.js:15:3 › Smoke Tests › SMOKE: Application loads successfully (2s)
  ✗ [chromium] › smoke.spec.js:21:3 › Smoke Tests › SMOKE: Can add item to cart (1s)
```
**Action:** 
1. Check the HTML report: `npx playwright show-report`
2. Run failed test in debug mode: `npx playwright test smoke -g "Can add item" --debug`

### ⚠️ Flaky (Sometimes pass, sometimes fail)
**Action:**
1. Check for timing issues
2. Add explicit waits
3. Run multiple times: `npx playwright test smoke --repeat-each=5`

---

## 💡 Pro Tips

### Speed Up Testing
```bash
# Run only changed tests
npx playwright test --only-changed

# Run specific browser only
npx playwright test --project=chromium
```

### Better Debugging
```bash
# Slow down execution to see what's happening
PWDEBUG=1 npx playwright test

# Keep browser open after test
npx playwright test --headed --debug
```

### CI/CD Integration
```bash
# Install browsers in CI
npx playwright install --with-deps

# Run in CI mode (no interactive prompts)
npx playwright test --reporter=list
```

---

## 📖 Learn More

- **Full Documentation:** See `README.md`
- **Test Details:** See `TEST_SUMMARY.md`
- **Page Objects:** Check `MenuPage.js` and `CartPage.js`
- **Playwright Docs:** https://playwright.dev

---

## 🆘 Quick Help

| Problem | Solution |
|---------|----------|
| Import errors | Run `npm install` |
| Browser not found | Run `npx playwright install` |
| Timeout errors | Add `--timeout=60000` flag |
| Can't see browser | Add `--headed` flag |
| Need to debug | Add `--debug` flag |
| Want interactive mode | Add `--ui` flag |

---

## 🎓 Next Steps

1. ✅ Run smoke tests
2. ✅ Review the HTML report
3. ✅ Try running individual test suites
4. ✅ Explore tests in UI mode: `npx playwright test --ui`
5. ✅ Read the full README.md
6. ✅ Customize tests for your needs

---

**Happy Testing! 🎭**

