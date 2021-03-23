import { Picker } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useValidInformation } from '../../../../service/api';

export const cities = ['Beograd', 'Novi Sad', 'Nis'];
interface Props {
  setName: (value: string) => void;
  setSurname: (value: string) => void;
  setPhone: (value: string) => void;
  setCity: (value: string) => void;
}

function validateAll(
  name: String,
  surname: String,
  phone: String,
  city: String
) {
  let errorMsg: String = '';

  if (name.length < 2) {
    errorMsg = errorMsg + ' Morate uneti ime koje ima minimum 2 karaktera.\n';
  }
  if (surname.length < 2) {
    errorMsg =
      errorMsg + ' Morate uneti prezime koje ima minimum 2 karaktera.\n';
  }
  if (phone.length < 6) {
    errorMsg = errorMsg + ' Broj telefona ne zadovoljava broj karaktera.\n';
  }
  if (/^\d+$/.test(phone.valueOf()) == false) {
    errorMsg = errorMsg + ' Broj telefona ne sme sadrzati slova.\n';
  }
  if (city === '') {
    errorMsg = errorMsg + ' Niste odabrali grad.\n';
  }

  return errorMsg;
}

function SignUpPersonal(props: Props) {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('beograd');
  // const cities = ['Beograd', 'Novi Sad'];
  const { setValue } = useValidInformation();

  useEffect(() => {
    setValue(false);
  }, []);

  const checkData = () => {
    let validationMsg = validateAll(name, surname, phone, city);

    if (validationMsg === '') {
      props.setName(name);
      props.setPhone(phone);
      props.setSurname(surname);
      props.setCity(city);
      setValue(true);
    } else {
      Alert.alert(validationMsg.valueOf());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Unesite svoje ime:</Text>
        <TextInput
          clearTextOnFocus
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Unesite prezime:</Text>
        <TextInput
          clearTextOnFocus
          value={surname}
          onChangeText={(text) => setSurname(text)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Izaberite grad:</Text>
        <Picker
          selectedValue={city}
          style={{
            height: 50,
            width: 250,
            borderBottomWidth: 2,
            borderColor: '#8D89CA',
          }}
          // style={styles.inputText}
          onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
        >
          <Picker.Item label="Beograd" value="beograd" />
          <Picker.Item label="Nis" value="nis" />
        </Picker>
      </View>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Unesite broj telefona:</Text>
        <TextInput
          clearTextOnFocus
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={styles.inputText}
        />
      </View>
      <Button title="proveri podatke" onPress={() => checkData()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    height: 400,
    marginTop: '15%',
    paddingTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#8D89CA',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  inputText: {
    borderBottomWidth: 2,
    borderColor: '#8D89CA',
    height: 30,
  },
  groupedElements: {
    height: 70,
    width: 250,
  },
});
export default SignUpPersonal;
