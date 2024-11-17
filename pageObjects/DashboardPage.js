class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cart = page.locator("[routerlink*='cart']");
        this.product = page.locator(".card-body a");

    }

    async addProductToCart(productName) {
               
        await this.products.nth(0).waitFor();
        const productCount = await this.products.count();
        console.log("Product Count: " + productCount);

        for (let i = 0; i < productCount; ++i) {

            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }

        await this.cart.click();
    }

}

module.exports = {DashboardPage}