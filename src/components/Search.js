import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import * as constants from '../constants';

class Search extends Component {
  state = {
    searchTerm: ''
  }

  onChangeText = (text) => {
    this.setState({
      searchTerm: text
    });
  }

  render() {
    const { container, textInput, submitButton } = styles;

    return (
      <View
        style={container}
      >
        <TextInput
          style={textInput}
          placeholder="Enter a search term..."
          placeholderTextColor={constants.GRAY_COLOR}
          onChangeText={text => this.onChangeText(text)}
        />
        <TouchableOpacity
          onPress={() => {}}
        >
          <Text style={submitButton}>Search</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  textInput: {
    padding: 15,
    height: 50,
    backgroundColor: constants.WHITE_COLOR,
    fontSize: constants.BODY_FONT_SIZE,
    marginBottom: 10
  },
  submitButton: {
    backgroundColor: constants.BLUE_COLOR,
    color: constants.WHITE_COLOR,
    textAlign: 'center',
    padding: 15,
    fontSize: constants.BODY_FONT_SIZE
  }
});

export default Search;
