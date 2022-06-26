import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../../../components/Home/Header';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import moment from 'moment';
import ApartmentDetail from './partials/ApartmentDetail';
import Graph from './partials/Graph';
import {useDispatch, useSelector} from 'react-redux';
import {changeApartmentComplete} from '../../../redux/slices/apartment';

function Monitoring({navigation, route}) {
  const apartment = useSelector(state => state.apartment);
  const dispatcher = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const [label, setLabel] = useState(['']);
  const [electricData, setElectricData] = useState([1]);
  const [waterData, setWaterData] = useState([1]);
  const {params} = route;

  const dataHandler = data => {
    dispatcher(
      changeApartmentComplete({
        name: data.name,
        lastUpdate: data.data[data.data.length - 1].lastUpdate,
      }),
    );

    const _label = data.data.map((el, i, arr) => {
      return '';
    });

    const _water = data.data.map((el, i, arr) => {
      return parseFloat(el.water);
    });

    const _electric = data.data.map((el, i, arr) => {
      return parseFloat(el.electric);
    });

    setLabel(_label);
    setWaterData(_water);
    setElectricData(_electric);
  };

  const getData = async () => {
    console.log(params.id);
    try {
      const result = await axios.get(
        'https://api-camer.herokuapp.com/data/' +
          params.id +
          '?date=' +
          moment(Date.now()).format('YYYY-MM-DD'),
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
      console.log(error);
    }
  };

  useEffect(() => {
    const socket = socketIOClient('wss://api-camer.herokuapp.com');
    socket.on(params.id, async data => {
      dataHandler(data);
    });
  }, []);

  useEffect(() => {
    if (!params.id) return;
    getData();
  }, [params]);

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
      />

      <Graph
        label={label}
        isDarkMode={isDarkMode}
        electricData={electricData}
        waterData={waterData}
      />
    </ScrollView>
  );
}

export default Monitoring;
