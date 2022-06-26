import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../../components/Home/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import axios from 'axios';
import BoxMonitoring from './partials/BoxMonitoring';
import AddMonitoring from './partials/AddMonitoring';

function Home({navigation}) {
  const [willAddedId, setWillAddedId] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const [willAdd, setWillAdd] = useState(false);
  const [ids, setIds] = useState([]);
  const [inputErrorMsg, setInputErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const errorEmitter = text => {
    setInputErrorMsg(text);
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 2000);
  };

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

  const addHandler = async () => {
    if (!willAddedId) return errorEmitter('Apartment ID is required');
    try {
      const result = await axios.get(
        'https://api-camer.herokuapp.com/data/' + willAddedId,
      );
      const value = await AsyncStorage.getItem('_APARTMENTS_');
      if (value === null)
        return AsyncStorage.setItem(
          '_APARTMENTS_',
          JSON.stringify({
            data: [result.data._id],
          }),
        );

      const jsonValue = JSON.parse(value);

      if (jsonValue.data.includes(result.data._id))
        return errorEmitter('Apartment ID has been added');
      AsyncStorage.setItem(
        '_APARTMENTS_',
        JSON.stringify({
          data: [...jsonValue.data, result.data._id],
        }),
      );

      setIds([...ids, result.data._id]);
    } catch (error) {
      getData();
      errorEmitter(error.response.data.message);
    }
  };

  const removeHandler = async id => {
    const value = await AsyncStorage.getItem('_APARTMENTS_');
    const jsonValue = JSON.parse(value);
    let notRemoved = [];
    jsonValue.data.forEach((e, i) => {
      if (e == id) return;
      notRemoved.push(e);
    });

    AsyncStorage.setItem('_APARTMENTS_', JSON.stringify({data: notRemoved})).then(() => {
      getData();
    });
  };

  useEffect(() => {
    getData();
  }, [ids]);

  return (
    <ScrollView
      style={{
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighten,
        flex: 1,
      }}>
      <Header
        navigation={navigation}
        title="Water and Electrical Monitoring"
        isDark={isDarkMode}
        textColor={textColor}
        willAdd={willAdd}
        setWillAdd={setWillAdd}
      />

      {!willAdd ? null : (
        <AddMonitoring
          willAddedId={willAddedId}
          setWillAddedId={setWillAddedId}
          setWillAdd={setWillAdd}
          inputErrorMsg={inputErrorMsg}
          isDarkMode={isDarkMode}
          addHandler={addHandler}
          textColor={textColor}
          willAdd={willAdd}
          isError={isError}
        />
      )}

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
              Monitored Apartment List
            </Text>
            {ids.map((el, i) => {
              return (
                <BoxMonitoring
                  removeHandler={removeHandler}
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

export default Home;
