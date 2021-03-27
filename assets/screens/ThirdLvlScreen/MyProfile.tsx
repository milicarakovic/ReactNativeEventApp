import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Button, Card, Input, Switch } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GetUser, TokenContext, UpdateUser } from '../../../service/api';
import { User } from './../../../models/User';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

function MyProfile() {
  const [switchOn, setSwitchOn] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [image, setImage] = useState<any>(null);
  const { token, setToken } = useContext(TokenContext);

  const uploadPhoto = async () => {
    let permisiion = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permisiion.granted == false) {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (result.cancelled) {
      return;
    }
    const { uri } = result as ImageInfo;

    const img = {
      uri: uri,
      type: 'image',
      name: uri.substr(uri.lastIndexOf('/') + 1),
    };

    setImage(img);
  };

  const onToggleSwitch = () => {
    setSwitchOn(!switchOn);
  };

  async function getToken() {
    await AsyncStorage.getItem('token').then((item) => {
      if (item) {
        setToken(item);
        return token;
      }
    });
    return token;
  }

  useEffect(() => {
    let tok = getToken();
    getData();
  }, []);

  const getData = async () => {
    const res = await GetUser();
    let user: User = new User(
      res.name,
      res.surname,
      res.username,
      res.email,
      res.phone,
      res.password,
      res.image
    );

    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
    setPhone(user.phone);
    setUsername(user.username);
    setImage(user.image);
  };

  const handleUpdateData = async () => {
    let user = new User(name, surname, username, email, phone, null, image);
    let res = await UpdateUser(user);
    if (res !== null) {
      getData();
      setSwitchOn(!switchOn);
    } else {
      Alert.prompt(
        'Greska prilikom izmene korisnickog naloga',
        'Pokusajte ponovo'
      );
      getData();
    }
  };

  return (
    <Card style={styles.container}>
      <ScrollView style={styles.infoProfile}>
        <Switch
          value={switchOn}
          onValueChange={onToggleSwitch}
          style={{ alignSelf: 'flex-end', marginTop: 0 }}
          trackColor={{ true: '#005691', false: '#E8F1F5' }}
        />
        <View style={styles.profileImage}>
          {image !== null && image !== undefined ? (
            <Image source={{ uri: image.uri }} style={styles.image} />
          ) : (
            <Image
              source={require('../FIrstLvlScreens/signUpScreens/me.png')}
              style={styles.image}
            />
          )}
        </View>

        <Button
          style={[
            styles.buttonUpload,
            switchOn
              ? { backgroundColor: '#005691' }
              : { backgroundColor: 'grey' },
          ]}
          onPress={uploadPhoto}
          disabled={!switchOn}
        >
          <Text style={{ color: '#FAFAFA', justifyContent: 'center' }}>
            Upload
          </Text>
        </Button>

        <Text style={styles.elements}>Name:</Text>
        <Input
          disabled={!switchOn}
          style={styles.inputElements}
          value={name}
          onChangeText={(name) => setName(name)}
        ></Input>
        <Text style={styles.elements}>Surname: </Text>
        <Input
          disabled={!switchOn}
          style={styles.inputElements}
          value={surname}
          onChangeText={(surname) => setSurname(surname)}
        ></Input>
        <Text style={styles.elements}>Username:</Text>
        <Input
          disabled={!switchOn}
          style={styles.inputElements}
          value={username}
          onChangeText={(username) => setUsername(username)}
        ></Input>
        <Text style={styles.elements}>E-mail: </Text>
        <Input
          disabled={!switchOn}
          style={styles.inputElements}
          value={email}
          onChangeText={(email) => setEmail(email)}
        ></Input>
        <Text style={styles.elements}>Phone number: </Text>
        <Input
          disabled={!switchOn}
          style={styles.inputElements}
          value={phone}
          onChangeText={(phone) => setPhone(phone)}
        ></Input>
        <View style={styles.buttons}>
          <Button
            style={{ width: 100, justifyContent: 'center' }}
            disabled={!switchOn}
            bordered
            onPress={() => getData()}
          >
            <Text>Odbaci</Text>
          </Button>

          <Button
            style={{ width: 100, justifyContent: 'center' }}
            disabled={!switchOn}
            onPress={handleUpdateData}
          >
            <Text>Sacuvaj</Text>
          </Button>
        </View>
      </ScrollView>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    marginTop: 17,
  },
  profileImage: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    margin: '2%',
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  buttonUpload: {
    height: '7%',
    width: 200,
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'column',
    marginBottom: '3%',
    justifyContent: 'center',
  },
  infoProfile: {
    flexDirection: 'column',
    alignContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: 350,
    marginBottom: '3%',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '1%',
    backgroundColor: '#E8F1F5',
  },
  elements: {
    flexDirection: 'row',
    marginTop: '5%',
    height: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#005691',
  },
  inputElements: {
    height: 25,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#005691',
    textAlign: 'center',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '4%',
    marginBottom: '10%',
  },
});
export default MyProfile;
