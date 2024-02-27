import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [username, setusername] = useState('');
  const [emailid, setemailid] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const navigation = useNavigation();

  const log = () => {
    navigation.navigate('Login');
  };

  const handleRegister = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
  
    if (password !== repeatPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match. Please re-enter.');
      return;
    }
  
    var raw = JSON.stringify({
      username: username,
      emailid: emailid,
      password: password,
      repeatPassword:repeatPassword
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
  
    try {
      let response = await fetch('http://192.168.1.107:2345/register', requestOptions);
  
      if (response.ok) {
        let res = await response.json();
  
        if (res.success) {
          console.log('You are registered');
         
        } else {
          Alert.alert('Registration Failed', 'Please check your credentials');
        }
      } else {
        console.error('Server Error:', response.status);
        Alert.alert('Registration Failed', 'An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };
  

  return (
    <View style={{ flex: 0.8, borderWidth: 1, marginTop: '10%' }}>
      <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, borderWidth: 1, padding: 10, backgroundColor: '#87CEEB' }}>Register</Text>
      <TextInput
        style={{ color: 'black', marginTop: '10%', marginLeft: '5%' }}
        placeholder="Username"
        placeholderTextColor={'black'}
        onChangeText={(text) => setusername(text)}
      />
      <TextInput
        style={{ color: 'black', marginTop: '10%', marginLeft: '5%' }}
        placeholder="Emailid"
        placeholderTextColor={'black'}
        onChangeText={(text) => setemailid(text)}
      />
      <TextInput
        style={{ color: 'black', marginTop: '10%', marginLeft: '5%' }}
        placeholder="Password"
        placeholderTextColor={'black'}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={{ color: 'black', marginTop: '10%', marginLeft: '5%' }}
        placeholder="Repeat Password"
        placeholderTextColor={'black'}
        onChangeText={(text) => setRepeatPassword(text)}
      />
      <View style={{ paddingHorizontal: 120, marginTop: '15%' }}>
        <Button title="Register" onPress={handleRegister} />
        <View style={{ width: '170%', right: 30, marginTop: 10, flexDirection: 'row' }}>
          <Text style={{ color: 'green' }}>Already have an account?</Text>
          <TouchableOpacity onPress={log}>
            <Text style={{ color: 'green' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
