import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, ToastAndroid} from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import bg from '../../../assets/images/A.jpg'
import {Voximplant} from 'react-native-voximplant'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'
export function IcomingCallScreen() {
  const [caller, setCaller] = useState(null);
  const route = useRoute();
  const nav = useNavigation();
  const {call} = route.params;
  const vox = Voximplant.getInstance();
  useEffect(() => {
    setCaller(call.getEndpoints()[0].displayName)
    call.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
      // setCallState("Call Ended.")
      nav.navigate("Contacts")
    })
    return () => {
      call.off(Voximplant.CallEvents.Disconnected);
    }
  },[])
  const onDecline = () => {
    ToastAndroid.show("You have declined call.", 20)
    call.decline();
  }
  const onAnswer = () => {
    nav.navigate("CallingScreen",{
      call:call,
      isIncomingCall:true,
      })
    ToastAndroid.show("You have answered phone.", 20)
  }
  return (
            <ImageBackground source={bg}  style={styles.bg}>

            <Text style={styles.name}>{caller}</Text>
            <Text style={styles.phoneNumber}>ringing +190 1249 1411</Text>

            <View style={[styles.row, {marginTop:'auto'}]}>

              <TouchableOpacity style={styles.iconsContainer}>
                <Text style={styles.iconText}>Remind Me</Text><IonIcons name="alarm" color="white" size={30} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconsContainer}>
                <Text style={styles.iconText}>Message</Text><Entypo name="message" color="white" size={30} />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>

              <TouchableOpacity onPress={onDecline} style={styles.iconsContainer}>
                <View style={styles.iconButtonContainer}>
                    <Feather name="x" color="white" size={40} />
                </View>
                <Text style={styles.iconText}>Decline</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onAnswer} style={styles.iconsContainer}>
                <View style={[styles.iconButtonContainer, {backgroundColor:'#2c3e50'}]}>
                   <Feather name="check" color="white" size={40} />
                </View>
                <Text style={styles.iconText}>Accept</Text>
              </TouchableOpacity>

            </View>
            </ImageBackground>
  )
}
const styles = StyleSheet.create({
  iconButtonContainer:{
    backgroundColor:'#fe2c55',
    padding:10,
    borderRadius:50,
    margin:10
  },
  row:{
    flexDirection:'row',
    justifyContent:"space-around",
    width:'100%',
  },
  iconsContainer:{
    alignItems:'center',
    marginVertical:20
  },
  iconText:{
    color:'white',
    marginTop:10
  },
  name:{
    fontSize:30,
    fontWeight:'bold',
    color:"white",
    marginTop:100,
    marginBottom:10,
  },
  phoneNumber:{
    marginTop:10,
    fontSize:20,
    color:"black"
  },
  root:{
    height:'100%',
    backgroundColor:'white',
  },
  bg:{
    width:"100%",
    height:'100%',
    backgroundColor:'white',
    alignItems:'center',
  },
})