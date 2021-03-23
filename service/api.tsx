import AsyncStorage from '@react-native-community/async-storage';
import { createContext, useContext } from 'react';
import { Event } from '../models/Event';
import { EventType } from '../models/EventType';
import { Reservation } from '../models/Reservation';
import { User } from '../models/User';
import { UserLogIn } from '../models/UserLogIn';

export const baseUrl = 'http://192.168.1.239:3000';

export type IToken = {
  token: string;
  setToken: (value: string) => void;
};
const TokenDefault: IToken = {
  token: '',
  setToken: () => null,
};

export const TokenContext = createContext<IToken>(TokenDefault);

export type IValid = {
  value: boolean;
  setValue: (value: boolean) => void;
};
export const ValidDefault: IValid = {
  value: false,
  setValue: () => null,
};
export const IsValidContext = createContext<IValid>(ValidDefault);
export const useValidInformation = () => useContext(IsValidContext);

export async function GetAllEvents(): Promise<Event[]> {
  try {
    const value = await AsyncStorage.getItem('token');
    const res = await fetch(baseUrl + '/events', {
      method: 'GET',
      headers: new Headers({
        'auth-token': value,
      }),
    });
    var events = await res.json();
  } catch (err) {
    console.log(err);
  }
  return events;
}

export async function GetAllReservations(): Promise<Reservation[]> {
  try {
    const value = await AsyncStorage.getItem('token');
    const res = await fetch(baseUrl + '/reservations', {
      method: 'GET',
      headers: new Headers({
        'auth-token': value,
      }),
    });
    var reservations = await res.json();
  } catch (err) {
    console.log(err);
  }
  return reservations;
}

export async function DeleteReservation(
  reservationId: string
): Promise<Reservation | null> {
  try {
    const value = await AsyncStorage.getItem('token');
    const res = await fetch(baseUrl + `/reservations/${reservationId}`, {
      method: 'DELETE',
      headers: new Headers({
        'auth-token': value,
      }),
    });
    var deleted = await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
  return deleted;
}

export async function GetUser(): Promise<User> {
  let user: User;
  const value = await AsyncStorage.getItem('token');
  try {
    await fetch(baseUrl + '/user/me', {
      method: 'GET',
      headers: new Headers({
        'auth-token': value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        user = data;
      });
  } catch (err) {
    console.log(err);
  }
  return user;
}

export async function LogInUser(email: string, pass: string): Promise<boolean> {
  let user = new UserLogIn(email, pass);
  let isOk: boolean;
  await fetch(baseUrl + '/user/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  }).then(async (data) => {
    if (data.status == 200) {
      await AsyncStorage.setItem('token', data.headers.get('auth-token'));
      isOk = true;
      // return data.headers.get('auth-token');
    } else {
      // AsyncStorage.setItem('token', 'k');
      isOk = false;
      // return 'k';
    }
  });
  return isOk;
}

export async function CreateUser(user: User): Promise<string | null> {
  let finalResponse: string | null;
  await fetch(baseUrl + `/user/register`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => {
      return data.text();
    })
    .then((fin) => {
      finalResponse = fin;
    });

  return finalResponse;
}

export async function UpdateUser(user: User): Promise<User | null> {
  let updatedUser: User;
  const value = await AsyncStorage.getItem('token');
  await fetch(baseUrl + `/user/update`, {
    method: 'PATCH',
    body: JSON.stringify(user),
    headers: new Headers({
      'Content-Type': 'application/json',
      'auth-token': value,
    }),
  })
    .then((res) => {
      if (res.status === 400) return null;
      return res.json();
    })
    .then((data) => {
      updatedUser = data;
    })
    .catch((err) => {
      updatedUser = null;
    });
  return updatedUser;
}

export async function AddNewReservation(
  event: Event,
  number: number
): Promise<Reservation | null> {
  try {
    const value = await AsyncStorage.getItem('token');
    const res = await fetch(baseUrl + '/reservations', {
      method: 'POST',
      body: JSON.stringify({ event: event, numberPeople: number }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'auth-token': value,
      }),
    });

    var newReservation = await res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
  return newReservation;
}
export async function GetAllEventTypes(): Promise<EventType[]> {
  try {
    const value = await AsyncStorage.getItem('token');
    const res = await fetch(baseUrl + '/eventTypes', {
      method: 'GET',
      headers: new Headers({
        'auth-token': value,
      }),
    });
    var eventTypes = await res.json();
  } catch (err) {
    console.log(err);
  }
  return eventTypes;
}
