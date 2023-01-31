import React, { useState, useEffect } from 'react';
import { ADD_PRODUCT, FETCH_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT } from './types';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
/*
export const addProduct = (product) => {
    return async (dispatch) => {
        try {
            const productRef = await firestore().collection('products').add(product);
            const productSnapshot = await productRef.get();
            const addedProduct = productSnapshot.data();
            dispatch({ type: ADD_PRODUCT, payload: addedProduct });
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const productsSnapshot = await firestore().collection('products').get();
            const products = [];
            productsSnapshot.forEach(product => {
                products.push(product.data());
            });
            dispatch({ type: FETCH_PRODUCTS, payload: products });
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateProduct = (product) => {
    return async (dispatch) => {
        try {
            const productRef = firestore().collection('products').doc(product.id);
            await productRef.update(product);
            const productSnapshot = await productRef.get();
            const updatedProduct = productSnapshot.data();
            dispatch({ type: UPDATE_PRODUCT, payload: updatedProduct });
        } catch (error) {
            console.log(error);
        }
    }
}

export const deleteProduct = (productId) => {
    return async (dispatch) => {
        try {
            await firestore().collection('products').doc(productId).delete();
            dispatch({ type: DELETE_PRODUCT, payload: productId });
        } catch (error) {
            console.log(error);
        }
    }
}

*/

export const addProduct = (product) => {
    return async (dispatch) => {
      try {
        const image = product.image;
       
        const url = image;
        
        const newProduct = await firebase
          .firestore()
          .collection("products")
          .add({ ...product, image: url });
          
        dispatch({
          type: ADD_PRODUCT,
          product: { id: newProduct.id, ...product },
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
  };
  
  export const updateProduct = (productId, product) => {
    return async (dispatch) => {
      try {
        const image = product.image;
        const imageName = product.imageName;
        if (product.image) {
          const imageRef = storage().ref("product_images/"+imageName)
      await imageRef.putFile(image, { contentType: 'image/jpg'}).catch((error) => { throw error })
      const url = await imageRef.getDownloadURL().catch((error) => { throw error });
      product.image = url;
        
        }
        await firebase
          .firestore()
          .collection("products")
          .doc(productId)
          .update(product);
          
        dispatch({
          type: UPDATE_PRODUCT,
          productId: productId,
          product: product,
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
  };
  
  export const deleteProduct = (productId) => {
    return async (dispatch) => {
      try {
        await firebase
          .firestore()
          .collection("products")
          .doc(productId)
          .delete();
          
        dispatch({
          type: DELETE_PRODUCT,
          productId: productId,
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
  };
  
  export const fetchProducts = () => {
    return async (dispatch) => {
      try {
        const querySnapshot = await firebase
          .firestore()
          .collection('products')
          .get();
        let products = [];
        querySnapshot.forEach(doc => {
          products.push({ ...doc.data(), id: doc.id });
        });
        dispatch({
          type: FETCH_PRODUCTS,
          products: products,
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
  };

/*export const fetchProducts = () => {
  return async (dispatch) => {
      try {
          const productsSnapshot = await firestore().collection('products').get();
          const products = [];
          productsSnapshot.forEach(product => {
              products.push(product.data());
          });
          dispatch({ type: FETCH_PRODUCTS, payload: products });
      } catch (error) {
          console.log(error);
      }
  }
}*/
