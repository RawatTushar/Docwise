
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './views/login/Login';
import FacilityScreen from './views/FacilityScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Facility" component={FacilityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
