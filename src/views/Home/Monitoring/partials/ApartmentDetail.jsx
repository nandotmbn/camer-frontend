import React from 'react';
import tw from 'twrnc';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';

function ApartmentDetail({isDarkMode, apartment, navigation, params}) {
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
                navigation.navigate('History', {
                  id: params.id,
                })
              }>
              Table
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`mt-2`}>
        <Text
          style={tw`${
            isDarkMode ? 'text-blue-200' : 'text-orange-600'
          } text-sm`}>
          Last Update :
        </Text>
        <Text
          style={tw`${
            isDarkMode ? 'text-blue-200' : 'text-sky-600'
          } text-2xl font-bold`}>
          {moment(apartment.lastUpdate).format('LLLL')}
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
          {new Date().toDateString()}
        </Text>
      </View>
    </View>
  );
}

export default ApartmentDetail;
