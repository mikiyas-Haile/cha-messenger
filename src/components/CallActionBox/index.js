import React, {useState, useEffect} from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ActionBox = ({onHangupPress}) => {
  const nav = useNavigation();
  const [cameraState, setCameraState ] = useState(true)
  const [MicState, setMicState ] = useState(true)
  const ReverseCamera = () => {
    ToastAndroid.show("Camera Reversed", 20)
  }
  const ToggleCameraOff = () => {
    setCameraState(!cameraState)
    if (cameraState){
       ToastAndroid.show("You have turned camera off", 20)
    }else{
      ToastAndroid.show("You have turned camera on", 20)
    }
  }
  const ToggleMicOff = () => {
    setMicState(!MicState)
    if (MicState){
       ToastAndroid.show("You have turned Microphone off", 20)
    }else{
      ToastAndroid.show("You have turned Microphone on", 20)
    }
  }
  return (
    <View style={styles.bottonsContainer}>
    <TouchableOpacity onPress={ReverseCamera} style={styles.iconButton}>
        <IonIcons size={30} color="white" name="ios-camera-reverse" />
    </TouchableOpacity>
    <TouchableOpacity onPress={ToggleCameraOff} style={styles.iconButton}>
        <MaterialIcons size={30} color="white" name={ cameraState ? 'camera-off' : 'camera'} />
    </TouchableOpacity>
    <TouchableOpacity onPress={ToggleMicOff} style={styles.iconButton}>
        <MaterialIcons size={30} color="white" name={MicState ? "microphone-off" : 'microphone'} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onHangupPress} style={[styles.iconButton, {backgroundColor:"red"}]}>
        <MaterialIcons size={30} color="white" name="phone-hangup" />
    </TouchableOpacity>
</View>
  )
}

const styles = StyleSheet.create({
  bottonsContainer:{
    backgroundColor:"#333333",
    padding:20,
    paddingBottom:40,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    flexDirection:"row",
    justifyContent:'space-between'
  },
  iconButton:{
    backgroundColor:"#4a4a4a",
    padding:15, 
    borderRadius:50
  },
})
export default ActionBox;