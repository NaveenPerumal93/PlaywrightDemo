const {When,Then,Given,And} = require('@cucumber/cucumber')
const {POManager} = require('../../pageObjects/POManager')
const {expect} = require('@playwright/test')
const playwright = require('@playwright/test')


Given('login into e-commerce application with {string} and {string}', {timeout : 100*1000}, async function (email, password) {
    
    const browser = await playwright.chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    this.pomanager = new POManager(page);
    const loginPage = this.pomanager.getLoginPage();
    await loginPage.goTo();
    await loginPage.enterLoginDetails(email,password);
    
  });

  When('add product {string} to cart', async function (productName) {
    const dashboardPage = this.pomanager.getDashboardPage();
    await dashboardPage.addProductToCart(productName);
     
  });

  Then('verify {string} is displayed in cart', async function (productName) {
    const basketpage = this.pomanager.getBasketPage();
    await basketpage.displayBasket(); 
  });

  Then('enter the checkout details as {string}, {string}, {string}', async function (username,cvv,country) {
    const checkoutPage = this.pomanager.getCheckoutPage();
    await checkoutPage.enterCheckoutDetails(username,cvv,country);
  });

  Then('verify the order with order details', async function () {

    const ordersPage = this.pomanager.getOrdersPage();
    const orderHistoryPage = this.pomanager.getOrderHistoryPage();

    const orderID = await ordersPage.verifyandGetOrder();
    console.log("Client Order ID: "+orderID);
    await orderHistoryPage.ViewOrderDetails(orderID);
    const finalOrderID = await orderHistoryPage.getOrderID();
    expect(orderID.includes(finalOrderID)).toBeTruthy();

  });