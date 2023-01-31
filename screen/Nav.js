import { View, Text, TouchableOpacity,Dimensions,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





const Nav = () => {
  const navigation = useNavigation(); 
  return (
    <View style={{flex:1}}>

      <View
      
      style={{

        width:windowWidth,
        height:60,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:15,
        flexDirection:'row',
        backgroundColor:'#fff',
        elevation:1,
        justifyContent:'space-between',
        position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,


      }}
      
      >

<TouchableOpacity onPress={() =>navigation.replace('Home')} >


<Image
          source={require('../assets/home.png')}
          resizeMode="contain"
          style={{
            height:25,
            width:25,
           marginLeft:5
            
          }}
        ></Image>


</TouchableOpacity>

<TouchableOpacity onPress={() =>navigation.replace('Edite')}>





<Image
          source={require('../assets/plus.png')}
          resizeMode="contain"
          style={{
            height:30,
            width:30,
            marginTop:-3
           
            
          }}
        ></Image>



</TouchableOpacity>

<TouchableOpacity onPress={() =>navigation.replace('Profile')} >


<Image
          source={require('../assets/profile.png')}
          resizeMode="contain"
          style={{
            height:30,
            width:30,
            marginTop:-4
           
            
          }}
        ></Image>



</TouchableOpacity>
      </View>
      </View>
  )
}

export default Nav