export class ArticlePage {
    constructor(page) {
        this.page = page;
        this.commentField = page.getByPlaceholder("Write a comment...");
        this.createdSummaryField = page.getByPlaceholder("What's this article about?");
        this.createdTextField = page.locator(".article-page");
        this.createdTitleField = page.getByRole("heading");
        this.sendCommentButton = page.getByRole("button", { name: "Post Comment" });
    }

    async addComment(comment) {
        await this.commentField.click();
        await this.commentField.fill(comment);
        await this.sendCommentButton.click();
    }
}
