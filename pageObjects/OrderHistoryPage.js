class OrderHistoryPage{

    constructor(page){
        this.page = page;
        this.myOrders = page.locator("button[routerlink*='myorders']");
        this.OrdersTable = page.locator("tbody") ;
        this.Orders = page.locator("tbody tr");
        this.OrderID = page.locator(".col-text");
    }

    async ViewOrderDetails(orderID){

    await this.myOrders.click();
    await this.OrdersTable.waitFor();
    
    
    const ordercount = await this.Orders.count();
    console.log("Orders Count: "+ordercount);

    for(let i = 0; i<ordercount; i++){
        const reqOrder = await this.Orders.nth(i).locator("th").textContent();
        if(orderID.includes(reqOrder)){
            await this.Orders.nth(i).locator("button").first().click();
            break;
        }
    }
    }

     async getOrderID(){
          return await this.OrderID.textContent();
     }

}

module.exports = {OrderHistoryPage}