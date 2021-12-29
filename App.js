import React, { useState, useEffect } from 'react';
import {
  ToastAndroid,
  StatusBar,
  StyleSheet,
  Text,
  PermissionsAndroid
} from 'react-native';
import ContactsScreen from './src/Screens/contacts/index'
import {Navigation}  from './src/navigation/index';
const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA
]
const App = () => {
  const [permissionAllowed, setPermissionGranted] = useState(false)
  useEffect(() => {
      const granted = PermissionsAndroid.requestMultiple(permissions);
      // const recordAudioGranted = 
      // granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      // const cameraGranted = 
      // granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
      granted.then(data =>{
        const cameraGranted = data[PermissionsAndroid.PERMISSIONS.CAMERA]=== 'granted';
        const recordAudioGranted = data[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO]=== 'granted';

        if (!cameraGranted || !recordAudioGranted) {
          ToastAndroid.show("Permissions not granted", 20);
          setPermissionGranted(false)
        }else{
            setPermissionGranted(true)
          }
        })
  },[permissionAllowed])
    if (permissionAllowed){
      return (
        <>
          <Navigation />
          </>);
    }else{
      return null
    }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
