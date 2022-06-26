import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../../../components/Home/Header';
import MonthPicker from 'react-native-month-year-picker';
import tw from 'twrnc';
import moment from 'moment';
import axios from 'axios';
import BillDetailBox from './partials/BillDetailBox';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('wss://api-camer.herokuapp.com');

function Bill({navigation, route}) {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const [currentData, setCurrentData] = useState({
    electric: 0,
    water: 0,
  });
  const {params} = route;
  const [deviceData, setDeviceData] = useState({name: '', id: ''});
  const [_date, _setDate] = useState(moment(new Date()).format('YYYY-MM'));

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [waterBill, setWaterBill] = useState(0);
  const [electricBill, setElectricBill] = useState(0);

  const showPicker = useCallback(value => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
      _setDate(moment(selectedDate).add(1, 'd').format('YYYY-MM'));
    },
    [date, showPicker],
  );

  const getData = async () => {
    try {
      const result = await axios.get(
        'https://api-camer.herokuapp.com/data/' + params.id,
      );
      setDeviceData({
        name: result.data.name,
        id: result.data._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getDataNow = async () => {
    try {
      const result = await axios.get(
        'https://api-camer.herokuapp.com/bill/' + params.id + '?date=' + _date,
      );
      setCurrentData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const ioClient = async () => {
    socket.on('bill' + _date + params.id, async data => {
      _setDate(date => {
        if (date != moment(new Date()).add(1, 'd').format('YYYY-MM')) {
          return date;
        }
        setCurrentData(data);
        return date;
      });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    ioClient();
    getDataNow();
  }, [_date]);

  return (
    <ScrollView
      style={{
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighten,
        flex: 1,
      }}>
      <Header mode={true} navigation={navigation} isDark={isDarkMode} />

      <BillDetailBox
        isDarkMode={isDarkMode}
        apartment={deviceData}
        navigation={navigation}
        params={params}
        date={_date}
      />

      <View style={tw`px-4 mt-2`}>
        <TouchableOpacity
          style={tw`px-4 py-2 rounded bg-red-500 w-4/12`}
          onPress={() => showPicker(true)}>
          <Text style={tw`text-white font-bold text-center`}>Choose Month</Text>
        </TouchableOpacity>
        {show && (
          <MonthPicker onChange={onValueChange} value={date} locale="en" />
        )}
      </View>

      <View style={tw`flex flex-row mt-8`}>
        <View style={tw`flex-1 px-4`}>
          <Text style={tw`text-center text-2xl font-bold text-yellow-600`}>
            Electric
          </Text>
          <Image
            style={tw`w-32 m-auto h-44 my-2`}
            source={require('../../../assets/IkonCamer1.png')}
          />
          <View style={tw`flex flex-row items-center justify-center`}>
            <Text style={tw`text-center mr-1 text-xl`}>Rp</Text>
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={text => setElectricBill(text)}
              style={tw`border-2 border-yellow-400 py-0 w-28`}
              placeholder="Ex: 10"
            />
            <Text style={tw`text-center ml-2 text-xl`}>/ kWh</Text>
          </View>
          <Text style={tw`text-center mt-4 text-2xl`}>
            Rp {currentData.electric * electricBill},-
          </Text>
        </View>
        <View style={tw`flex-1 px-4`}>
          <Text style={tw`text-center text-2xl font-bold text-blue-600`}>
            Water
          </Text>
          <Image
            style={tw`w-36 m-auto h-44 my-2`}
            source={require('../../../assets/IkonCamer2.png')}
          />
          <View style={tw`flex flex-row items-center justify-center`}>
            <Text style={tw`text-center mr-1 text-xl`}>Rp</Text>
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={text => setWaterBill(text)}
              style={tw`border-2 border-yellow-400 py-0 w-28`}
              placeholder="Ex: 10"
            />
            <Text style={tw`text-center ml-2 text-xl`}>/ m3</Text>
          </View>
          <Text style={tw`text-center mt-4 text-2xl`}>
            Rp {currentData.water * waterBill},-
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Bill;
