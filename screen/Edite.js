import { View, Text ,Button,StyleSheet,TextInput,Alert, FlatList, TouchableOpacity,Image} from 'react-native'

import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../Redux/actions/productActions';

import React,{useEffect,useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import firebase from '@react-native-firebase/app';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import Nav from './Nav';
const Edite = () => {

  const navigation = useNavigation(); 

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDiscountedPrice, setProductDiscountedPrice] = useState('');
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [error, setError] = useState('');
  const [productAdded, setProductAdded] = useState(false);

  const dispatch = useDispatch();

    
  const handleChoosePhoto = async () => {
    
    const response = await launchImageLibrary();
   if(response){
    console.log(response.assets[0].uri);
    setImage(response.assets[0].uri);
    setImageName(response.assets[0].fileName);

    
    
   }
};


const handleSubmit = async () => {

  if(productName!='' && productPrice!='' && productDiscountedPrice!='' && image!=''){

    try {
      console.log(image);
       
        
        
        const imageRef = storage().ref("product_images/"+imageName)
        await imageRef.putFile(image, { contentType: 'image/jpg'}).catch((error) => { throw error })
        const url = await imageRef.getDownloadURL().catch((error) => { throw error });
  
   
  console.log(url);
  
        if(url){
  
          await dispatch(addProduct({
            productName,
            productPrice,
            productDiscountedPrice,
            image: url
        }))
        setProductAdded(true);
        setError('');
        Alert.alert('Product added successfully');

  
        }
  
       else{
  
        console.log("Error from");
       }
  
  
    } 
    
    catch (err) {
      console.log(err);
        setError(err.message);
        setProductAdded(false);
    }

  }

  else{

    Alert.alert('Please add all Fields and Upload Image');

  }
  
};



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
</View>

<View style={{marginTop:'50%', width:'94%',alignItems:'center', height:100, backgroundColor:'#fff', alignSelf:'center',marginTop:10,borderRadius:10,elevation:1,flexDirection:'column'}}>
     
<Text style={{ fontSize:30, fontWeight:'600',color:'#000',marginTop:25}}>Add Product</Text>


     </View>




<View style={{marginTop:'50%', width:'94%',alignItems:'center', height:350, backgroundColor:'#fff', alignSelf:'center',marginTop:10,borderRadius:10,elevation:1,flexDirection:'column'}}>
            <Text>Product Name:</Text>
            <TextInput
              style={styles.formInput}
                value={productName}
                onChangeText={setProductName}
            />
            <Text>Price:</Text>
            <TextInput
            style={styles.formInput}
                value={productPrice}
                onChangeText={setProductPrice}
                keyboardType="numeric"
            />
            <Text>Discounted Price:</Text>
            <TextInput
            style={styles.formInput}
                value={productDiscountedPrice}
                onChangeText={setProductDiscountedPrice}
                keyboardType="numeric"
            />

            <View style={{marginTop:10,flexDirection:'column',justifyContent:'space-between' }}>
            <Button title="Choose Photo"onPress={handleChoosePhoto} />
          
           </View>

      <View style={{marginTop:30,flexDirection:'column',justifyContent:'space-between' }}>

      <Button  title="Submit" onPress={handleSubmit} />
      </View>
           

            {error !== '' && <Text>{error}</Text>}
            {productAdded && <Text>You Can Now Add More Product</Text>}
        </View>



            <Nav/>

    </View>
  )
}

const styles = StyleSheet.create({
  formInput: {
    height: 40,
    width:"95%",
    borderColor: 'blue',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 15
  },

  butn:{

    marginTop:25,
    width:'50%'

  }
});

export default Edite