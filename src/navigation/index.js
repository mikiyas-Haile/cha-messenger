import React from 'react'
import ContactsScreen from '../Screens/contacts/index'
import {CallingScreen} from '../Screens/CallingScreen/index'
import {IcomingCallScreen} from '../Screens/IncomingCallScreen/index'
import {VideoCallScreen} from '../Screens/VideoCallScreen/index'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../LoginScreen/index'
const Stack = createStackNavigator();
export function Navigation (){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{headerShown:false}}>
            <Stack.Screen  name='Login' component={LoginScreen}/>
            <Stack.Screen  name='Contacts' component={ContactsScreen}/>
            <Stack.Screen  name='VideoCall' component={VideoCallScreen}/>
            <Stack.Screen  name='CallingScreen' component={CallingScreen}/>
            <Stack.Screen  name='InComingCall' component={IcomingCallScreen}/>
          </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// export default Navigation