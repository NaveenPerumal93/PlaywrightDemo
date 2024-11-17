const {test,expect} = require('@playwright/test')
const {LoginPage} = require('../pageObjects/LoginPage')
const {DashboardPage} = require('../pageObjects/DashboardPage')
const {CheckoutPage} = require('../pageObjects/CheckoutPage')
const {POManager} = require('../pageObjects/POManager')
const { OrdersPage } = require('../pageObjects/OrdersPage')
const orderData = JSON.parse(JSON.stringify(require('../utils/OrderPlacingData.json')))

test('Retail Playwright test', async ({browser,page})=>{
   
    const email = orderData.email;
    const password = orderData.password;
    const productName = orderData.productName;
    const cvv = orderData.cvv;
    const name = orderData.name;
    const country = orderData.country;
    
    const pomanager = new POManager(page);
    const loginPage = pomanager.getLoginPage();
    const dashboardPage = pomanager.getDashboardPage();
    const basketpage = pomanager.getBasketPage();
    const checkoutPage = pomanager.getCheckoutPage();
    const ordersPage = pomanager.getOrdersPage();
    const orderHistoryPage = pomanager.getOrderHistoryPage();

    await loginPage.goTo();
    await loginPage.enterLoginDetails(email,password);
    await dashboardPage.addProductToCart(productName);
    await basketpage.displayBasket();  
    await checkoutPage.enterCheckoutDetails(name,cvv,country);

    const orderID = await ordersPage.verifyandGetOrder();
    console.log("Client Order ID: "+orderID);
   
    await orderHistoryPage.ViewOrderDetails(orderID);

    const finalOrderID = await orderHistoryPage.getOrderID();
    expect(orderID.includes(finalOrderID)).toBeTruthy();

    await page.pause();
})
  