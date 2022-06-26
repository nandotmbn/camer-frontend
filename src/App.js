import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import NavigationWrapper from './routes/NavigationWrapper';
import {Provider as PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationWrapper />
      </PaperProvider>
    </Provider>
  );
};

export default App;
