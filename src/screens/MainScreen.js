import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Search from '../components/Search';

class MainScreen extends Component {
  static navigationOptions = {
    title: 'Image Search'
  }

  componentWillMount() {
    this.setDeviceDimensions();
  }

  setDeviceDimensions = () => {
    this.props.setDeviceDimensions();
  }

  render() {
    return (
      <ScrollView>
        <Search />
      </ScrollView>
    );
  }
}

function mapStateToProps({ device }) {
  return {
    screenWidth: device.screenWidth,
    screenHeight: device.screenHeight
  };
}

export default connect(mapStateToProps, actions)(MainScreen);
