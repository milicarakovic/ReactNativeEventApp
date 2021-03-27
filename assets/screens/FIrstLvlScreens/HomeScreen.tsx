import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
interface Props {
  setToken: (value: string | null) => void;
}
function HomeScreen(props: Props) {
  const navigation = useNavigation();

  const handleLogOut = async () => {
    await AsyncStorage.removeItem('token');
    props.setToken('');
    navigation.navigate('LogIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => navigation.navigate('Profile')}
        large
        bordered
        rounded
        block
        style={styles.button}
        iconLeft
      >
        <Icon name="person" style={{ color: 'blue' }} />
        <Text style={{ color: 'blue' }}>Profil</Text>
      </Button>
      <Button
        onPress={() => navigation.navigate('Search')}
        large
        bordered
        rounded
        block
        warning
        style={styles.button}
        iconLeft
      >
        <Icon name="search" style={{ color: 'orange' }} />
        <Text style={{ color: 'orange' }}>Pretraga</Text>
      </Button>

      <Button
        onPress={() => navigation.navigate('Map')}
        large
        bordered
        rounded
        block
        success
        style={styles.button}
        iconLeft
      >
        <Icon name="map" style={{ color: 'green' }} />
        <Text style={{ color: 'green' }}>Otvori mapu</Text>
      </Button>

      <Button
        onPress={handleLogOut}
        large
        bordered
        rounded
        block
        danger
        style={styles.button}
      >
        <Icon name="close" style={{ color: 'red' }} />

        <Text style={{ color: 'red' }}>Odjava</Text>
      </Button>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 10,
  },
});
export default HomeScreen;
