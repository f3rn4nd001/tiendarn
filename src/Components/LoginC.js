import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions,TouchableOpacity,AsyncStorage } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import  Registro from "./Registro";
import { Button } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State, TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
 
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}
export default class MusicApp extends Component {
  constructor() {
    super();
    this.state = { email:'', password:'',}
    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1,-1],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0,100],
      extrapolate: Extrapolate.CLAMP
    });
    this.textInputOpacity =interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1,0],
      extrapolate: Extrapolate.CLAMP
    });
    this.rotateCross =interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180,360],
      extrapolate: Extrapolate.CLAMP
    });
  }

  async componentDidMount() {
    this._loadInitialState().done();
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
_loadInitialState=async()=>{
  var value =await AsyncStorage.getItem('user');
  if (value!==null){
    this.props.navigation.navigate('Registro')
  }
}
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'flex-end'
        }}
      >
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }]
          }}
        >
          <Image
            source={require('../../assets/fonrn.jpg')}
            style={{ flex: 1, height: null, width: null }}
          />
        </Animated.View>
        <View style={{ height: height / 3, justifyContent: 'center' }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text style={{ fontSize: 21, fontWeight: 'bold' }}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: '#2E71DC',
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }]
            }}
          >
                 <TouchableOpacity  style={styles.button,{ width:'100%'}}>
            <Button rounded style={styles.button}   onPress={() => this.props.navigation.navigate('Registro')} >
            <Text style={styles.button,{fontSize:22, fontWeight: 'bold'}}>Regist</Text>
            </Button> 
          </TouchableOpacity >
          </Animated.View>
          <Animated.View style={{ zIndex: this.textInputZindex,opacity:this.textInputOpacity,transform:[{translateY:this.textInputY}], height:height/3, ...StyleSheet.absoluteFill, top:null, justifyContent:'center'}}>
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text style={{fontSize:15,transform:[{rotate: concat( this.rotateCross,'deb')}]}}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput onChangeText={(email)=>this.setState({email})} placeholder="Email" style={styles.textInput} placeholderTextColor="black"/>
            <TextInput  onChangeText={(password)=>this.setState({password})}
             secureTextEntry={true} underlineColorAndroid='tranparent' placeholder="Password" style={styles.textInput} placeholderTextColor="black"/>
            <Animated.View style={styles.button} > 
            <TouchableOpacity  style={styles.button,{width:'100%',}}>
              <Button rounded style={styles.button}  onPress={this.loginA} >
                <Text style={styles.button,{fontSize:20,fontWeight:'bold'}}>login</Text>
              </Button> 
            </TouchableOpacity >
              
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }

  loginA=()=>{
    
    fetch('http://192.168.1.74:3000/api/Usuarios/login',{
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json',
    },
    body: JSON.stringify({
      email:this.state.email,
      password:this.state.password,
    })
  })
    .then((response)=>response.json())
    .then((res)=>{
      alert(res.message);
    if(res.success===true){
      AsyncStorage.setItem('user',res.user);
      this.props.navigation.navigate('Registro');
    }
    else{
      alert(res.message);
    }
  })
  .done();
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset:{width:2,height:2},
    shadowColor:'black',
    shadowOpacity:0.2,
  },
  textInput:{
    height:50,
    borderRadius:25,
    borderWidth:0.5,
    marginHorizontal:20,
    paddingLeft:10,
    marginVertical:5,
    borderColor:'rgba(0,0,3,5)'
  },
  closeButton:{
    height:40,
    width:40,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:-20,
    left:width/2-20,
    shadowOffset:{width:2,height:2},
    shadowColor:'black',
    shadowOpacity:0.2,
    borderRadius: 35,
    
  },

});