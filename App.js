import React from 'react';
import { View, Text,Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from "./src/Components/Login";
import Registro  from "./src/Components/Registro";
import Contect from "./src/Dawer/Dawer";
import Tabbar from "./src/Components/Tabbar"
const RootStack = createStackNavigator(
  {
    Login:{screen: Login, navigationOptions:{title:'Login'}},
    Contect:{screen: Contect, navigationOptions:{headerShown:false}},
    Tabbar: {screen:Tabbar,navigationOptions:{headerShown:false}},
    Registro:{screen: Registro},
  }
);
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}