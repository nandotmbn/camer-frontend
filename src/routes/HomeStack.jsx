import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import Monitoring from '../screens/Home/Monitoring';
import History from '../screens/Home/History';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animationEnabled: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Monitor" component={Monitoring} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
}
