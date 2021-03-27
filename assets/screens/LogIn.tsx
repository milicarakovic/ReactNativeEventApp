import { Form, Input, Item } from 'native-base';
import React, { useContext, useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { LogInUser, TokenContext } from '../../service/api';

function LogIn({ navigation }) {
  const [email, setEmail] = useState<string>('milica@gmail.com');
  const [pass, setPass] = useState<string>('asdfghjkl');
  const { setToken } = useContext(TokenContext);

  const handleLogIn = async () => {
    const isOk: string = await LogInUser(email, pass);
    if (isOk !== '') {
      setToken(isOk);
      navigation.navigate('HomeScreen');
    } else
      Alert.alert('Neuspesna prijava', 'Proverite email adresu i lozinku.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Rezervisite karte za</Text>
      <Text style={styles.headline}>najbolje dogadjaje u gradu!</Text>
      <Form style={{ marginTop: '10%' }}>
        <Item>
          <Input
            placeholder="E-mail"
            onChangeText={(value) => setEmail(value)}
          />
        </Item>
        <Item>
          <Input
            placeholder="Password"
            onChangeText={(value) => setPass(value)}
            secureTextEntry={true}
          />
        </Item>
        <Button title="PRIJAVI SE" onPress={() => handleLogIn()} />
        <Text style={styles.helpText}>
          Nemate nalog?{' '}
          <Text
            style={styles.text}
            onPress={() => navigation.navigate('CreateAccount')}
          >
            Kreirajte novi
          </Text>
        </Text>
      </Form>
    </SafeAreaView>
  );
}

export default LogIn;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#004A7C',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#005691',
    marginTop: 10,
  },
  helpText: {
    marginTop: 20,
    fontSize: 16,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#004A7C',
    fontWeight: 'bold',
  },
});
