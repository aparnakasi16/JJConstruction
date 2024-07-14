import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground,Dimensions } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const window_height = Dimensions.get('screen').height;
const LoginScreen = () => {
  const navigation=useNavigation()
  return (
    <View style={styles.parentContainer}>
    <ImageBackground
      source={require('../../../assets/bgImage.png')} // Replace with your background image URL
      style={styles.background}
    >
        <Text style={styles.title}>JJ</Text>
        <Text style={styles.title}>CONSTRUCTIONS</Text>

        <Text style={styles.subtitle}>ONE STOP SOLUTION FOR ALL YOUR CONSTRUCTION NEEDS</Text>
        </ImageBackground>
      <View style={styles.container}>
      <Text style={[styles.title,{color:'#fff',fontSize:22}]}>LOGIN</Text>


        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          placeholderTextColor="#000"
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#000"
          secureTextEntry
        />
        <Text style={[styles.subtitle,{color:'#fff'}]}>OR</Text>


        <TouchableOpacity style={styles.verificationCodeButton}>
          <Text style={styles.verificationCodeText}>GET VERIFICATION CODE</Text>
        </TouchableOpacity>

    <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={()=>navigation.navigate('Home')}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createAccountButton} onPress={()=>navigation.navigate('Signup')}>
          <Text style={styles.createAccountText}>CREATE NEW ACCOUNT</Text>
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
    flex: 0.6,
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
    paddingTop:80
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

export default LoginScreen;
