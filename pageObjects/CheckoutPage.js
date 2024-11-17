class CheckoutPage {

  constructor(page){
    this.page = page;
    this.checkoutbutton = page.locator("text='Checkout'");
    this.cvvtext = page.locator("[class='input txt']").first();
    this.name = page.locator("[class='input txt']").last();
    this.countrySelect = page.locator("[placeholder*='Country']");
    this.countryResults = page.locator(".ta-results");
    this.countryText = page.locator("[class*='ta-results'] button");
    this.placeOrderbutton = page.locator("text='Place Order '");
  }

  async enterCheckoutDetails(cvv,name,country){

    await this.checkoutbutton.click();

    await this.cvvtext.fill(cvv);
    await this.name.fill(name); 
    await this.countrySelect.pressSequentially(country);
   
   // const listcountry = countryResults;
    await this.countryResults.waitFor();
    

    
    const count1 = await this.countryResults.locator("button").count();
    console.log("Country Count: "+count1);

    for(let i=0; i<count1; i++){

         let text = await this.countryText.nth(i).textContent();
         if( text === " India"){
            await this.countryText.nth(i).click();
            break;
        }

    }

    await this.placeOrderbutton.click();
  }

}

module.exports = {CheckoutPage}