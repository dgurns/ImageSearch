import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { connect } from 'react-redux';

import * as constants from '../constants';
import * as actions from '../actions';

class Search extends Component {
  state = {
    searchTerm: ''
  }

  onSubmit = () => {
    if (this.state.searchTerm === '') {
      Alert.alert(
        'Oops',
        'Please enter a search term'
      );
    }

    this.props.getImageResults(this.state.searchTerm, this.props.resultsPages + 1);
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
          onChangeText={(text) => this.setState({ searchTerm: text })}
        />
        <TouchableOpacity
          onPress={this.onSubmit}
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

function mapStateToProps({ data }) {
  return {
    resultsPages: data.resultsPages
  };
}

export default connect(mapStateToProps, actions)(Search);
