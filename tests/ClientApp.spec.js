const {test,expect} = require('@playwright/test')

test('Retail Playwright test', async ({browser,page})=>{
   

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("input#userEmail").fill("testNaveenGoki@gmail.com");   
    await page.locator("input#userPassword").fill("$Smart93");
    await page.locator("#login").click();   
    await page.waitForLoadState('networkidle');

    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const productCount =  await products.count();
    console.log("Product Count: "+productCount);


    for(let i = 0; i<productCount; ++i){
         
        if(await products.nth(i).locator("b").textContent() ===  productName){
           await  products.nth(i).locator("text= Add To Cart").click();
            break;
        }
              
    }

   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const prodDisplay = await(page.locator("h3:has-text('ZARA COAT 3')").isVisible());
   expect(prodDisplay).toBeTruthy();
   
    await page.locator("text='Checkout'").click();

    await page.locator("[class='input txt']").first().fill("785");
    await page.locator("[class='input txt']").last().fill("Naveen");
    
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
   // await page.locator("[placeholder*='Country']").type("ind",{delay:100});

    const listcountry = page.locator(".ta-results");
    await listcountry.waitFor();
    

    const countrytext = await page.locator("[class*='ta-results'] button");
    const count1 = await listcountry.locator("button").count();
    console.log("Country Count: "+count1);

    for(let i=0; i<count1; i++){

         let text = await countrytext.nth(i).textContent();
         if( text === " India"){
            await countrytext.nth(i).click();
            break;
        }

    }

    await page.locator("text='Place Order '").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const OrderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID: "+OrderID);


    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    
    const OrdersCount = await page.locator("tbody tr"); 
    const ordercount = await OrdersCount.count();
    console.log("Orders Count: "+ordercount);

    for(let i = 0; i<ordercount; i++){
        const reqOrder = await OrdersCount.nth(i).locator("th").textContent();
        if(OrderID.includes(reqOrder)){
            await OrdersCount.nth(i).locator("button").first().click();
            break;
        }
    }

    const finalOrderID = await page.locator(".col-text").textContent();
    expect(OrderID.includes(finalOrderID)).toBeTruthy();

    await page.pause();
})
  