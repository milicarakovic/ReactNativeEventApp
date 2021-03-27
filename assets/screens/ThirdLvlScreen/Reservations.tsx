import Moment from 'moment';
import { Button, Header, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet } from 'react-native';
import { Card, Overlay } from 'react-native-elements';
import { Event } from '../../../models/Event';
import { Reservation } from '../../../models/Reservation';
import {
  DeleteReservation,
  GetAllEvents,
  GetAllReservations,
} from '../../../service/api';

function Reservations({ navigation }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [moreInfoObject, setMoreInfoObject] = useState<Event | null>(null);

  useEffect(() => {
    getData();
  }, [visible]);

  const getData = async () => {
    const res = await GetAllReservations();
    setReservations(res);
    const eve = await GetAllEvents();
    setEvents(eve);
  };

  const handleCancelReservation = async (id: string) => {
    const res = await DeleteReservation(id);
    if (res) {
      Alert.alert('Uspesno je otkazana rezervacija.');
      getData();
    } else {
      Alert.alert('Nije moguce obrisati rezervaciju.');
      console.log(res);
    }
  };

  const handleMoreInfo = async (id: string) => {
    let event: Event = await events.find((x) => x._id == id);
    setMoreInfoObject(event);
    setVisible(true);
  };

  const toggleOverlay = () => {
    setVisible(!visible);
    if (visible === false) {
      setMoreInfoObject(null);
    }
  };
  return (
    <ScrollView>
      {moreInfoObject ? (
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#e8f1f5',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#005691',
            width: '90%',
            height: '60%',
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  padding: 20,
                }}
              >
                <Text style={[styles.title, { marginBottom: 10 }]}>
                  {moreInfoObject.eventName}
                </Text>
                <Text style={[styles.date, { marginBottom: 10 }]}>
                  Datum: {Moment(moreInfoObject!.date).format('DD.MM.YYYY.')}
                </Text>
                <Text style={[styles.location, { marginBottom: 10 }]}>
                  {moreInfoObject.location[0].city},{' '}
                  {moreInfoObject.location[0].district},{' '}
                </Text>
                <Text
                  style={[styles.location, { marginBottom: 10, color: 'blue' }]}
                  onPress={() => {
                    setVisible(false);
                    navigation.navigate('Map');
                  }}
                >
                  {moreInfoObject.location[0].place}
                </Text>
                <Text style={[styles.date, { marginBottom: 10 }]}>
                  {[moreInfoObject.description]}
                </Text>
                <View
                  style={{
                    borderTopWidth: 2,
                    marginTop: 10,
                  }}
                >
                  <Text style={[styles.location, { margin: 10 }]}>
                    Kontaktirajte nas:
                  </Text>
                  <Text
                    style={[styles.date, { color: 'blue', margin: 5 }]}
                    onPress={() =>
                      Linking.openURL(`tel:${moreInfoObject.contact[0].phone}`)
                    }
                  >
                    {[moreInfoObject.contact[0].phone]}
                  </Text>
                  <Text
                    style={[styles.date, { color: 'blue' }]}
                    onPress={() =>
                      Linking.openURL(
                        `mailto:${moreInfoObject.contact[0].email}`
                      )
                    }
                  >
                    {[moreInfoObject.contact[0].email]}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Overlay>
      ) : null}

      <Header style={styles.header}>
        <Text style={styles.headerText}>Kreirane rezervacije:</Text>
      </Header>
      {reservations.length !== 0 ? (
        reservations?.map((item, index) => (
          <Card key={index} containerStyle={styles.container}>
            <View style={styles.elementsUp}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  flex: 1,
                }}
              >
                <Card.Title style={styles.title}>
                  {item.event.eventName}
                </Card.Title>
                <Text style={styles.date}>
                  Datum: {Moment(item!.event.eventDate).format('DD.MM.YYYY.')}
                </Text>
                <Text>Broj osoba: {item.numberPeople.toString()}</Text>
              </View>
            </View>
            <View style={styles.buttons}>
              <Button
                style={styles.button}
                onPress={() => {
                  handleCancelReservation(item._id);
                }}
                danger
              >
                <Text style={{ color: '#FAFAFA', justifyContent: 'center' }}>
                  Otkazi
                </Text>
              </Button>
              <Button
                style={styles.buttonMore}
                onPress={() => handleMoreInfo(item.event.eventId.toString())}
              >
                <Text style={{ color: '#FAFAFA', justifyContent: 'center' }}>
                  Vise
                </Text>
              </Button>
            </View>
          </Card>
        ))
      ) : (
        <View>
          <Text style={styles.date}>Nema kreiranih rezervacija.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: { fontWeight: 'bold', fontSize: 20, color: '#005691' },
  container: {
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#e8f1f5',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#005691',
  },
  elementsUp: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 350,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#005691',
  },
  date: {
    alignSelf: 'center',
    fontSize: 15,
  },
  location: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    width: 100,
  },
  buttonMore: {
    flexDirection: 'row',
    backgroundColor: '#005691',
    alignContent: 'center',
    justifyContent: 'center',
    width: 100,
  },
});
export default Reservations;
