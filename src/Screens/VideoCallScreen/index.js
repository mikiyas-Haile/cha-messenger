import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ActionBox from '../../components/CallActionBox/index'
import { useNavigation } from '@react-navigation/native'
import {Voximplant} from 'react-native-voximplant'
export function VideoCallScreen() {
  const nav = useNavigation();
  const goBack = () =>{
    nav.pop();
  }
  return (
    <View style={styles.page}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <IonIcons name="chevron-back" color={'white'} size={30}/>
      </TouchableOpacity>
        <View style={styles.cameraPreview}>
          <View style={styles.SecondPerson}>

          </View>
        </View>
        <ActionBox />
    </View>
  )
}
const styles = StyleSheet.create({
  backButton:{
    position:'absolute',
    left:10, 
    top:50,
  },
  SecondPerson:{
    position:'absolute',
    right:10,
    top:50,
    height:170, 
    width:130,
    backgroundColor:"#ffff6e",
    borderRadius:10
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