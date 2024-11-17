const {test,expect} = require('@playwright/test')

test('First Playwright test', async ({browser,page})=>{
    //if we want to inject cookies we can go in this way

    // const context = await browser.newContext();
    // const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("input#username").fill("rahulshetty");   
    await page.locator("input#password").fill("learning");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

})

test('Second Playwright test', async ({browser,page})=>{
    
    const userName = page.locator("input#username");
    const password = page.locator("input#password");
    const signBtn = page.locator("#signInBtn");
    const product = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await userName.fill("rahulshettyacademy");   
    await password.fill("learning");
    await signBtn.click();
    console.log(await product.nth(0).waitFor());
   // page.waitForLoadState("networkidle");
    
    console.log(await product.allTextContents());
    


})

test ('Dropdwon  Playwright test', async ({browser,page})=>{
    //if we want to inject cookies we can go in this way

    // const context = await browser.newContext();
    // const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("input#username").fill("rahulshetty");   
    await page.locator("input#password").fill("learning");
    
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    //for assertions
    console.log (await page.locator(".radiotextsty").last().isChecked());
    await expect( page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();


})

test('ChildPages  Playwright test', async ({browser})=>{
    

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentRequest =  page.locator("[href*='documents-request']");
    
    await expect(documentRequest).toHaveAttribute("class","blinkingText");
   
    
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentRequest.click()
    ])

    const emailvalue = await newPage.locator("[class*='red'] a").textContent();
    console.log("Email: "+emailvalue);
    const emailvalue1 =  emailvalue.split("@");
    const emailvalue2 = emailvalue1[1]
    console.log("Email: "+emailvalue2);
    
    await page.locator("input#username").fill(emailvalue2);  
    console.log(await page.locator("input#username").textContent());   

    await newPage.pause();


    

    
  
})