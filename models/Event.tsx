type Contact = {
  phone: string;
  email: string;
};

type Location = {
  city: string;
  district: string;
  place: string;
  longitude: Number;
  latitude: Number
};

export class Event {
  _id: string;
  eventName: string;
  description: string;
  date: Date;
  location: Location;
  // type: number;
  photo: string;
  contact: Contact;
  available: Number;

  constructor(
    _id: string,
    eventName: string,
    description: string,
    date: Date,
    location: Location,
    // type: number,
    photo: string,
    contact: Contact,
    available: Number
  ) {
    this._id = _id;
    this.eventName = eventName;
    this.description = description;
    this.date = date;
    this.location = location;
    // this.type = type;
    this.photo = photo;
    this.contact = contact;
    this.available = available;
  }
}
