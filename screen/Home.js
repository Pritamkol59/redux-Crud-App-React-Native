import { View, Text, FlatList, Image,TouchableOpacity,Alert,BackHandler} from 'react-native'

import { useSelector, useDispatch } from 'react-redux';

import firebase from '@react-native-firebase/app';

import React, { useEffect, useState } from 'react';
import { deleteProduct } from '../Redux/actions/productActions';
import FullScreenChz from 'react-native-fullscreen-chz';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Nav from './Nav';
import { useNavigation } from '@react-navigation/native';





const Home = () => {

  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  
  const dispatch = useDispatch();
  


  useEffect(() => {
    FullScreenChz.enable();

    
    /*const unsubscribe = firebase
      .firestore()
      .collection('products')
      .onSnapshot(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setProducts(data);
      });
    return () => unsubscribe();*/
      //console.log(tok);

      const fetchData = async () => {

        const tok = await AsyncStorage.getItem('email');

        const unsubscribe = firebase
          .firestore()
          .collection('products')
          .where("uid", "==", tok)
          .onSnapshot(querySnapshot => {
            let data = [];
            querySnapshot.forEach(doc => {
              data.push({ ...doc.data(), id: doc.id });
            });
            setProducts(data);
          });
        return unsubscribe;
      };
    
      fetchData();

    
  


  }, []);


  


  const hndelDeletItem=async(id)=>{

    console.log(id);
    const productId= id;

    dispatch(deleteProduct(productId));
    Alert.alert('Product Delete successfully');
    navigation.replace('Home');

  }


  return (

    <View style={{ flex: 1 }}>

      <View

        style={{

          width: '100%',
          height: 60,
          flexDirection: 'row',
          backgroundColor: '#fff',
          alignItems: 'center',
          paddingLeft: 20,
          elevation: 1,


        }}

      >
        <Text style={{ color: '#000', fontSize: 16, fontWeight: '700' }}>Redux Ecom</Text>

      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            
            <View style={{
              width: '94%',
              alignItems: 'center',
              height: 150,
              backgroundColor: '#fff',
              alignSelf: 'center',
              marginTop: 10,
              borderRadius: 10,
              elevation: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10
            }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />

     

              <View style={{ padding:10 }}>

            <TouchableOpacity
            
            style={{
              height:20,
              width:20,
              marginLeft:'76%',
              marginTop:4
              
            }}
            
            onPress={()=>hndelDeletItem(item.id)}>
              <Image
          source={require('../assets/del.png')}
          resizeMode="contain"
          style={{
            height:20,
            width:20,
            
            
          }}
        ></Image>

</TouchableOpacity>

              <Text style={{ fontSize: 16, color: '#000', fontWeight: 600 }}>{item.productName.substring(0, 20) + '...'}</Text>
              
              
              

              <Text style={{ fontSize: 16, color: 'red', fontWeight: 600,textDecorationLine: 'line-through' }} >{'₹'+item.productPrice}</Text>
              <Text style={{ fontSize: 16, color: 'green', fontWeight: 600 }}>{'₹'+item.productDiscountedPrice}/-</Text>

              <View
              
              style={{
               flexDirection: 'row',
                alignItems: 'center',
                marginTop:5
              }}
              
              >
              <TouchableOpacity
              
              style={{
               backgroundColor:'green',
               borderRadius:7,
               height:27,
               justifyContent:'center',
               alignItems:'center',
               paddingLeft:10,
               paddingRight:10,
               }}
               onPress={() =>navigation.push('Update',{paramKey: item,})}
              
              >


<Text style={{  color: '#fff', fontWeight: 600 }}>Edit Item</Text>
</TouchableOpacity>



                </View>

              </View>

              </View>

            
          );
        }}
      />

<View style={{
              width: '94%',
              alignItems: 'center',
              height: 60,
              
              alignSelf: 'center',
              marginTop: 10,
              
              
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10
            }}>

              </View>
      <Nav />

    </View>
  )
}


export default Home


