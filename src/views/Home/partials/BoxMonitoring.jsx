import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, useColorScheme, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

function BoxMonitoring({id, navigation, removeHandler}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const result = await axios.get(
        'https://api-camer.herokuapp.com/data/' + id + '/last',
      );
      setData(result.data);
    } catch (error) {
      alert(error.response.data.messafe);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={tw`w-full px-4 py-1`}>
      <View
        style={tw`w-full flex flex-row bg-blue-800 ${
          isDarkMode ? 'border-blue-100' : 'border-blue-100'
        } border-2 rounded-2xl p-4`}>
        <View style={tw`flex flex-col flex-3`}>
          <View style={tw`mb-2`}>
            <Text
              style={tw`${
                isDarkMode ? 'text-blue-100' : 'text-blue-100'
              } text-sm`}>
              Apartment Name
            </Text>
            <Text
              style={tw`${
                isDarkMode ? 'text-blue-100' : 'text-blue-100'
              } text-base font-bold`}>
              {data.name}
            </Text>
          </View>
          <View style={tw`mb-2`}>
            <Text
              style={tw`${
                isDarkMode ? 'text-blue-100' : 'text-blue-100'
              } text-sm`}>
              Apartment ID
            </Text>
            <Text
              style={tw`${
                isDarkMode ? 'text-blue-100' : 'text-blue-100'
              } text-base font-bold`}>
              {id}
            </Text>
          </View>
        </View>
        <View style={tw`flex-1 flex justify-evenly`}>
          <TouchableOpacity
            style={tw`py-2 bg-blue-500 rounded-full`}
            onPress={() =>
              navigation.navigate('Monitor', {
                id,
              })
            }>
            <Text style={tw`text-white text-center font-bold text-xs`}>
              OPEN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeHandler(id)} style={tw`py-2 bg-red-500 rounded-full`}>
            <Text style={tw`text-white text-center font-bold text-xs`}>
              REMOVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default BoxMonitoring;
