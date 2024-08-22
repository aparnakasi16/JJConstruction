import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground,Dimensions } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { signup } from '../../redux/modules/auth/authReducer';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast'

const window_height = Dimensions.get('screen').height;
const Signup = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [username, setUsername] = useState()
    const [email,setEmail] = useState();
    const [password,setPassword] = useState()
    const [phone,setPhone] = useState();
    const [address,setAddress] = useState();

    const moveToLogin=()=>{
      let payload ={
        name: username,
        phone: phone,
        email: email,
        password:  password,
        address: address
      }
      dispatch(signup(payload)).then((res)=>{
        console.log('response', res)
        if(res?.payload?.isAuthenticated){
          Toast.show('Signup Successful',Toast.LONG)
          navigation.navigate('Home')
        }
        else{
          Toast.show(res?.payload?.error,Toast.LONG)
        }
      })
    }
  return (
    <View style={styles.parentContainer}>
    <ImageBackground
      source={require('../../../assets/bgImage.png')} // Replace with your background image URL
      style={styles.background}>
        <Text style={styles.title}>JJ</Text>
        <Text style={styles.title}>CONSTRUCTIONS</Text>
        <Text style={styles.subtitle}>ONE STOP SOLUTION FOR ALL YOUR CONSTRUCTION NEEDS</Text>
        </ImageBackground>
      <View style={styles.container}>
      <Text style={[styles.title,{color:'#fff',fontSize:22}]}>Signup</Text>


        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="#000"
          onChangeText={text => setUsername(text)}
        />
         <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#000"
          onChangeText={text=> setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter PhoneNumber"
          placeholderTextColor="#000"
          keyboardType="phone-pad"
          onChangeText={text=> setPhone(text)}
        />
         <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry
          onChangeText={text=> setPassword(text)}
        />

      {/* May be dropdown of Areas */}
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#000"
          onChangeText={text => setAddress(text)}
        />


    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={()=>moveToLogin()}>
          <Text style={styles.loginButtonText}>SIGNUP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createAccountButton} onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.createAccountText}>LOGIN</Text>
        </TouchableOpacity>
        </View>
      </View>
   </View>
  );
};

const styles = StyleSheet.create({
    parentContainer:{
        flex:1,
        
    },
  background: {
    flex: 0.45,
    width: '100%',
    height: window_height/2.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    padding: 20,
    backgroundColor: '#005248',
    borderTopRightRadius: 20,
    borderTopLeftRadius:20,
    flex:1,
    paddingTop:30
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#005248',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#005248',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  verificationCodeButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  verificationCodeText: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    width:'100%'
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createAccountButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width:'100%'

  },
  createAccountText: {
    color: '#333',
    fontWeight: 'bold',
  },
  buttonContainer:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
    bottom:15,
    padding:10
  },
});

export default Signup;
