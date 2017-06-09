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
import * as helpers from '../helpers';

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

  onImagePressed = (imageObject) => {
    this.props.selectCurrentImage(imageObject);
    this.props.navigation.navigate('detail');
  }

  getMoreImageResults = () => {
    const currentImages = this.props.imageResults.length;

    if (currentImages > 0) {
      const resultsPage = Math.round(currentImages / constants.RESULTS_PER_PAGE) + 1;
      this.props.getImageResults(this.props.currentSearchTerm, resultsPage);
    }
  }

  setDeviceDimensions = () => {
    this.props.setDeviceDimensions();
  }

  renderRow(rowData) {
    const aspectRatio = rowData.imageWidth / rowData.imageHeight;
    const width = this.props.contentWidth;
    const height = width / aspectRatio;

    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => this.onImagePressed(rowData)}
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

  renderListViewHeader = () => {
    return (
      <View>
        <Search />
      </View>
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
    const { screenWidth, contentWidth, imageResults } = this.props;

    return (
      <View
        style={styles.container}
        onLayout={this.setDeviceDimensions}
      >
        <ListView
          contentContainerStyle={[
            styles.listView, helpers.centerContent(screenWidth, contentWidth)
          ]}
          dataSource={this.ds.cloneWithRows(imageResults)}
          renderHeader={this.renderListViewHeader}
          renderRow={rowData => this.renderRow(rowData)}
          renderFooter={this.renderListViewFooter}
          initialListSize={20}
          onEndReached={this.getMoreImageResults}
          onEndReachedThreshold={50}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  listView: {
    paddingBottom: 50
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
    contentWidth: device.contentWidth,
    currentSearchTerm: data.currentSearchTerm,
    imageResults: data.imageResults,
    imageResultsLoading: data.imageResultsLoading,
    totalApiResults: data.totalApiResults,
    errorMessage: data.errorMessage
  };
}

export default connect(mapStateToProps, actions)(MainScreen);
