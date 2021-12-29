import React, { useEffect, useState, useRef } from 'react'
import {View, Text, StyleSheet,TouchableOpacity, PermissionsAndroid, ToastAndroid } from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ActionBox from '../../components/CallActionBox/index'
import { useNavigation, useRoute } from '@react-navigation/native'
import {Voximplant} from 'react-native-voximplant'

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA
]

export function CallingScreen() {
  const [localVidId, setLocalVidId] = useState('')
  const [RemoteVidId, setRemoteVidId] = useState('')
  const [permissionGranted, setPermissionGranted] = useState(false)
  const nav = useNavigation();
  const route = useRoute();
  const {user, call: incomingCall, isIncomingCall} = route?.params;
  const vox = Voximplant.getInstance();
  const goBack = () =>{
    nav.pop();
  }
  const [callState, setCallState] = useState("Calling..")
  const call = useRef(incomingCall)
  const endpoint = useRef(null)
  useEffect(() => {
    const getPermissions = async () => {
      console.log(call)
      setPermissionGranted(true)
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted = 
      granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      const cameraGranted = 
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
      if (!cameraGranted || !recordAudioGranted) {
        ToastAndroid.show("Permissions not granted", 20);
        setPermissionGranted(false)
      }else{
        setPermissionGranted(true)
      }
    }
    getPermissions()
    // if (permissionGranted){
      const callSettings = {
      video: {
        sendVideo: true,
        receiveVideo : true
      }
    }
    const makeCall = async () => {
      call.current = await vox.call(user.user_name,callSettings)
      subscribeToCallEvents();
    };
    const answerCall = async () => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvent();
      call.current.answer(callSettings);
    }
    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed, (callEvent) => {
        showError(callEvent.reason)
      })
      call.current.on(Voximplant.CallEvents.ProgressToneStart, (callEvent) => {
        setCallState("Ringing..")
      })
      call.current.on(Voximplant.CallEvents.Connected, (callEvent) => {
        setCallState("Connected..")
      })
      call.current.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
        setCallState("Call Ended.")
        nav.navigate("Contacts")
      })
      call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded, (callEvent) => {
        setLocalVidId(callEvent.videoStream.id)
      })
      call.current.on(Voximplant.CallEvents.EndpointAdded, (callEvent) => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvent();
      })
    }
    const subscribeToEndpointEvent = async () => {
      endpoint.current.on(Voximplant.EndpointEvents.RemoteVideoStreamAdded, (endpointEvent) => {
        console.log(endpointEvent)
        setRemoteVidId(endpointEvent.videoStream.id)
      })
    }
    const showError = (reason) => {
      ToastAndroid.show(`${reason}`, 30)
      nav.navigate("Contacts")
    }
    if (isIncomingCall){
      answerCall();
    }else{
    makeCall();
  }
    return () => {
      call.current.off(Voximplant.CallEvents.ProgressToneStart)
      call.current.off(Voximplant.CallEvents.Connected)
      call.current.off(Voximplant.CallEvents.Disconnected)
      call.current.off(Voximplant.CallEvents.Failed)
    }
  // }
  },[])
  const hangup = () => {
    call.current.hangup();
  }
  return (
    <View style={styles.page}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <IonIcons name="chevron-back" color={'white'} size={30}/>
      </TouchableOpacity>
      <Voximplant.VideoView
        videoStreamId={localVidId}
        style={styles.localVideoStyles}
      />
      <Voximplant.VideoView
        videoStreamId={RemoteVidId}
        style={styles.RemoteVidStyles}
      />
        <View style={styles.cameraPreview}>
          <Text style={styles.name}></Text>
          <Text style={styles.phoneNumber}> {callState} +190 1249 1411</Text>
        </View>
        <ActionBox onHangupPress={hangup}/>
    </View>
  )
}
const styles = StyleSheet.create({
  RemoteVidStyles:{
    position:'absolute',
    right:10,
    top:50,
    // height:300, 
    backgroundColor:"#ffff6e",
    borderRadius:10
  },
  localVideoStyles:{
    position:'absolute',
    left:10,
    top:50,
    height:170, 
    width:130,
    backgroundColor:"#ffff6e",
    borderRadius:10
  },
  backButton:{
    position:'absolute',
    left:10, 
    top:50,
  },
  page:{
    height:'100%',
    backgroundColor:'#7b4e80',
  },
  cameraPreview:{
    flex:1,
    alignItems:"center",
    paddingTop:10,
    paddingHorizontal:10,
  },
  name:{
    fontSize:30,
    fontWeight:'bold',
    color:"white",
    marginTop:50,
    marginBottom:10,
  },
  phoneNumber:{
    marginTop:10,
    fontSize:20,
  },
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