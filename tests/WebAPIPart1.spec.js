const {test,expect,request} = require('@playwright/test')
const {APIUtils} = require('./utils/APIUtils');

const loginPayLoad = {userEmail:"testNaveenGoki@gmail.com",userPassword:"$Smart93"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6581ca399fd99c85e8ee7f45"}]}



test.beforeAll(async() =>
    {
     const apiContext = await request.newContext();
     const apiUtils = new APIUtils(apiContext,loginPayLoad);
     apiUtils.createOrder(orderPayload);

});  

test('Client App Login', async ({browser,page})=>{



    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    },token);
   

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    
    const OrdersCount = await page.locator("tbody tr"); 
    const ordercount = await OrdersCount.count();
    console.log("Orders Count: "+ordercount);
 
    for(let i = 0; i<ordercount; i++){
        const reqOrder = await OrdersCount.nth(i).locator("th").textContent();
        if(orderId.includes(reqOrder)){
            await OrdersCount.nth(i).locator("button").first().click();
            break;
        }
    }

    const finalOrderID = await page.locator(".col-text").textContent();
    console.log("Final Order ID: "+finalOrderID);
    expect(orderId.includes(finalOrderID)).toBeTruthy();

    await page.pause();
})
  