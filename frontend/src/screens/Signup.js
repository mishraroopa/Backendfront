import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

const Signup = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const signup = async () => {
    try {
      // Place your signup logic here
      console.log('User successfully signed up!');
    } catch (err) {
      console.log('Error signing up: ', err);
    }
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ flex: 0.7, marginTop: '30%', borderRadius: 20 }}>
        <View style={{ flex: 0.1, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#2bc0b3' }}>
          <Text style={{ color: 'white', textAlign: 'center', paddingTop: 10, fontSize: 20, fontWeight: '600' }}>Signup Form</Text>
        </View>
        <View style={{ flex: 0.5, borderWidth: 1, top: 40, backgroundColor: '#005750' }}>
          <View style={{ flexDirection: 'row', paddingLeft: 20, top: 30 }}>
            <Text style={{ color: 'white' }}>Email Id</Text>
            <TextInput
              style={styles.input2}
              placeholder=""
              placeholderTextColor={'white'}
              keyboardType="email-address"
              onChangeText={(val) => setEmailId(val)}
            />
          </View>
          <View style={{ flexDirection: 'row', paddingLeft: 20, top: 60 }}>
            <Text style={{ color: 'white' }}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor={'white'}
              secureTextEntry={true}
              onChangeText={(val) => setPassword(val)}
            />
          </View>

          <View style={{ flexDirection: 'row', paddingLeft: 20, top: 90, gap: 0 }}>
            <Text style={{ color: 'white' }}>RepeatPassword</Text>
            <TextInput
              style={styles.input1}
              placeholder=""
              placeholderTextColor={'white'}
              secureTextEntry={true}
              onChangeText={(val) => setRepeatPassword(val)}
            />
          </View>
        </View>

        <View style={{ flex: 0.1, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#2bc0b3', top: 60 }}>
          <TouchableOpacity onPress={signup}>
            <Text style={{ color: 'white', textAlign: 'center', paddingTop: 10, fontSize: 20, fontWeight: '600' }}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  input: {
    bottom: 3,
    height: 35,
    width: 200,
    borderWidth: 1,
    marginLeft: 80,
    borderColor: 'grey',
  },
  input1: {
    bottom: 3,
    height: 35,
    width: 200,
    borderWidth: 1,
    marginLeft: 39,
    borderColor: 'grey',
  },
  input2: {
    bottom: 3,
    height: 35,
    width: 200,
    borderWidth: 1,
    marginLeft: 90,
    borderColor: 'grey',
  },
});












