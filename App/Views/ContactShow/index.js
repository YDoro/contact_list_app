import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import api from '../../Services/api';
import LoadScreen from '../../Components/LoadScreen';
import {Item, Icon, Row} from 'native-base';

export default withNavigation(
  class ContactShow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: 0,
        name: null,
        address: null,
        email: null,
        cep: null,
        phone: null,
        loading: false,
        edit: false,
      };
    }
    componentDidMount() {
      this.getData();
    }
    getData = async () => {
      id = this.props.navigation.getParam('id', false);
      if (id) {
        this.setState({loading: true});
        await api
          .get(`contacts/${id}`)
          .then(async res => {
            await this.setState({
              id: res.data.id,
              name: res.data.name,
              address: res.data.address,
              email: res.data.email,
              cep: res.data.CEP,
              phone: res.data.phone,
            });
          })
          .catch(err => {
            Alert.alert('error', JSON.stringify(err.response.data));
          });
        this.setState({loading: false});
      }
    };
    sendData = async () => {
      this.setState({loading: true});
      await api
        .put(`contacts/${this.state.id}`, {
          name: this.state.name,
          address: this.state.address,
          CEP: this.state.cep,
          phone: this.state.phone,
          email: this.state.email,
        })
        .then(res => {
          Alert.alert('Success', 'Contact successfully updated');
          this.props.navigation.navigate('Home');
        })
        .catch(err => {
          Alert.alert('error', JSON.stringify(err.response.data));
        });
      this.setState({loading: false});
    };
    _maskCEP = text => {
      var formatted = text.replace(/(\d{1,5})?(\d{1,3})?/, (_, p1, p2) => {
        let output = '';
        if (p1) output = `${p1}-`;
        if (p2) output += `${p2}`;
        return output;
      });
      return formatted;
    };
    _maskTel = text => {
      if (text.length > 10) {
        var formatted = text.replace(
          /(\d{1})(\d{1})?(\d{1,5})?(\d{1,4})?/,
          (_, p1, p2, p3, p4) => {
            let output = '';
            if (p1) output = `(${p1}`;
            if (p2) output += `${p2})`;
            if (p3) output += ` ${p3}`;
            if (p4) output += `-${p4}`;
            return output;
          },
        );
        return formatted;
      } else {
        var formatted = text.replace(
          /(\d{1})(\d{1})?(\d{1,4})?(\d{1,4})?/,
          (_, p1, p2, p3, p4) => {
            let output = '';
            if (p1) output = `(${p1}`;
            if (p2) output += `${p2})`;
            if (p3) output += ` ${p3}`;
            if (p4) output += `-${p4}`;
            return output;
          },
        );
        return formatted;
      }
    };
    render() {
      return (
        <View>
          {this.state.loading && <LoadScreen />}
          <View style={styles.header}>
            <Row
              style={{
                justifyContent: 'space-between',
                width: Dimensions.get('window').width * 0.9,
              }}>
              <View>
                <Icon
                  name="arrow-back"
                  onPress={() => this.props.navigation.navigate('Home')}
                  style={{color: '#FFF', transform: [{scale: 1.3}]}}
                />
              </View>

              <Text style={styles.title}>
                {this.state.edit ? 'Edit Contact' : 'Contact'}
              </Text>
              <View>
                <Icon name="create" style={{color: '#FFF'}}  onPress={()=>this.setState({edit:!this.state.edit})}/>
              </View>
            </Row>
          </View>
          <View style={styles.form}>
            <Item rounded bordered style={styles.input}>
              <Icon active name="finger-print" style={styles.input_icon}></Icon>
              <TextInput
                ref={input => {
                  this.nameInput = input;
                }}
                placeholder="Name"
                style={styles.placeholder_adjusts}
                value={this.state.name}
                onChangeText={text => this.setState({name: text})}
                onFocus={() =>
                  this.state.edit
                    ? this.nameInput.focus()
                    : this.nameInput.blur()
                }
                onKeyPress={() => this.nameInput.blur()}
              />
            </Item>
            <Item rounded bordered style={styles.input}>
              <Icon active name="home" style={styles.input_icon}></Icon>
              <TextInput
                ref={input => {
                  this.addressInput = input;
                }}
                onFocus={() =>
                  this.state.edit
                    ? this.addressInput.focus()
                    : this.addressInput.blur()
                }
                placeholder="Address"
                style={styles.placeholder_adjusts}
                value={this.state.address}
                onChangeText={text => this.setState({address: text})}
              />
            </Item>
            <Item rounded bordered style={styles.input}>
              <Icon active name="globe" style={styles.input_icon}></Icon>
              <TextInput
                ref={input => {
                  this.cepInput = input;
                }}
                onFocus={() =>
                  this.state.edit ? this.cepInput.focus() : this.cepInput.blur()
                }
                placeholder="Postal code"
                style={styles.placeholder_adjusts}
                value={this.state.cep}
                onChangeText={async text => {
                  await this.setState({
                    cep: this._maskCEP(text.replace(/[^\d]+/g, '')),
                  });
                }}
                maxLength={9}
                keyboardType="numeric"
              />
            </Item>
            <Item rounded bordered style={styles.input}>
              <Icon active name="call" style={styles.input_icon}></Icon>
              <TextInput
                ref={input => {
                  this.phoneInput = input;
                }}
                onFocus={() =>
                  this.state.edit
                    ? this.phoneInput.focus()
                    : this.phoneInput.blur()
                }
                placeholder="Phone"
                style={styles.placeholder_adjusts}
                value={this.state.phone}
                maxLength={15}
                onChangeText={async text => {
                  await this.setState({
                    phone: this._maskTel(text.replace(/[^\d]+/g, '')),
                  });
                }}
                keyboardType="phone-pad"
              />
            </Item>
            <Item rounded bordered style={styles.input}>
              <Icon active name="mail" style={styles.input_icon}></Icon>
              <TextInput
                ref={input => {
                  this.emailInput = input;
                }}
                onFocus={() =>
                  this.state.edit
                    ? this.emailInput.focus()
                    : this.emailInput.blur()
                }
                placeholder="E-Mail"
                style={styles.placeholder_adjusts}
                value={this.state.email}
                onChangeText={text => this.setState({email: text})}
                keyboardType="email-address"
              />
            </Item>
            {this.state.edit && (
              <TouchableOpacity onPress={() => this.sendData()}>
                <View style={styles.btn_register}>
                  <Text style={styles.text_btn}>Register</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }
  },
);
const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: Dimensions.get('window').width,
    height: 40,
    backgroundColor: '#49989F',
  },
  form: {
    marginTop: Dimensions.get('window').height * 0.07,
    alignSelf: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#FFF',
    marginVertical: '5%',
  },
  input_icon: {color: '#DDD', marginLeft: 5, top: '2%'},
  placeholder_adjusts: {
    marginLeft: 10,
    top: '2%',
  },
  btn_register: {
    backgroundColor: '#A6F49A',
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
});
