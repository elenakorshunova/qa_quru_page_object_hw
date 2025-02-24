import {test} from "@playwright/test"; // import for using PW steps
export class RegisterPage {
    constructor(page) {
         this.page = page;
         this.signUpButton = page.getByRole("button", { name: "Sign up" });
         this.emailField = page.getByPlaceholder("Email");
         this.passwordField = page.getByPlaceholder("Password");
         this.usernameField = page.getByPlaceholder("Your Name");
    }

    async register(username, email, password) {
         await test.step("Registration", async () => { // example how to use PW steps
              await this.usernameField.click();
              await this.usernameField.fill(username);
              await this.emailField.click();
              await this.emailField.fill(email);
              await this.passwordField.click();
              await this.passwordField.fill(password);
              await this.signUpButton.click();
         });
    }
}