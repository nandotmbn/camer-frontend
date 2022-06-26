import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import tw from 'twrnc';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = ({isDark, willAdd, setWillAdd, mode}) => {
  const bgColor = isDark ? 'bg-gray-800' : 'bg-sky-800';
  return (
    <View
      style={tw.style(
        `h-14 flex-row justify-between items-center px-4`,
        bgColor,
      )}>
      <Image style={tw`w-28 h-8`} source={require('../../assets/Camer2.png')} />
      {mode ? null : (
        <TouchableOpacity onPress={() => setWillAdd(!willAdd)}>
          <View style={tw`flex-row items-center`}>
            <AntDesign name="addfile" size={24} color={'lightblue'} />
            <Text style={tw.style(`ml-2 text-base`, 'text-blue-100')}>
              Add
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
