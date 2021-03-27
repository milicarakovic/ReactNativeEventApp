import * as Location from 'expo-location';
import { Button, Icon, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { GetAllEvents } from '../../../service/api';

function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [text, setText] = useState('Ucitavanje lokacije...');
  const [pins, setPins] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getData();
    handlePins();
  }, []);

  useEffect(() => {
    if (location) setText('Vasa lokacija je pronadjena');
    handlePins();
  }, [location]);

  const getData = async () => {
    const res = await GetAllEvents();
    setEvents(res);
  };

  const handlePins = () => {
    let helperPin = [];
    for (let index = 0; index < events.length; index++) {
      const element = events[index];
      let pin = new Object({
        key: index,
        latitude: element.location[0].latitude,
        longitude: element.location[0].longitude,
        title: element.eventName,
      });
      helperPin.push(pin);
    }
    setPins(helperPin);
  };

  async function _getLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Odbijen zahtev za pristup lokaciji telefona.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(
      new Object({
        key: 'initial',
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        title: 'Vasa lokacija',
      })
    );
  }

  return (
    <SafeAreaView>
      <Button
        onPress={() => navigation.navigate('HomeScreen')}
        bordered
        rounded
        block
        success
        style={styles.button}
        iconLeft
      >
        <Icon name="md-arrow-round-back" style={{ color: 'green' }} />
        <Text style={{ color: 'green' }}>Back</Text>
      </Button>
      <Text
        style={{
          fontSize: 15,
          alignSelf: 'center',
          marginBottom: 2,
          marginTop: 2,
        }}
      >
        {text}
      </Text>
      <MapView
        style={styles.map}
        onMapReady={_getLocation}
        initialRegion={{
          latitude: 44.787197,
          longitude: 20.457273,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsCompass={true}
      >
        {location ? (
          <MapView.Marker
            key={location.key}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
          />
        ) : null}
        {pins && pins.length > 0
          ? pins.map((item, index) => (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={item.title}
                pinColor="green"
              />
            ))
          : null}
      </MapView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: '90%',
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
  },
});
