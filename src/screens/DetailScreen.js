import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import * as constants from '../constants';
import * as helpers from '../helpers';

class DetailScreen extends Component {
  render() {
    const { currentImage, screenWidth, contentWidth } = this.props;
    const aspectRatio = currentImage.imageWidth / currentImage.imageHeight;
    const width = this.props.contentWidth;
    const height = width / aspectRatio;

    const { container, contentContainer, image, text } = styles;

    return (
      <ScrollView contentContainerStyle={container}>
        <View
          style={[
            contentContainer, helpers.centerContent(screenWidth, contentWidth)
          ]}
        >
          <Image
            style={[image, { width, height }]}
            key={currentImage.id}
            source={{ uri: currentImage.webformatURL }}
            resizeMode="cover"
          />

          <Text style={text}>{currentImage.user}</Text>
          <Text style={text}>{currentImage.tags}</Text>
          <Text style={text}>
            {`${currentImage.webformatWidth} x ${currentImage.webformatHeight}`}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  contentContainer: {
    marginTop: 10,
    paddingBottom: 60
  },
  image: {
    backgroundColor: constants.GRAY_COLOR,
    marginBottom: 20
  },
  text: {
    color: constants.BLACK_COLOR,
    fontSize: constants.BODY_FONT_SIZE,
    marginBottom: 10
  }
});

function mapStateToProps({ device, data }) {
  return {
    screenWidth: device.screenWidth,
    contentWidth: device.contentWidth,
    currentImage: data.currentImage
  };
}

export default connect(mapStateToProps)(DetailScreen);
