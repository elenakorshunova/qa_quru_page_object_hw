import { faker } from "@faker-js/faker";

export class PasswordBuilder {
     createNewPassword(symbol = 10) {
          this.newPassword = faker.internet.password({ length: 10 });
          return this;
     }

     generate() {
          return {
               password: this.newPassword,
          };
     }
}