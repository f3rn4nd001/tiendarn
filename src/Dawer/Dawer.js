import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Dimensions} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {Feather} from '@expo/vector-icons';
import {ProfileScreen,MessageScreen,ListScreen,ActivityScreen,ReportScreen} from './Index';
import SideB from './SideB';

const DrawerNavigator= createDrawerNavigator({ProfileScreen,MessageScreen,ListScreen,ActivityScreen,ReportScreen},{contentComponent:props=> <SideB {...props}></SideB>});

export default createAppContainer(DrawerNavigator);