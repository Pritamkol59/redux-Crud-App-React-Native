
import React ,{useEffect,useState} from 'react';
import { View, Text ,ActivityIndicator,Button,Image,StyleSheet,Dimensions,Alert,BackHandler} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

GoogleSignin.configure({
  webClientId: '543104985566-d38iv6u019k0c8gbndfaoiv14slm8rde.apps.googleusercontent.com',
});

const Login = () => {

  const [loading, setLoading] = useState(false);
  const [Token1, setToken] = useState(false);

  const navigation = useNavigation(); 
  useEffect(() => {
   
   // fdata();
   Store_Uid_As_Token();

   const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to Exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();

  }, [ ]);
 
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    const userInfo = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    
   
  
    // Sign-in the user with the credential
    //return auth().signInWithCredential(googleCredential);
    auth().signInWithCredential(googleCredential);

   auth().onAuthStateChanged(async (user) => {
    

    if (user) {
      // Get the user's information
      const { uid, displayName, email, photoURL } = user;

      //set AsyncStorage

      const items = [['token', uid],['email', email]];

        AsyncStorage.multiSet(items, () => {
           
        });

      console.log(user);
      // Create a user object
      const newUser = {
        uid,
        displayName,
        email,
        photoURL,
      };

      // Add the user to Firestore
      await firestore().collection('user').doc(uid).set(newUser);
      navigation.replace('Home');
}


});
}


const Store_Uid_As_Token=async()=>{

  setLoading(true)
  const Token = await AsyncStorage.getItem('token');

  if(Token){

    setToken(true);

    navigation.replace('Home');

  }

  else{
    setToken(true);
  }
  


  /*
  //post user id to fire base
  const userDoc = await firestore().collection('user').doc(Token).get();

  //get uid by firebase
  const firestoreUid = userDoc.data().uid;

  //match user id to fire vase 

  if(Token==firestoreUid){

    console.log("user Authenticate");
  }

  else{

    console.log("Not Authenticate");
  }


*/


}

  
   
  
  return (
    <View>
    {!Token1 ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (

      <View style={styles.body}>

      <View>

      <Text style={styles.txt}>WelCome Back</Text>

     
        </View>

   

      <View style={styles.btn}>


      <Button  title="Sign in with Google" onPress={onGoogleButtonPress} />

      </View>





      </View>

    )}
   
  </View>
)
}


const styles = StyleSheet.create({
  
  body:{

    //backgroundColor:"black",
    height:windowHeight,
    width:windowWidth
  },

  imageset:{

    


  },

  image:{

    marginTop:30,
    height:200,
    width:200
  },
  
  btn:{
 
  
    marginTop:windowHeight-100,
   
    width:windowWidth/2,
    marginLeft: windowWidth/4
   
  },

  txt:{
    fontSize:25,
    marginLeft: '28%',
    color:'black',
    marginTop:25,

  }

  
 });

export default Login