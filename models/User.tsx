export class User {
  // id: number;
  name: string;
  surname: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  image: any;
  // date: Date;

  constructor(
    // id: number,
    name: string,
    surname: string,
    username: string,
    email: string,
    phone: string,
    password: string,
    image: any
    // date: Date
  ) {
    // this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    // this.date = date;
    this.surname = surname;
    this.name = name;
    this.phone = phone;
    this.image = image;
  }
}
