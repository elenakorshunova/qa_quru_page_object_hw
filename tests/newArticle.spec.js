import { test, expect } from "@playwright/test";
import { ArticleCreationPage, ArticlePage, FeedPage, LoginPage, MainPage, ProfilePage, RegisterPage } from "../src/pages/index";
import { UserBuilder, ArticleBuilder, CommentBuilder, PasswordBuilder } from "../src/helpers/builder/index";

const URL_UI = "https://realworld.qa.guru/";
const userBuilder = new UserBuilder().addEmail().addPassword(10).addUsername().generate();
const articleBuilder = new ArticleBuilder().addSummary().addText().addTitle().generate();
const commentBuilder = new CommentBuilder().addComment().generate();
const newPasswordBuilder = new PasswordBuilder().createNewPassword().generate();

test.describe("3 functional tests", () => {
     // autorization for new user
     test.beforeEach(async ({ page }) => {
          const mainPage = new MainPage(page);
          const registerPage = new RegisterPage(page);
          const feedPage = new FeedPage(page);

          await mainPage.open(URL_UI);
          await mainPage.goToRegister();
          await registerPage.register(userBuilder.username, userBuilder.email, userBuilder.password);
          await expect(feedPage.profileNameField).toContainText(userBuilder.username);
     });

     //user creates new article
     test("Create new article", async ({ page }) => {
          const feedPage = new FeedPage(page);
          const articleCreationPage = new ArticleCreationPage(page);
          const articlePage = new ArticlePage(page);

          await feedPage.goToArticle();
          await articleCreationPage.addArticleText(articleBuilder.title, articleBuilder.summary, articleBuilder.text);
          await expect(articlePage.createdTitleField).toContainText(articleBuilder.title);
          await expect(articlePage.createdTextField).toContainText(articleBuilder.text);
     });

     // user adds comment
     test("Add new comment", async ({ page }) => {
          const feedPage = new FeedPage(page);
          const articlePage = new ArticlePage(page);
          const articleCreationPage = new ArticleCreationPage(page);

          await feedPage.goToArticle();
          await articleCreationPage.addArticleText(articleBuilder.title, articleBuilder.summary, articleBuilder.text);
          await articlePage.addComment(commentBuilder.text);
          await expect(articlePage.commentField).toBeVisible;
     });

     //user changes password
     test("Change password", async ({ page }) => {
          const feedPage = new FeedPage(page);
          const profilePage = new ProfilePage(page);
          const mainPage = new MainPage(page);
          const loginPage = new LoginPage(page);

          await feedPage.openSettings(userBuilder.username);
          await profilePage.createNewPassword(newPasswordBuilder.password);
          await profilePage.logOut(userBuilder.username);
          await mainPage.goToLogin();
          await loginPage.loginUser(userBuilder.email, newPasswordBuilder.password);

          await expect(feedPage.profileNameField).toContainText(userBuilder.username);
     });
});
