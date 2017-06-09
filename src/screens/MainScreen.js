import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';

class MainScreen extends Component {
  componentWillMount() {
    this.setDeviceDimensions();
  }

  setDeviceDimensions = () => {
    this.props.setDeviceDimensions();
  }

  render() {
    return (
      <View />
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
