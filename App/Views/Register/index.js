import React, {Component} from 'react';

import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Item, Icon} from 'native-base';
import api from '../../Services/api';
import LoadScreen from '../../Components/LoadScreen';
import AsyncStorage from '@react-native-community/async-storage';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name:null,
      email: null,
      password: null,
      c_password:null,
      safe: true,
      safe2: true,

    };
  }
  sendData = async () => {
    this.setState({loading: true});
    await api
      .post('register', {
        name:this.state.name,
        email: this.state.email,
        password: this.state.password,
        c_password:this.state.c_password
      })
      .then(async res => {
        await AsyncStorage.setItem('@Contact:token',res.data.success.token);
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
          console.log(JSON.stringify(err.response.data))
        Alert.alert('error', JSON.stringify(err.response.data.error));
      });
    this.setState({loading: false});
  };
  render() {
    return (
      <View style={styles.body}>
        <StatusBar backgroundColor="#49989F" barStyle="light-content" />
        {this.state.loading && <LoadScreen />}
        <Text style={styles.title}>Register</Text>

        <View style={styles.form}>
        <Item rounded bordered style={styles.input}>
            <Icon active name="finger-print" style={styles.input_icon}></Icon>
            <TextInput
              placeholder="Name"
              style={styles.placeholder_adjusts}
              value={this.state.name}
              onChangeText={text => this.setState({name: text})}
            />
          </Item>
          <Item rounded bordered style={styles.input}>
            <Icon active name="mail" style={styles.input_icon}></Icon>
            <TextInput
              placeholder="Email"
              style={styles.placeholder_adjusts}
              value={this.state.email}
              onChangeText={text => this.setState({email: text})}
            />
          </Item>
          <Item rounded bordered style={styles.input}>
            <Icon active name="key" style={styles.input_icon}></Icon>
            <TextInput
              placeholder="Password"
              secureTextEntry={this.state.safe}
              style={styles.placeholder_adjusts}
              value={this.state.password}
              onChangeText={text => this.setState({password: text})}
            />
          </Item>
          <Item rounded bordered style={styles.input}>
            <Icon active name="key" style={styles.input_icon}></Icon>
            <TextInput
              placeholder="Retype Password"
              secureTextEntry={this.state.safe}
              style={styles.placeholder_adjusts}
              value={this.state.c_password}
              onChangeText={text => this.setState({c_password: text})}
            />
          </Item>
          <View>
            <TouchableOpacity onPress={()=>this.sendData()}>
              <View style={styles.btn_register}>
                <Text style={styles.text_btn}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const wwidith = Dimensions.get('window').width;
const wheight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  body: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: wwidith,
    height: wheight,
  },
  fakeLogo: {
    marginVertical: wheight * 0.15,
    transform: [{scale: 5}],
    color: '#49989F',
  },
  form: {
    marginTop: wheight * 0.07,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#49989F',
  },
  input: {
    width: wwidith * 0.8,
    backgroundColor: '#FFF',
    marginVertical: '5%',
  },
  input_icon: {color: '#DDD', marginLeft: 5, bottom: '1%'},
  placeholder_adjusts: {
    marginLeft: 10,
    bottom: '1%',
  },
  btn_login: {
    backgroundColor: '#54B4F2',
    alignItems: 'center',
    height: 50,
    elevation: 2,
    marginVertical: 15,
    justifyContent: 'center',
  },
  text_btn: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  btn_register: {
    backgroundColor: '#A6F49A',
    alignItems: 'center',
    height: 50,
    elevation: 2,
    marginVertical: 15,
    justifyContent: 'center',
  },
});
export default withNavigation(Register);
