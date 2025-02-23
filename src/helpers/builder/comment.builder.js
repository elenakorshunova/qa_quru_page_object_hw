import { faker } from "@faker-js/faker";

export class CommentBuilder {
     addComment() {
          this.commentText = faker.lorem.sentences(2);
          return this;
     }

     generate() {
          return {
               text: this.commentText,
          };
     }
}
