import React from 'react';
import Screen from './Contect';


export const ProfileScreen=({navigation})=> <Screen navigation={navigation} name="Profile"/>
export const MessageScreen=({navigation})=><Screen navigation={navigation} name="Message"/>
export const ActivityScreen=({navigation})=><Screen navigation={navigation} name="Activity"/>
export const ListScreen=({navigation})=><Screen navigation={navigation} name="List"/>
export const ReportScreen=({navigation})=><Screen navigation={navigation} name="Report"/>