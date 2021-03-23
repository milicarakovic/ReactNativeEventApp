type EventType = {
  eventId: number;
  eventName: string;
  eventDate: Date;
};

export class Reservation {
  _id: string;
  event: EventType;
  userId: number;
  numberPeople: number;

  constructor(
    _id: string,
    event: EventType,
    userId: number,
    numberPeople: number
  ) {
    this._id = _id;
    this.event = event;
    this.userId = userId;
    this.numberPeople = numberPeople;
  }
}
