import { Text, View ,Image,StyleSheet, Dimensions} from 'react-native'
import React, { Component,useEffect } from 'react'
import Login from './Login';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const  Splash=({navigation})=> {

    

    useEffect(()=>{
        
       setTimeout(()=>{
        navigation.replace('Login');
       }, 5000)
      
        
        },[]);



    return(

        <View style={styles.container}>

<Image
     source={
      require('../assets/sp.jpg') 
     }
     resizeMode="cover"
      style={styles.imagecard}
    
  ></Image>

        </View>


     )
}
export default Splash;
const styles = StyleSheet.create({
    container:{
   
     flex:1,
     backgroundColor:"white",
     height:'100%',
     width:windowWidth,
     
     
    },

    imagecard:{

        height:'100%',
        width:windowWidth

    },
  
    
   });

