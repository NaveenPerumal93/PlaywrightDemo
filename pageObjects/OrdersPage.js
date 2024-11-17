const {test,expect} = require('@playwright/test')

class OrdersPage{

    constructor(page){
        this.page = page;
        this.orderSuccess = page.locator(".hero-primary");
        this.orderIDText = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async verifyandGetOrder(){

        await expect(this.orderSuccess).toHaveText(" Thankyou for the order. ");
        const OrderID = this.orderIDText.textContent();
        console.log("Order ID: "+OrderID);
        return OrderID;
    }
}

module.exports = {OrdersPage}