from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch()
    context = browser.new_context()
    page = context.new_page()

    page.goto("http://localhost:5174/main-dashboard")

    # Fill out the form
    page.get_by_label("Product Name").fill("Test Product")
    page.get_by_label("Category/Type").select_option("Meal")
    page.get_by_label("Product Code/SKU").fill("TEST-SKU-123")
    page.get_by_label("MRP (₹)").fill("100")
    page.get_by_label("Discount (%)").fill("10")

    # Verify the selling price
    expect(page.locator(".selling-price")).to_have_text("₹90.00")

    # Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
