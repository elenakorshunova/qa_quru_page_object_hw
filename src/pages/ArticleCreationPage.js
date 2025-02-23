export class ArticleCreationPage {
    constructor(page) {
        this.page = page;

        this.newArticleButton = page.getByRole("link", { name: "New Article" });
        this.publishButton = page.getByRole("button", { name: "Publish Article" });
        this.profileNameField = page.getByRole("navigation");
        this.summaryArticleField = page.getByRole("textbox", { name: "What's this article about?" });
        this.tagsField = page.getByRole("textbox", { name: "Enter tags" });
        this.textArticleField = page.getByRole("textbox", { name: "Write your article (in" });
        this.titleArticleField = page.getByRole("textbox", { name: "Article Title" });
    }

    async addArticleText(title, summary, text) {
        await this.titleArticleField.click();
        await this.titleArticleField.fill(title);
        await this.summaryArticleField.click();
        await this.summaryArticleField.fill(summary);
        await this.textArticleField.click();
        await this.textArticleField.fill(text);
        await this.publishButton.click();
    }
}
