import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, useColorScheme, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import moment from 'moment';
import socketIOClient from 'socket.io-client';

function BoxBilling({id, navigation, removeHandler}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState({});
  const [currentData, setCurrentData] = useState({
    electric: 0,
    water: 0,
  });
  const [currentMonth, setCurrentMonth] = useState(
    moment(Date.now()).format('YYYY-MM'),
  );

  const getData = async () => {
    try {
      const result = await axios.get(
        'https://api-camer.herokuapp.com/data/' + id + '/last',
      );
      setData(result.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const getDataNow = async () => {
    try {
      const result = await axios.get(
        'https://api-camer.herokuapp.com/bill/' + id + '?date=' + currentMonth,
      );
      setCurrentData(result.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const ioClient = async () => {
    const socket = socketIOClient('wss://api-camer.herokuapp.com');
    socket.on('bill' + currentMonth + id, async data => {
      setCurrentData(data);
    });
  };

  useEffect(() => {
    ioClient();
  }, []);

  useEffect(() => {
    getData();
    getDataNow();
  }, []);

  return (
    <View style={tw`w-full px-4 py-1`}>
      <View
        style={tw`w-full flex flex-row bg-blue-800 ${
          isDarkMode ? 'border-blue-100' : 'border-blue-100'
        } border-2 rounded-2xl p-4`}>
        <View style={tw`flex flex-col flex-2`}>
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
          <View>
            <View style={tw`flex flex-row`}>
              <Text
                style={tw`${
                  isDarkMode ? 'text-blue-100' : 'text-blue-100'
                } text-sm`}>
                Electric :{' '}
              </Text>
              <Text
                style={tw`${
                  isDarkMode ? 'text-blue-100' : 'text-blue-100'
                } text-sm`}>
                {currentData.electric} kWh
              </Text>
            </View>
            <View style={tw`flex flex-row`}>
              <Text
                style={tw`${
                  isDarkMode ? 'text-blue-100' : 'text-blue-100'
                } text-sm`}>
                Water :{' '}
              </Text>
              <Text
                style={tw`${
                  isDarkMode ? 'text-blue-100' : 'text-blue-100'
                } text-sm`}>
                {currentData.water} m3
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={tw`py-2 bg-blue-500 rounded-full`}
            onPress={() =>
              navigation.navigate('BillDetail', {
                id,
              })
            }>
            <Text style={tw`text-white text-center font-bold text-xs`}>
              DETAIL
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default BoxBilling;
