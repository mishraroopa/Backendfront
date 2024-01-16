
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Login from '../screens/Login'
import Home from '../Home'
import Register from '../screens/Register';

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      

    </Stack.Navigator>
  );
}

export default StackNavigator;

const styles = StyleSheet.create({});
