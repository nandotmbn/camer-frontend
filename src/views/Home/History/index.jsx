import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../../../components/Home/Header';
import tw from 'twrnc';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import ApartmentDetail from './partials/ApartmentDetail';
import {useDispatch, useSelector} from 'react-redux';
import {changeApartmentComplete} from '../../../redux/slices/apartment';

const dummy = [
  {
    time: '13.00',
    electric: 24,
    water: 30,
  },
  {
    time: '14.00',
    electric: 24,
    water: 30,
  },
  {
    time: '15.00',
    electric: 24,
    water: 30,
  },
];

function History({navigation, route}) {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const headerStyle = tw.style('font-semibold flex-1 text-center', textColor);
  const bodyStyle = tw.style('flex-1 text-center', textColor);
  const apartment = useSelector(state => state.apartment);
  const dispatcher = useDispatch();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {params} = route;
  const [data, setData] = useState([]);

  const dataHandler = data => {
    dispatcher(
      changeApartmentComplete({
        name: data.name,
        lastUpdate: data.data[data.data.length - 1].lastUpdate,
      }),
    );

    setData(
      data.data.map((e, i) => {
        return {
          time: `${i}:00 - ${i+1}:00`,
          electric: e?.electric,
          water: e?.water,
        };
      }),
    );
  };

  const getData = async () => {
    try {
      const result = await axios.get(
        'https://api-camer.herokuapp.com/data/' +
          params.id +
          '?date=' +
          moment(date).format('YYYY-MM-DD'),
      );
      if (!result.data.data.length) {
        return dataHandler({
          ...result.data,
          data: [
            {
              water: 0,
              electric: 0,
              lastUpdate: Date.now(),
            },
          ],
        });
      }
      dataHandler(result.data);
    } catch (error) {
      alert("NO DATA");
      setData([
        {
          time: `0:00 - 0:00`,
          electric: 0,
          water: 0,
        },
      ]);
    }
  };

  useEffect(() => {
    getData();
  }, [date]);

  return (
    <ScrollView
      style={{
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighten,
        flex: 1,
      }}>
      <Header
        mode="monitor"
        navigation={navigation}
        title="Water and Electrical Monitoring"
        isDark={isDarkMode}
        textColor={textColor}
      />

      <ApartmentDetail
        params={params}
        isDarkMode={isDarkMode}
        apartment={apartment}
        navigation={navigation}
        date={date}
      />

      <View style={tw`px-4 mt-2`}>
        <TouchableOpacity
          style={tw`px-4 py-2 rounded bg-red-500 w-4/12`}
          onPress={() => setOpen(true)}>
          <Text style={tw`text-white font-bold text-center`}>Choose Date</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          textColor={!isDarkMode ? '#000000' : '#FFFFFF'}
        />
      </View>
      <View style={tw`mt-2`}>
        <View style={tw.style('flex-row justify-evenly mb-4')}>
          <Text style={headerStyle}>No</Text>
          <Text style={headerStyle}>Time</Text>
          <Text style={headerStyle}>Electric (kWh)</Text>
          <Text style={headerStyle}>Water (m3)</Text>
        </View>
        {data.map((data, index) => {
          return (
            <View key={index} style={tw.style('flex-row justify-evenly mb-2')}>
              <Text style={bodyStyle}>{index + 1}</Text>
              <Text style={bodyStyle}>{data.time}</Text>
              <Text style={bodyStyle}>{data.electric}</Text>
              <Text style={bodyStyle}>{data.water}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default History;
