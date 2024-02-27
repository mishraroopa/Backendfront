// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '../pages/StackNavigator';
import atob from 'core-js-pure/stable/atob';
import btoa from 'core-js-pure/stable/btoa';

const App = () => {

  global.atob = atob;
  global.btoa= btoa;  
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
