class APIUtils{


    constructor(apiContext,loginPayLoad){
          this.apiContext = apiContext
          this.loginPayLoad = loginPayLoad;
    }

    async getToken(){

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
              data:this.loginPayLoad 
            }
         )
    
         expect((loginResponse).ok()).toBeTruthy();
         const loginResponseJson = await loginResponse.json();
         token=loginResponseJson.token;
         console.log(token);
         return token;
    }

    async createOrder(orderPayload){

        let response = {};
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
               data:orderPayload,
               headers:{
                   'Authorization' : token,
                   'Content-Type' : 'application/json'
               },
            })
       
            const OrderJsonResponse = await orderResponse.json();
            console.log("OrderJson: "+OrderJsonResponse);
            orderId = OrderJsonResponse.orders[0];
            console.log("Order ID: "+orderId);
            
            response.orderId = orderID;
            return response;

    }

}

module.exports = {APIUtils};