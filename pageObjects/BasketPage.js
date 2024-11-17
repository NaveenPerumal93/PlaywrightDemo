const {test,expect} = require('@playwright/test')

class BasketPage{

   
    constructor(page){
        this.page = page;      
    }

    async displayBasket(){
        await this.page.locator("div li").first().waitFor();
        const prodDisplay = await(this.page.locator("h3:has-text('ZARA COAT 3')").isVisible());
        expect(prodDisplay).toBeTruthy();
    }

}

module.exports = {BasketPage}