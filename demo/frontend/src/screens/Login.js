import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';

const Login = () => {
  const [emailid, setemailid] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      emailid: emailid,
      password: password,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
     try {
      
       let response =  await fetch('http://192.168.1.105:2345/login', requestOptions);
        const res = await response.json();
        console.log(res, '---');
     } catch (error) {
      console.log("Catch error--",error)
     }
    // .then(response => console.log(response))
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error))
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="emailid"
        onChangeText={text => setemailid(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
