import Moment from 'moment';
import { Button, Header, Input, Item } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Card, Overlay } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import { Event } from '../../../models/Event';
import { AddNewReservation, GetAllEvents } from '../../../service/api';

function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([]);
  const [moreInfoObject, setMoreInfoObject] = useState<Event | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [number, setNumber] = useState<number>(1);
  const getData = async () => {
    const res = await GetAllEvents();
    setEvents(res);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleMoreInfo = async (id: string) => {
    let event: Event = await events.find((x) => x._id == id);
    setMoreInfoObject(event);
  };

  const toggleOverlay = () => {
    setVisible(!visible);
    if (visible === false) {
      setMoreInfoObject(null);
      setNumber(1);
    }
  };

  const filtered = events?.filter((i) => {
    if (searchText !== '')
      return i.eventName
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase());
    else return events;
  });

  const handleCreateReservation = async () => {
    let res = await AddNewReservation(moreInfoObject, number);
    if (res !== null) {
      Alert.alert('Uspesno ste rezervisali dogadjaj!');
      getData();
      toggleOverlay();
    } else Alert.alert('Nije moguce rezervisati dogadjaj!');
  };

  return (
    <SafeAreaView>
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
            height: '80%',
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
                <Text style={[styles.date, { marginBottom: 10 }]}>
                  Dostupno: {moreInfoObject.available}
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  height: 30,
                }}
              >
                <Text>
                  Broj rezervacija ( max{' '}
                  {Math.min(5, moreInfoObject.available.valueOf())} )
                </Text>
                <NumericInput
                  value={number}
                  valueType="integer"
                  minValue={1}
                  maxValue={Math.min(5, moreInfoObject.available.valueOf())}
                  step={1}
                  totalHeight={35}
                  totalWidth={75}
                  type="plus-minus"
                  rounded
                  textColor="#005691"
                  leftButtonBackgroundColor={'#005691'}
                  rightButtonBackgroundColor={'#005691'}
                  onChange={(value) => setNumber(value)}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                margin: 5,
              }}
            >
              <Button
                style={styles.buttonReservation}
                onPress={handleCreateReservation}
              >
                <Text style={{ color: '#FAFAFA', justifyContent: 'center' }}>
                  Rezervisi
                </Text>
              </Button>
            </View>
          </View>
        </Overlay>
      ) : null}

      <Header searchBar style={{ backgroundColor: '#e8f1f5' }}>
        <Item style={{ backgroundColor: '#e8f1f5' }}>
          <Input
            placeholder="Pretrazi po nazivu"
            value={searchText}
            onChangeText={(searchText) => setSearchText(searchText)}
          />
        </Item>
      </Header>
      <ScrollView style={{ marginBottom: 50 }}>
        {filtered?.map((item: Event, index) => (
          <Card key={index} containerStyle={styles.container}>
            <View style={styles.elementsUp}>
              <Card.Image style={styles.image} source={{ uri: item.photo }} />
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  flex: 1,
                }}
              >
                <Card.Title style={styles.title}>{item.eventName}</Card.Title>
                <Text style={styles.date}>
                  Datum: {Moment(item!.date).format('DD.MM.YYYY.')}
                </Text>
                <Text style={styles.location}>{item.location[0].place}</Text>
              </View>
            </View>
            <View style={styles.buttons}>
              <Button
                style={styles.button}
                onPress={() => {
                  handleMoreInfo(item._id);
                  toggleOverlay();
                }}
              >
                <Text
                  style={{
                    color: '#FAFAFA',
                    justifyContent: 'center',
                  }}
                >
                  Vise
                </Text>
              </Button>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#005691',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonReservation: {
    flexDirection: 'row',
    backgroundColor: '#005691',
    alignContent: 'center',
    justifyContent: 'center',
    width: '90%',
    marginTop: '3%',
  },
});

export default SearchScreen;
