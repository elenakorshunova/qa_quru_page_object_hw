import { faker } from "@faker-js/faker";

export class ArticleBuilder {
     addTitle() {
          this.Title = faker.lorem.words(2);
          return this;
     }
     addSummary(symbol = 10) {
          this.Summary = faker.lorem.words(5);
          return this;
     }
     addText() {
          this.Text = faker.lorem.sentences(5);
          return this;
     }

     generate() {
          return {
               title: this.Title,
               summary: this.Summary,
               text: this.Text,
          };
     }
}

 