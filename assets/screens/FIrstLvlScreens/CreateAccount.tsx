import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import Stepper from 'react-native-stepper-ui';
import { User } from '../../../models/User';
import { CreateUser, IsValidContext } from '../../../service/api';
import SignUpAccount from './signUpScreens/SignUpAccount';
import SignUpPersonal from './signUpScreens/SignUpPersonal';
import SignUpSubmit from './signUpScreens/SignUpSubmit';

function CreateAccount() {
  const navigation = useNavigation();

  let [step, setStep] = useState<number>(0);

  let [value, setValue] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [image, setImage] = useState<any>(null);

  let user: User;

  useEffect(() => {
    setValue(false);
    if (step === 2) setValue(true);
  }, [step]);

  const content = [
    <SignUpAccount
      setEmail={(text) => setEmail(text)}
      setPassword={(text) => setPassword(text)}
    />,
    <SignUpPersonal
      setName={(text) => setName(text)}
      setSurname={(text) => setSurname(text)}
      setPhone={(text) => setPhone(text)}
    />,
    <SignUpSubmit setImage={(image) => setImage(image)} />,
  ];
  const handleFinish = async () => {
    user = new User(
      name,
      surname,
      name + surname,
      email,
      phone,
      password,
      image
    );
    const res = await CreateUser(user);
    if (res.includes('user')) {
      Alert.alert(`Uspesno kreiran korisnik ${name} ${surname}`);
      navigation.navigate('LogIn');
    } else {
      Alert.alert('Error', res);
    }
  };

  return (
    <IsValidContext.Provider value={{ value, setValue }}>
      <SafeAreaView>
        <Stepper
          active={step}
          content={content}
          onNext={() => setStep((p) => p + 1)}
          onBack={() => setStep((p) => p - 1)}
          onFinish={handleFinish}
          wrapperStyle={styles.wrappper}
          stepStyle={styles.stepStyle}
          showButton={value}
          buttonStyle={styles.button}
          buttonTextStyle={{ alignSelf: 'center' }}
        />
      </SafeAreaView>
    </IsValidContext.Provider>
  );
}
const styles = StyleSheet.create({
  wrappper: {
    color: '#38393E',
    margin: 5,
  },
  stepStyle: {
    backgroundColor: 'blue',
    margin: 5,
  },
  button: {
    borderRadius: 4,
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 80,
  },
});
export default CreateAccount;
