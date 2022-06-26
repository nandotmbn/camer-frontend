import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import BillStack from './BillStack';
import HomeStack from './HomeStack';
import tailwind from 'twrnc';
const Tab = createMaterialBottomTabNavigator();
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useColorScheme} from 'react-native';

function NavigationWrapper() {
  const isDarkMode = useColorScheme() === 'dark';

  const barColor = isDarkMode
    ? tailwind`border-b-2 border-b-white`
    : tailwind`border-b-2 border-b-black`;
    
  return (
    <NavigationContainer>
    <Tab.Navigator shifting={true} barStyle={barColor}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#424242',
          tabBarIcon: () => <FontAwesome name="home" size={24} color="white" />,
        }}
      />
      <Tab.Screen
        name="BillTab"
        component={BillStack}
        options={{
          tabBarLabel: 'Bill',
          tabBarColor: '#383200',
          tabBarIcon: () => (
            <FontAwesome5 name="money-bill-alt" size={18} color="white" />
          ),
        }}
      />
    </Tab.Navigator>

    </NavigationContainer>
  );
}

export default NavigationWrapper;