import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import tw from 'twrnc';

function AddMonitoring({
  willAddedId,
  setWillAddedId,
  setWillAdd,
  inputErrorMsg,
  isDarkMode,
  addHandler,
  textColor,
  willAdd,
  isError,
}) {
  return (
    <View style={tw`w-full p-4`}>
      <View
        style={tw`w-full ${
          isDarkMode ? 'border-gray-100' : 'border-gray-800'
        } border-2 rounded-2xl p-4`}>
        <Text style={tw`text-lg ${textColor}`}>Add Monitoring</Text>
        <TextInput
          value={willAddedId}
          onChangeText={e => setWillAddedId(e)}
          style={tw`border-b-2 ${
            isDarkMode
              ? 'border-gray-100 text-gray-100'
              : 'border-gray-800 text-gray-800'
          }`}
          placeholder="Enter Apartment ID"
          placeholderTextColor={isDarkMode ? 'gray' : 'darkgray'}
        />
        {!isError ? null : (
          <Text style={tw`text-red-500 text-sm mt-2`}>{inputErrorMsg}</Text>
        )}
        <View style={tw`flex flex-row items-center justify-end mt-2`}>
          <TouchableOpacity
            style={tw`ml-4`}
            onPress={() => setWillAdd(!willAdd)}>
            <Text style={tw`font-bold text-lg text-red-700`}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`ml-4`} onPress={() => setWillAddedId('')}>
            <Text style={tw`font-bold text-lg text-blue-300`}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`ml-4`} onPress={addHandler}>
            <Text style={tw`font-bold text-lg text-blue-700`}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default AddMonitoring;
