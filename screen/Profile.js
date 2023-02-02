import { View, Text,Button,StyleSheet,TouchableOpacity,Image,Dimensions,TextInput,Alert,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Nav from './Nav';


const Profile = () => {
  const navigation = useNavigation(); 

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [userDerails, setProducts] = useState([]);


  useEffect(() => {
    findId();
    
   
  }, []);


  const findId=async()=>{
    try{

      const tok = await AsyncStorage.getItem('token');
      const userRef = firebase.firestore().collection('user').doc(tok);
      const user = await userRef.get();
   
      
      setProducts([user.data()]);

      console.log(user.data());
  
    }
    catch (error) {
      console.log(error);
      throw error;
    }
    
  }



  const onLogout =async()=>{


    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('email');
     console.log("Done");
     navigation.replace('Login');

  }
  catch(exception) {
    console.log(exception);
  }

  }

  return (
    
     <View style={{flex:1}}>

<View

style={{

  width:'100%',
  height:60,
  flexDirection:'row',
  backgroundColor:'#fff',
  alignItems:'center',
  paddingLeft:20,
  elevation:1,


}}

>

 
<TouchableOpacity onPress={() =>navigation.push('Home')}>


<Image
          source={require('../assets/back.png')}
          resizeMode="contain"
          style={{
            height:30,
            width:30,
            
           
            
          }}
        ></Image>



</TouchableOpacity>

<Text

style={{
  paddingLeft:20,
  fontSize:16,
  fontWeight:'600',
  color:'#000'
 
  
}}

>Profile</Text>
</View>



<FlatList
        data={userDerails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            
            
            <View style={{ width:'94%',alignItems:'center', height:(windowHeight/2)+50, width:windowWidth-25, backgroundColor:'#fff', alignSelf:'center',marginTop:120,borderRadius:10,elevation:1,flexDirection:'column'}}>
              
            <View style={{marginTop:50}}>
              <Image
                source={{ uri: item.photoURL }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />

              </View>

              <View style={{ padding:10,marginTop:50 }}>

           

              <Text style={{ fontSize: 16, color: '#000', fontWeight: 600,alignSelf:'center' }}>{'Name:- '+item.displayName}</Text>
              <Text style={{ fontSize: 16, color: '#000', fontWeight: 600 ,marginTop:35,alignSelf:'center'}}>{item.email}</Text>
              
              
              

              

              <View
              
              style={{
               flexDirection: 'row',
                alignItems: 'center',
                marginTop:20
              }}
              
              >
              <TouchableOpacity
              
              style={{
               backgroundColor:'black',
               borderRadius:7,
               height:50,
               justifyContent:'center',
               alignItems:'center',
               paddingLeft:10,
               paddingRight:10,
               marginTop:10,
               width:windowWidth-50
               }}
               onPress={onLogout}
              
              >


<Text style={{  color: '#fff', fontWeight: 600 ,fontSize:18}}>Signout</Text>
</TouchableOpacity>



                </View>

              </View>

              </View>

              

            
          );
        }}
      />











    
    <Nav/>






    </View>





  )
}
const styles = StyleSheet.create({
  

  butn:{

    marginTop:25,
    width:'50%'

  }
});

export default Profile