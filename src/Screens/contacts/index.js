import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList,TextInput, TouchableOpacity, Modal } from 'react-native';
import dummyContacts from '../../../assets/data/contacts.json'
import { useNavigation } from '@react-navigation/native';
import {Voximplant} from 'react-native-voximplant'

const ContactsScreen = () => {
  const vox = Voximplant.getInstance();
  useEffect(() => {
    vox.on(Voximplant.ClientEvents.IncomingCall, (incomingCallEvent) => {
      nav.navigate(
        "InComingCall",
        {call:incomingCallEvent.call}
      )
    })
    return () => {
      vox.off(Voximplant.ClientEvents.IncomingCall);
    }
  },[])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredContacts, setFilteredContacts ] = useState(dummyContacts)
  useEffect(() =>{
    const newContacts = dummyContacts.filter(contact => contact.user_display_name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredContacts(newContacts)
  },[searchTerm])
  const callUser = (user) => {
    nav.navigate('CallingScreen', {user:user})
  }
  const nav = useNavigation();
  return (
    <>
    <View style={styles.page}>
      <TextInput value={searchTerm} onChangeText={(val) => (setSearchTerm(val))} style={styles.searchInput} placeholder='Search..'/>
      <FlatList
          // key={(k) => (k.toString())}
        data={filteredContacts}
        renderItem={ ({item}) => (
          <TouchableOpacity onPress={() => callUser(item)}>
              <Text style={styles.contactName}>{item.user_display_name}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
      />
    </View>
    </>
  )
}
  
  const styles = StyleSheet.create({
    searchInput:{
      backgroundColor:"#f0f0f0",
      padding:10,
      borderRadius:10,
    },
    page:{
      padding:15,
    },
    contactName:{
      fontSize:16, 
      marginVertical:10,
    },
    separator:{
      width:'100%',
      height:1,
      backgroundColor:"lightgray",
    },
  });

export default ContactsScreen;