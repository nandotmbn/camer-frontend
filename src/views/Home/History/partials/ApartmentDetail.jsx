import React from 'react';
import tw from 'twrnc';
import {View, Text, TouchableOpacity} from 'react-native';

function ApartmentDetail({isDarkMode, apartment, navigation, params, date}) {
  return (
    <View style={tw`px-4 mt-2`}>
      <View style={tw`flex flex-row justify-between`}>
        <View>
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
        <View>
          <TouchableOpacity
            style={tw`px-4 py-2 bg-green-600 rounded-xl my-auto`}>
            <Text
              style={tw`text-white`}
              onPress={() =>
                navigation.navigate('Monitor', {
                  id: params.id,
                })
              }>
              Graph
            </Text>
          </TouchableOpacity>
        </View>
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
          {date.toDateString()}
        </Text>
      </View>
    </View>
  );
}

export default ApartmentDetail;
