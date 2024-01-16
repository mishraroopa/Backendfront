// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from '../pages/StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
