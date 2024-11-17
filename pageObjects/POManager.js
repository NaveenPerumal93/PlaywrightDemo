const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {BasketPage} = require('./BasketPage');
const {CheckoutPage} = require('./CheckoutPage');
const {OrdersPage} = require('./OrdersPage');
const {OrderHistoryPage} = require('./OrderHistoryPage');

class POManager{


     constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.basketPage = new BasketPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.ordersPage = new OrdersPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
     }

     getLoginPage(){
        return this.loginPage;
     }

     getDashboardPage(){
        return this.dashboardPage;
     }

     getBasketPage(){
        return this.basketPage;
     }

     getCheckoutPage(){
        return this.checkoutPage;
     }

     getOrdersPage(){
        return this.ordersPage;
     }

     getOrderHistoryPage(){
      return this.orderHistoryPage;
   }
}
module.exports = {POManager}