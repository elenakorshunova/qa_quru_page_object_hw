export class FeedPage {
    constructor(page) {
        this.page = page;
        this.globalFeedButton = page.getByRole("button", { name: "Global Feed" });
        this.newArticleButton = page.getByRole("link", { name: "New Article" });
        this.settingsButton = page.getByRole("link", { name: "Settings" });
        this.randomArticleButton = page.locator(".preview-link").first();
        this.profileNameField = page.getByRole("navigation");
    }

    async goToArticle() {
        await this.newArticleButton.click();
    }

    async openGlobalFeed() {
        await this.globalFeedButton.click();
    }

    async chooseArticle() {
        await this.randomArticleButton.click();
    }

    async openSettings(username) {
        await this.profileNameField.getByText(username).click(); // TO DO подумать как можно вынести user creds в PO (параметром в конструктор?)
        await this.settingsButton.click();
    }
}
