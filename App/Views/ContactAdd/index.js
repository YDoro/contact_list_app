import React, {Component} from 'react';

import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import {withNavigation} from 'react-navigation';
import api from '../../Services/api';
import LoadScreen from '../../Components/LoadScreen';

export default withNavigation(
  class ContactAdd extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        contacts: [],
      };
    }
    render() {
      return (
        <View>
          {this.state.loading && <LoadScreen />}
          <View style={styles.header}>
            <Text style={styles.title}>Create Contact</Text>
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
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
