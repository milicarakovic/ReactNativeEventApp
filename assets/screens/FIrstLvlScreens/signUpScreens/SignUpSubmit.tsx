import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  Button,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useValidInformation } from '../../../../service/api';

interface Props {
  setImage: (value: any) => void;
}

function SignUpSubmit(props: Props) {
  const [image, setImage] = useState<any>(null);
  const { value, setValue } = useValidInformation();

  const handleChoosePhoto = async () => {
    let permisiion = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permisiion.granted == false) {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync();
    if (result.cancelled) {
      return;
    }

    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    setImage({ localUri: localUri });
    props.setImage({ localUri: localUri });
  };

  useEffect(() => {
    setValue(false);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headline}>Ostao je jos jedan korak...</Text>
      <View style={styles.profileImage}>
        {image !== null ? (
          <Image source={{ uri: image.localUri }} style={styles.image} />
        ) : (
          <Image source={require('./me.png')} style={styles.image} />
        )}
      </View>

      <Button
        //style={styles.buttonUpload}
        title="Upload"
        onPress={handleChoosePhoto}
      />
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
    paddingTop: 10,
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#8D89CA',
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
    backgroundColor: '#005691',
    height: '7%',
    width: 200,
    alignSelf: 'center',
    borderRadius: 20,
    flexDirection: 'column',
    marginBottom: '3%',
  },
});
export default SignUpSubmit;
