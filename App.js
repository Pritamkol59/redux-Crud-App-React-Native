import { View, Text,StatusBar,StyleSheet, Dimensions, } from 'react-native'
import React,{useEffect,useState} from 'react'
//import firestore from '@react-native-firebase/firestore';


import FullScreenChz from 'react-native-fullscreen-chz';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './screen/Splash';
import Login from './screen/Login';
import Home from './screen/Home';


const Stack = createNativeStackNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { Provider } from 'react-redux';
import Store from './Redux/Store';
import Edite from './screen/Edite';
import Update from './screen/Update';
import Profile from './screen/Profile';
import productReducer from './Redux/Reducer/productReducer';


const App = () => {

  //const [Name, setName] = useState([]);

  

  useEffect(() => {
    FullScreenChz.enable();
    
   // fdata();

  }, [ ]);

 
  const Navigation =()=> {

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Splash'  >
          <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
          <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
          <Stack.Screen name="Edite" component={Edite} options={{headerShown:false}} />
          <Stack.Screen name="Update" component={Update} options={{headerShown:false}} />
          <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} />
         
         </Stack.Navigator>
      </NavigationContainer>
    );

  }

  /*const fdata=async()=>{

    
    //const user = await firestore().collection('user').doc('0i3EN37xOy7sV4kJC8Fy').get();

    //setName(user.data());
    //console.log(user);

  }*/

  return (
    <>
      <StatusBar hidden={true} />
      

      <View style={styles.container}>

      <Provider store={Store}>

        <Navigation/>

        </Provider>
        

      </View>


    </>
  )
}


const styles = StyleSheet.create({
  container:{
 
   flex:1,
   backgroundColor:"white",
   height:windowHeight,
   width:windowWidth,
   
   
  },

  
 });

export default App