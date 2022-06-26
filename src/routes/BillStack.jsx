import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Bill from '../screens/Bill';
import BillDetail from '../screens/Bill/Detail';

const Stack = createStackNavigator();

export default function BillStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animationEnabled: false}}>
      <Stack.Screen name="Bill" component={Bill} />
      <Stack.Screen name="BillDetail" component={BillDetail} />
    </Stack.Navigator>
  );
}
