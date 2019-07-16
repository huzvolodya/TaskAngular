import { UserInterface } from 'src/interfaces';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;

  constructor({ id, first_name, last_name, email, avatar }: UserInterface) {
    this.id = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
    this.avatar = avatar;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
