import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {withNavigation, NavigationEvents} from 'react-navigation';
import {Icon, Row, Left, Right} from 'native-base';
import api from '../../Services/api';
import LoadScreen from '../../Components/LoadScreen';

export default withNavigation(
  class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        contacts: [],
      };
    }
    loadData = async () => {
      this.setState({loading: true});
      await api
        .get('contacts')
        .then(async res => {
          await this.setState({contacts: res.data.contacts});
          console.log(res.data.contacts);
        })
        .catch(err => console.log(JSON.stringify(err.response.data)));
      this.setState({loading: false});
    };
    render() {
      return (
        <View>
          {this.state.loading && <LoadScreen />}
          <NavigationEvents
            onWillFocus={() => {
              this.loadData();
            }}
          />
          <View style={styles.header}>
            <Text style={styles.title}>Contact List</Text>
          </View>
          <View>
            <FlatList
              data={this.state.contacts}
              renderItem={({item}) => {
                console.log(item);
                return (
                  <TouchableOpacity>
                    <View
                      style={{
                        width: Dimensions.get('window').width * 0.97,
                        height: Dimensions.get('window').height * 0.1,
                        backgroundColor: '#95E0E8',
                        alignSelf: 'center',
                        marginTop: 2,
                      }}>
                      <View style={{marginTop: 10}}>
                        <Text
                          style={{marginLeft: 10, color: '#FFF', fontSize: 18}}>
                          {item.name}
                        </Text>
                        <Row style={{marginTop:5,width:"90%", alignSelf:"center"}}>
                          <Left>
                            <Text style={{color:"#FFF"}}>{item.email}</Text>
                          </Left>
                          <Right>
                            <Text style={{color:"#FFF"}} >
                              {item.phone}
                            </Text>
                          </Right>
                        </Row>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ContactAdd')}
            style={styles.addCotainer}>
            <Icon name="add-circle" style={styles.add} />
          </TouchableOpacity>
          <FlatList />
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
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addCotainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.9,
    left: Dimensions.get('window').width * 0.82,
  },
  add: {
    color: '#DDD',
    transform: [{scale: 3}],
  },
});
