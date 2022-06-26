import React from 'react';
import tw from 'twrnc';
import {View, Text, TouchableOpacity} from 'react-native';

function BillDetailBox({isDarkMode, apartment, navigation, params, date}) {
  return (
    <View style={tw`px-4 mt-2`}>
      <View style={tw`flex flex-col justify-between`}>
        <Text
          style={tw`${
            isDarkMode ? 'text-blue-200' : 'text-orange-600'
          } text-sm`}>
          Apartment Name :
        </Text>
        <Text
          style={tw`${
            isDarkMode ? 'text-blue-200' : 'text-sky-600'
          } text-2xl font-bold`}>
          {apartment.name}
        </Text>
      </View>
      <View style={tw`mt-2`}>
        <Text
          style={tw`${
            isDarkMode ? 'text-blue-200' : 'text-orange-600'
          } text-sm`}>
          Monitoring On :
        </Text>
        <Text
          style={tw`${
            isDarkMode ? 'text-blue-200' : 'text-sky-600'
          } text-2xl font-bold`}>
          {date}
        </Text>
      </View>
    </View>
  );
}

export default BillDetailBox;
