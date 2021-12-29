import React, { useState, useEffect } from 'react'
import {StyleSheet,TextInput, Dimensions,Pressable,Text,View,Image, ToastAndroid, ActivityIndicator,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {Voximplant} from 'react-native-voximplant'
import {APP_NAME,ACC_NAME} from '../Constants'
const {width, height} = Dimensions.get("screen")

const LoginScreen = () => {
  const voximplant = Voximplant.getInstance()
  const nav = useNavigation();
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  useEffect(() => {
    const connect = async () => {
      const status = await voximplant.getClientState();
      if (status === Voximplant.ClientState.DISCONNECTED){
        await voximplant.connect();
      }else if (status === Voximplant.ClientState.LOGGED_IN) {
        redirectHome();
      }
      console.log(status)
    }
    connect()
  },[])
  const redirectHome = () => {
        nav.reset({index:0, routes: [{name:"Contacts"}]})
  }
  const Login = async () =>{
    try{
    const fuqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
    await voximplant.login(
      fuqUsername, password
    )
    redirectHome();
  }
    catch(e){
      console.log(e)
      ToastAndroid.show(`${e.name}\nstatus code: ${e.code}`, 40)
    }
  }
  return (
<>
      <View style={styles.container}>
        <Image style={{padding:20}} source={require( '../../assets/images/5.png')}/>
          <View>
            <TextInput 
              onChangeText={(val) => setusername(val)}
              maxLength={20}
              data-name='username' 
              placeholder='Username' 
              style={styles.input}
              value={username}
                />
          </View>
          <View>
            <TextInput
              secureTextEntry={true}
              onChangeText={(val) => setpassword(val)}
              maxLength={20} 
              data-name='password' 
              placeholder='Password' 
              style={styles.input} 
              password={password}
              />
          </View>
          <TouchableOpacity style={styles.LoginButton}   onPress={Login}>
            <Text style={styles.text}>Login</Text> 
         </TouchableOpacity>
          
          <Text style={{fontFamily: "Poppins-Light",fontSize:20}}>don't have an account?</Text>

          <TouchableOpacity style={styles.button} onPress={() => nav.navigate('register')}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
      </View>
      </>
  )
}
const styles = StyleSheet.create({
  OrangeWarning:{
    fontFamily: "Poppins-Light",
    backgroundColor:"orange", 
    height:50, 
    alignItems:'center', 
    justifyContent:'center', 
    margin:20, 
    borderRadius:20
  },
  viewOne:{
    fontFamily: "Poppins-Light",
    backgroundColor:"orange", 
    height:50,
    alignItems:'center',
    justifyContent:'center',
    margin:20,
    borderRadius:20
  },
  input:{
    borderRadius:10,
    borderBottomWidth:1,
    fontFamily: "Poppins-Light",
    width:width/1.3, 
    padding:10,
    margin:10
  },
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  LoginButton:{
    width:width/1.3,
    fontFamily: "Poppins-Light",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin:20,
    borderRadius: 40,
    backgroundColor: '#6087af',
  },
  button: {
    width:width/1.3,
    fontFamily: "Poppins-Light",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin:20,
    borderRadius: 40,
    backgroundColor: '#fe2c55',
  },
  text: {
    fontFamily: "Poppins-Light",
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
  });
export default LoginScreen;