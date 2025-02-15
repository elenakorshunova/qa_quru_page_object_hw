export class LoginPage {
     constructor(page) {
          this.page = page;
          this.loginButton = page.getByRole("button", { name: "Login" });
          this.emailField = page.getByPlaceholder("Email");
          this.passwordField = page.getByRole("textbox", { name: "Password" });
     }

     async loginUser(email, password) {
          await this.emailField.click();
          await this.emailField.fill(email);
          await this.passwordField.click();
          await this.passwordField.fill(password);
          await this.loginButton.click();
     }
}
