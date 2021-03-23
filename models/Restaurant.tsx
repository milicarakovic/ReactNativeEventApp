// import { Contact } from './Contact';

type Contact = {
  phone: string;
  email: string;
};

export class Restaurant {
  id: number;
  name: string;
  about: string;
  image: string;
  contact: Contact;

  constructor(
    id: number,
    name: string,
    about: string,
    image: string,
    contact: Contact
  ) {
    this.id = id;
    this.name = name;
    this.about = about;
    this.image = image;
    this.contact = contact;
  }
}
