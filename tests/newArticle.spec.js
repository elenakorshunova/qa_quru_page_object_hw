import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { MainPage } from "../src/pages/mainPage";
import { RegisterPage } from "../src/pages/registerPage";
import { FeedPage } from "../src/pages/FeedPage";
import { ArticleCreationPage } from "../src/pages/ArticleCreationPage";
import { ArticlePage } from "../src/pages/ArticlePage";
import { ProfilePage } from "../src/pages/ProfilePage";
import { LoginPage } from "../src/pages/LoginPage";

const URL_UI = "https://realworld.qa.guru/";

const user = {
     email: faker.internet.email(),
     password: faker.internet.password({ length: 10 }),
     username: faker.person.firstName(),
};

const newArticle = {
     title: faker.lorem.words(2),
     summary: faker.lorem.words(5),
     text: faker.lorem.sentences(5),
};

const addedComment = {
     text: faker.lorem.sentences(2),
};

const newPassword = {
     password: faker.internet.password({ length: 8 }),
};

test.describe("3 functional tests", () => {
     // autorization for new user
     test.beforeEach(async ({ page }) => {
          const mainPage = new MainPage(page);
          const registerPage = new RegisterPage(page);
          const feedPage = new FeedPage(page);

          await mainPage.open(URL_UI);
          await mainPage.goToRegister();
          await registerPage.register(user.username, user.email, user.password);
          await expect(feedPage.profileNameField).toContainText(user.username); // TO DO подумать как можно улучшить
     });

     //user creates new article
     test("Create new article", async ({ page }) => {
          const feedPage = new FeedPage(page);
          const articleCreationPage = new ArticleCreationPage(page);
          const articlePage = new ArticlePage(page);

          await feedPage.goToArticle();
          await articleCreationPage.addArticleText(newArticle.title, newArticle.summary, newArticle.text);
          await expect(articlePage.createdTitleField).toContainText(newArticle.title);
          await expect(articlePage.createdTextField).toContainText(newArticle.text);
     });

     // user adds comment
     test("Add new comment", async ({ page }) => {
          const feedPage = new FeedPage(page);
          const articlePage = new ArticlePage(page);

          await feedPage.openGlobalFeed();
          await feedPage.chooseArticle();
          await articlePage.addComment(addedComment.text);
          await expect(articlePage.commentField).toBeVisible;
     });

     //user changes password
     test("Change password", async ({ page }) => {
          const feedPage = new FeedPage(page);
          const profilePage = new ProfilePage(page);
          const mainPage = new MainPage(page);
          const loginPage = new LoginPage(page);

          await feedPage.openSettings(user.username);
          await profilePage.createNewPassword(newPassword.password);
          await profilePage.logOut(user.username);
          await mainPage.goToLogin();
          await loginPage.loginUser(user.email, newPassword.password);

          await expect(feedPage.profileNameField).toContainText(user.username); // TO DO подумать как можно улучшить
     });
});
