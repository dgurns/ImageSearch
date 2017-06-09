import React, { Component } from 'react';
import {
  View,
  ListView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
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

  getMoreImageResults = () => {
    const currentImages = this.props.imageResults.length;
    console.log(currentImages);

    if (currentImages > 0) {
      const resultsPage = Math.round(currentImages / constants.RESULTS_PER_PAGE) + 1;
      this.props.getImageResults(this.props.currentSearchTerm, resultsPage);
    }
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
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => this.props.navigation.navigate('detail')}
        activeOpacity={0.9}
      >
        <Image
          style={{ width, height }}
          key={rowData.id}
          source={{ uri: rowData.webformatURL }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  }

  renderListViewFooter = () => {
    return (
      <View>
        <Text style={styles.errorMessage}>
          {this.props.errorMessage}
        </Text>

        <ActivityIndicator
          size="large"
          animating={this.props.imageResultsLoading}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ width: this.specifyWidth() }}
          onLayout={this.setDeviceDimensions}
        >
          <ListView
            contentContainerStyle={{ paddingBottom: 50 }}
            dataSource={this.ds.cloneWithRows(this.props.imageResults)}
            renderHeader={() => <Search />}
            renderRow={rowData => this.renderRow(rowData)}
            renderFooter={this.renderListViewFooter}
            initialListSize={20}
            onEndReached={this.getMoreImageResults}
            onEndReachedThreshold={50}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  imageContainer: {
    marginBottom: 10,
    backgroundColor: constants.GRAY_COLOR
  },
  errorMessage: {
    fontSize: constants.BODY_FONT_SIZE,
    textAlign: 'center',
    paddingTop: 20
  }
});

function mapStateToProps({ device, data }) {
  return {
    screenWidth: device.screenWidth,
    screenHeight: device.screenHeight,
    currentSearchTerm: data.currentSearchTerm,
    imageResults: data.imageResults,
    imageResultsLoading: data.imageResultsLoading,
    totalApiResults: data.totalApiResults,
    errorMessage: data.errorMessage
  };
}

export default connect(mapStateToProps, actions)(MainScreen);
