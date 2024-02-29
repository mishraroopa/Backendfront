import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';


const Login = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  // const navigation = useNavigation();

  const register = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      let response = await fetch('http://192.168.1.105:2345/login', requestOptions);
      const res = await response.json();
      console.log('rr', res);
      if (res.auth) {
        const receivedToken = res.auth;
        console.log('jiii', receivedToken);
        const generatedToken = res.auth; 
        console.log('hello', generatedToken);
        const decoded = jwtDecode(receivedToken)
        console.log('checking', decoded);

        if (decoded.userid === 1 && receivedToken === generatedToken) {
          navigation.navigate('Home',{
            id:decoded.userid
          });
        } else {
          Alert.alert('Login failed', 'Please check your credentials');
        }
      }
    } catch (error) {
      console.log('Catch error--', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  return (
    <View style={{ marginTop: '40%', flex: 0.5, borderWidth: 1 }}>
      <View>
        <View>
          <View style={{ backgroundColor: '#87CEEB', padding: 10 }}>
            <Text style={{ color: 'black', textAlign: 'center', fontSize: 20, fontWeight: '500' }}>Login</Text>
          </View>
          <TextInput style={{ color: 'black', marginTop: '10%', marginLeft: '5%' }}
            placeholder="Email"
            placeholderTextColor={'black'}
            onChangeText={(text) => setemail(text)}
          />
          <TextInput style={{ color: 'black', marginLeft: '5%' }}
            placeholder="Password"
            placeholderTextColor={'black'}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <View style={{ paddingHorizontal: 120, marginTop: '15%', flexDirection: 'row', gap: 50 }}>
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={register} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
