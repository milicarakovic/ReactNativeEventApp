import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from 'react-native';
import { useValidInformation } from '../../../../service/api';

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateAll(email: String, password: String, passwordAgain: String) {
  let errorMsg: String = '';

  if (!validateEmail) {
    errorMsg = errorMsg + ' Email andresa nije validna';
  }
  if (email.length < 6) {
    errorMsg =
      errorMsg + ' Email andresa nije validna. Mora imati vise od 6 karaktera.';
  }
  if (password !== passwordAgain) {
    errorMsg = errorMsg + ' Unete lozinke se ne pokalpaju.';
  }
  if (password.length < 6) {
    errorMsg = errorMsg + ' Lozinka mora imati vise od 6 karaktera.';
  }

  return errorMsg;
}

interface Props {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}

function SignUpAccount(props: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');

  const { setValue } = useValidInformation();
  // const { value, setValue } = useValidInformation();

  const handleValidation = () => {
    let validationMsg = validateAll(email, password, passwordAgain);
    if (validationMsg === '') {
      props.setEmail(email);
      props.setPassword(password);
      setValue(true);
    } else {
      Alert.alert(validationMsg.valueOf());
      setValue(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Zdravo :)</Text>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Unesite svoju email adresu:</Text>
        <TextInput
          clearTextOnFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Unesite lozinku:</Text>
        <TextInput
          clearTextOnFocus
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.inputText}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.groupedElements}>
        <Text style={styles.text}>Ponovite lozinku:</Text>
        <TextInput
          clearTextOnFocus
          value={passwordAgain}
          onChangeText={(text) => setPasswordAgain(text)}
          style={styles.inputText}
          secureTextEntry={true}
        />
      </View>
      <Button title="proveri podatke" onPress={() => handleValidation()} />
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
    marginTop: 20,
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#8D89CA',
    marginBottom: '10%',
    marginTop: '10%'
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
export default SignUpAccount;
