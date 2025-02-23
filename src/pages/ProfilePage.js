export class ProfilePage {
    constructor(page) {
        this.page = page;
        this.logOutButton = page.getByRole("link", { name: "Logout" });
        this.updateButton = page.getByRole("button", { name: "Update Settings" });
        this.newArticleButton = page.getByRole("link", { name: "New Article" });
        this.passwordField = page.getByRole("textbox", { name: "Password" });
        this.profileNameField = page.getByRole("navigation");
    }

    async createNewPassword(password) {
        await this.passwordField.click();
        await this.passwordField.fill(password);
        await this.updateButton.click();
    }
    async logOut(username) {
        await this.profileNameField.getByText(username).click(); // TO DO подумать как можно вынести user creds в PO (параметром в конструктор?)
        await this.logOutButton.click();
    }
}
