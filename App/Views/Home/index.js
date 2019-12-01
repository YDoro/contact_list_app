import React, {Component} from 'react';

import {View, Text, StyleSheet, Dimensions, TouchableOpacity,Alert} from 'react-native';
import {withNavigation, NavigationEvents} from 'react-navigation';
import { Icon } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import api from '../../Services/api';
import { thisExpression } from '@babel/types';
import LoadScreen from '../../Components/LoadScreen';

export default withNavigation(
  class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          contacts:[]
        };
      }
    loadData = async ()=>{
        Alert.alert("opa","opa");
        this.setState({loading:true});
        await api.get('contacts').then(async (res)=>{
            await this.setState({contacts: res.data.contacts});
            console.log(res.data.contacts);
        }).catch((err)=>console.log(JSON.stringify(err.response.data)))
        this.setState({loading:false});

    }
    render() {
      return (
          
        <View>
            {this.state.loading && <LoadScreen/>}
            <NavigationEvents onWillFocus={()=>{this.loadData()}}/>
          <View style={styles.header}>
            <Text style={styles.title}>Contact List</Text>
          </View>
          <TouchableOpacity style={styles.addCotainer}>
          <Icon name="add-circle" style={styles.add}/>
          </TouchableOpacity>
          <FlatList/>
         
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
  addCotainer:{
    position:"absolute",
    top:Dimensions.get("window").height*0.9,
    left:Dimensions.get("window").width*0.82
  },
  add:{
      color:"#DDD",
      transform:[{scale:3}],
    
  }
});
