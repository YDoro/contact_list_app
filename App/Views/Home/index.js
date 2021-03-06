import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput
} from 'react-native';
import {withNavigation, NavigationEvents} from 'react-navigation';
import {Icon, Row, Left, Right,Item} from 'native-base';
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
    getData = async () => {
      this.setState({loading: true});
      await api
        .get('contacts')
        .then(async res => {
          await this.setState({contacts: res.data.contacts});
        })
        .catch(err => Alert.alert('error', JSON.stringify(err.response.data)));
        

      this.setState({loading: false});
    };
    confirmDelete = (id,name)=>{
      Alert.alert(
        'Warning',
        `Do you realy want to delete ${name}?`,
        [
                    {
            text: 'No',
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => this.deleteContact(id)},
        ],
        // {cancelable: false},
      );
      
    }
    deleteContact = async (id)=>{
      await api.delete(`contacts/${id}`).then((res)=>{
        Alert.alert("Success","contact successfully deleted!");
        this.getData();
      }).catch(err => Alert.alert("Error",JSON.stringify(err.response.data)));
    }
    searchContact = async (text)=>{
      await api.post('search',{
        query:text
      }).then((res)=>{
        this.setState({contacts:res.data.contacts})
      }).catch((err)=>console.log(err.response))
    }
    render() {
      return (
        <View>
          {this.state.loading && <LoadScreen />}
          <NavigationEvents
            onWillFocus={() => {
              this.getData();
            }}
          />
          <View style={styles.header}>
            <Text style={styles.title}>Contact List</Text>
          </View>
          <View>
          <Item rounded bordered style={styles.input}>
            <Icon active name="search" style={styles.input_icon}></Icon>
            <TextInput
              placeholder="Search"
              onChangeText={(text)=>this.searchContact(text)}

            />
          </Item>
            <FlatList
              data={this.state.contacts}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onLongPress={() => this.confirmDelete(item.id,item.name)}
                    onPress={() =>
                      this.props.navigation.navigate('ContactShow', {
                        id: item.id,
                      })
                    }>
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
                        <Row
                          style={{
                            marginTop: 15,
                            width: '90%',
                            alignSelf: 'center',
                          }}>
                          <Left>
                            <Text style={{color: '#FFF'}}>{item.email}</Text>
                          </Left>
                          <Right>
                            <Text style={{color: '#FFF'}}>{item.phone}</Text>
                          </Right>
                        </Row>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListFooterComponent={()=>(this.state.contacts.length>0&&
                <View style={{alignSelf:"center",alignItems:"center"}}><Text>Press and hold to delete</Text></View>
              )}
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
  input: {
    width:"90%",
    alignSelf:"center",
    height:45,
    marginTop:5
  },
  input_icon: {color: '#DDD', marginLeft: 5, bottom: '1%'},
  placeholder_adjusts: {

  },
});
