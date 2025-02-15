export class MainPage {
    constructor(page) {
        this.page = page;
        this.loginButton = page.getByRole("link", { name: "Login" });
        this.signUpButton = page.getByRole("link", { name: "Sign up" });
    }

    async goToRegister() {
        await this.signUpButton.click();
    }

    async open(url) {
        await this.page.goto(url);
    }

    async goToLogin() {
        await this.loginButton.click();
    }
}
