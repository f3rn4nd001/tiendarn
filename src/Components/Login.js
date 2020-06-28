import React from 'react';
import { StyleSheet, TouchableOpacity, AsyncStorage} from "react-native";
import { AppLoading } from 'expo';
import { Container, Header, Content, Card, CardItem,Item,Input, Label,Icon, Text, Body,Button, TabHeading} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Registro from "./Registro";
import Contect from "../Dawer/Contect";
import  Tabbar  from "./Tabbar";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, Assets } from 'react-navigation-stack';
export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = { email:'', password:'',}
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
    this.props.navigation.navigate('Contect')
  }
}
  render() {
   
    return (
        <Container >
        <Content padder contentContainerStyle={styles.content}>
          <Card  style={styles.a}>
            <CardItem header bordered >
              <Text style={styles.centerheader}>Inicio de sesion</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                  
              <Item floatingLabel>
              <Icon  name='person'></Icon>
              <Label>Email</Label>
              <Input onChangeText={(email)=>this.setState({email})}
              />
            </Item>
            <Item floatingLabel last>
              <Label  >Password</Label>
              <Input onChangeText={(password)=>this.setState({password})}
             secureTextEntry={true} underlineColorAndroid='tranparent'/>
            </Item>
              </Body>
            </CardItem>
            <CardItem bordered style={{justifyContent:'center'}}>
            <TouchableOpacity style={styles.centerheaderba}>
            <Button rounded style={styles.centerheaderbb} onPress={this.loginA}>
            <Text style={styles.centerheader}>Entrar</Text>
            </Button> 
            </TouchableOpacity>
            <Text style={{width:10}}> </Text>
            <TouchableOpacity  style={styles.centerheaderba}>
            <Button rounded style={styles.centerheaderbb} onPress={() => this.props.navigation.navigate('Registro')} >
            <Text style={styles.centerheader}>Registrar</Text>
            </Button> 
          </TouchableOpacity >
            </CardItem>
         </Card>
         
            
         </Content>
      </Container>
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
      this.props.navigation.navigate('Contect');
    }
    else{
      alert(res.message);
    }
  })
  .done();
}
}


const styles=StyleSheet.create({
    centerheader:{
        width:'100%',
        textAlign:'center',
    }, 
    centerheaderba:{
        width:'50%',
        textAlign:'center',
    },
    centerheaderbb:{
        width:'100%',
        textAlign:'center',
    },
    a:{
       borderRadius:20,
       borderColor:'black',
       borderWidth:1,
    },
    content:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#D0D0D0',        
    },

})