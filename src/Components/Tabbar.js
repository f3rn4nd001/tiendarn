import React from 'react';
import { StyleSheet, TouchableOpacity ,SafeAreaView,Dimensions, FooterTab, Footer } from "react-native";
import { AppLoading, Svg } from 'expo';
import { Container, Content} from 'native-base';
import * as Font from 'expo-font';
import Contect from "../Dawer/Contect";
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as shape from "d3-shape";

const Path=Svg;
const tabs =[
  {name:"grid"},
  {name:"list"},
  {name:"refresh-cw"},
  {name:"box"},
  {name:"user"},
];

const {width} =Dimensions.get("window");
const tabwidth=width/tabs.length;
const height =64;


const left = shape.line()
.x(d=>d.x)
.y(d=>d.y)
([
    {x:0,y:0},
    {x:width,y:0},
]);
const tab =shape.line()
.x(d=>d.x)
.y(d=>d.y)
(
    [  
        {x:width,y:0},
        {x:width+5,y:0},
        {x:width+10,y:10},
        {x:width+15,y:height},
        {x:width+tabwidth-15,y:height},
        {x:width+tabwidth-10,y:10},
        {x:width+tabwidth-5,y:0},
    ]
);
const right=shape.line()
.x(d=>d.x)
.y(d=>d.y)
([
    {x:width+tabwidth,y:0},
    {x:width*2,y:0},
    {x:width*2,y:height},
    {x:0,y:height},
    {x:0,y:0},
]);
const d =`${left} ${tab} ${right}`;
export default class Tabbar extends React.Component {
  
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
 
  render() {
  
    return (
        <Container >
            <Content padder contentContainerStyle={styles.content}>
         
            </Content>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
            </FooterTab>

            </Footer>
        
      </Container>
    );
  }
}

const styles=StyleSheet.create({
   
    content:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#D0D0D0',        
    },
    safearea:{
      backgroundColor:"white"
    },

})