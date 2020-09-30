import React from 'react';
import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import configureStore from './App/Redux/stores/configureStore';
import {Provider} from 'react-redux';

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);
YellowBox.ignoredYellowBox = ["Warning:"];
console.disableYellowBox = true;
const store = configureStore();
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
