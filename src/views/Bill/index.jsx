import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../../components/Home/Header';
import tw from "twrnc"
import BoxBilling from './partials/BoxBilling';

function Bill({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const [ids, setIds] = useState([]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('_APARTMENTS_');
      if (value === null) return;
      if (JSON.parse(value).data == ids) return;

      setIds(JSON.parse(value).data);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getData();
  }, [setIds]);

  return (
    <ScrollView
      style={{
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighten,
        flex: 1,
      }}>
      <Header mode={true} navigation={navigation} isDark={isDarkMode} />

      <View style={tw`mt-4`}>
        {ids.length === 0 ? (
          <View style={tw`w-full items-center flex`}>
            <Text style={tw`text-2xl mt-8`}>
              You have not added any Apartment ID
            </Text>
          </View>
        ) : (
          <View>
            <Text
              style={tw`w-full px-6 py-2 text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-blue-600'
              }`}>
              Usage (Current Month)
            </Text>
            {ids.map((el, i) => {
              return (
                <BoxBilling
                  navigation={navigation}
                  key={i}
                  id={el}
                />
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default Bill;
