import { View, Text,Button,StyleSheet,TouchableOpacity,Image,Dimensions,TextInput,Alert, ScrollView} from 'react-native'
import React,{useEffect,useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { updateProduct } from '../Redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import Nav from './Nav';

const Update = ({route}) => {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();

  const item= route.params.paramKey ;

  console.log(item);

  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDiscountedPrice, setProductDiscountedPrice] = useState('');
  const [imageName, setImageName] = useState('');
  const [image, setImage] = useState('');
  const [imageNew, setimageNew] = useState(false);

  const [productUpdate, setProductUpdate] = useState(false);
  const [error, setError] = useState('');
  

  
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



useEffect(() => {
  setProductId(item.id);
  setProductName(item.productName);
  setProductPrice(item.productPrice);
  setProductDiscountedPrice(item.productDiscountedPrice);
  setImage(item.image);

}, []);


const handelOnImageDelet=()=>{

  setImage('');
  console.log("ok");

}

const handleChoosePhoto = async () => {
    
  const response = await launchImageLibrary();
 if(response){
  console.log(response.assets[0].uri);
  setImage(response.assets[0].uri);
  setImageName(response.assets[0].fileName);
  setimageNew(true);
  
  
 }
}


const handleSubmit = async () => {


  if(productName!='' && productPrice!='' && productDiscountedPrice!='' && image!=''){

    if(productDiscountedPrice>productPrice){

      Alert.alert('Sorry Product Discounted Price Should not grater');

    }

    else{

      if(imageNew==true){

        const product = {
          productName: productName,
          productPrice: productPrice,
          productDiscountedPrice:productDiscountedPrice,
          imageName:imageName,
      
          image: image,
        };
    
        dispatch(updateProduct(productId, product));
    
      }
    
      else{
    
        const product = {
          productName: productName,
          productPrice: productPrice,
          productDiscountedPrice:productDiscountedPrice,
          
        };
        dispatch(updateProduct(productId, product));
    
      }
      
      
      Alert.alert('Product updated successfully');
      navigation.replace('Home');

    }

  
  
}

else{

  Alert.alert('Please add all Fields and Upload Image');

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

>Update Product</Text>
</View>

<ScrollView>


{image!=''?<View style={{ width:'94%',alignItems:'center', height:(windowHeight/2)-50, width:windowWidth-25, backgroundColor:'#fff', alignSelf:'center',marginTop:10,borderRadius:10,elevation:1,flexDirection:'column'}}>
     
     <Image source={{ uri: image }}
                style={{ width: 250, height: 250, borderRadius: 10 ,marginTop:10}}
              />
<TouchableOpacity    

style={{
  
 
  
}}



onPress={handelOnImageDelet}>
              <Image
          source={require('../assets/del.png')}
          resizeMode="contain"
          style={{
            height:25,
            width:25,
            position: 'absolute',
bottom: 0,
left: '40%',
right: 0,
top:-250
            
          }}

        ></Image>
</TouchableOpacity> 
</View>
:
<View style={{ width:'94%',alignItems:'center', height:(windowHeight/2)-50, width:windowWidth-25, backgroundColor:'#fff', alignSelf:'center',marginTop:10,borderRadius:10,elevation:1,flexDirection:'column'}}>
     
     
<TouchableOpacity onPress={handleChoosePhoto}>
              <Image
          source={require('../assets/upload.jpg')}
          resizeMode="contain"
          style={{
            width: 250, height: 100, borderRadius: 10 ,marginTop:100
            
          }}

        ></Image>
</TouchableOpacity> 
</View>

}


<View style={{ width:'94%',alignItems:'center', height:(windowHeight/2)-20, width:windowWidth-25, backgroundColor:'#fff', alignSelf:'center',marginTop:5,borderRadius:10,elevation:1,flexDirection:'column'}}>

    <Text  style={{marginTop:5}}> </Text> 
<Text style={{marginTop:5}}>Product Name:</Text>
            <TextInput
              style={styles.formInput}
                value={productName}
                onChangeText={setProductName}
                
            />
            <Text style={{marginTop:5}}>Price:</Text>
            <TextInput
            style={styles.formInput}
                value={productPrice}
                onChangeText={setProductPrice}
                keyboardType="numeric"
            />
            <Text style={{marginTop:5}}>Discounted Price:</Text>
            <TextInput
            style={styles.formInput}
                value={productDiscountedPrice}
                onChangeText={setProductDiscountedPrice}
                keyboardType="numeric"
            />


<TouchableOpacity onPress={handleSubmit}>
              <Image
          source={require('../assets/submit.jpg')}
          resizeMode="contain"
          style={{
            width: 150, height:60, borderRadius: 10 
            
          }}

        ></Image>
</TouchableOpacity> 




</View>




<View style={{
              width: '94%',
              alignItems: 'center',
              height: 100,
              
              alignSelf: 'center',
              marginTop: 10,
              
              
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10
            }}>

              </View>

</ScrollView>

     
    <Nav/>




    </View>
  )
}

const styles = StyleSheet.create({
  formInput: {
    height: 40,
    width:"95%",
    borderColor: '#2B303F',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 15,
    marginTop:10,
    backgroundColor:'#F7F6FB'
  },

  
});

export default Update