import React, { Component } from 'react';
import {
  View,
  ListView,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';
import * as constants from '../constants';

import Search from '../components/Search';

class MainScreen extends Component {
  static navigationOptions = {
    title: 'Image Search'
  }

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }

  componentWillMount() {
    this.setDeviceDimensions();
  }

  setDeviceDimensions = () => {
    this.props.setDeviceDimensions();
  }

  specifyWidth = () => {
    if (this.props.screenWidth > 500) {
      return constants.MAX_WIDTH;
    }
    return this.props.screenWidth - 20;
  }

  renderRow(rowData) {
    const aspectRatio = rowData.imageWidth / rowData.imageHeight;
    const width = this.specifyWidth();
    const height = width / aspectRatio;

    return (
      <View style={styles.imageContainer}>
        <Image
          style={{ width, height }}
          key={rowData.id}
          source={{ uri: rowData.webformatURL }}
          resizeMode="cover"
        />
      </View>
    );
  }

  renderListView() {
    if (this.props.imageResultsLoading) {
      return (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 20 }}
        />
      );
    }

    return (
      <ListView
        dataSource={this.ds.cloneWithRows(this.props.imageResults)}
        renderRow={rowData => this.renderRow(rowData)}
      />
    );
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View
          style={{ width: this.specifyWidth() }}
          onLayout={this.setDeviceDimensions}
        >
          <Search />
          {this.renderListView(this.props.imageResultsLoading)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center'
  },
  imageContainer: {
    marginBottom: 10,
    backgroundColor: constants.GRAY_COLOR
  }
});

function mapStateToProps({ device, data }) {
  return {
    screenWidth: device.screenWidth,
    screenHeight: device.screenHeight,
    imageResults: data.imageResults,
    imageResultsLoading: data.imageResultsLoading
  };
}

export default connect(mapStateToProps, actions)(MainScreen);
