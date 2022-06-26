import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Dimensions, View} from 'react-native';
import tw from 'twrnc';

function Graph({label, electricData, waterData, isDarkMode}) {
  return (
    <View style={tw`mx-auto`}>
      <LineChart
        data={{
          labels: label,
          datasets: [
            {
              data: electricData,
              color: (opacity = 1) => `rgba(255,255,102, ${opacity})`,
            },
            {
              data: waterData,
              color: (opacity = 1) => `rgba(0,255,255, ${opacity})`,
            },
          ],
          legend: ['Electric (kWh)', 'Water (m3)'],
        }}
        width={Dimensions.get('window').width * 0.95} // from react-native
        height={360}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          backgroundColor: isDarkMode ? '#000000' : '#ffffff',
          backgroundGradientFrom: isDarkMode ? '#000000' : '#000077',
          backgroundGradientTo: isDarkMode ? '#000000' : '#000077',
          propsForDots: {
            r: '2',
            strokeWidth: '4',
            stroke: '#ffffff',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

export default Graph;
