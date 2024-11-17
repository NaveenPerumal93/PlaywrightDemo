class LoginPage {

    constructor(page) {

        this.page = page;
        this.username = page.locator("input#userEmail");
        this.password = page.locator("input#userPassword");
        this.signInButton = page.locator("#login");
  
    }


    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async enterLoginDetails(username, password) {
        await this.username.type(username);
        await this.password.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');  
    }

}

module.exports = {LoginPage}