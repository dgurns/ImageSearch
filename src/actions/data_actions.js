import { Alert } from 'react-native';
import axios from 'axios';
import qs from 'qs';

import * as constants from '../constants';
import * as types from './types';
import { PIXABAY_API_KEY } from '../pixabay/pixabay_config';

export const clearImageResults = () => {
  return {
    type: types.IMAGE_RESULTS_CLEARED,
  };
};

export const getImageResults = (searchTerm, page) => async dispatch => {
  dispatch({
    type: types.IMAGE_RESULTS_REQUESTED
  });

  const queryParams = {
    page,
    per_page: constants.RESULTS_PER_PAGE,
    q: searchTerm,
    key: PIXABAY_API_KEY
  };
  const query = qs.stringify(queryParams);
  const queryUrl = `${constants.PIXABAY_API_ROOT}?${query}`;

  try {
    let resultsObject = await axios.get(queryUrl);

    const resultsData = resultsObject.data;
    const resultsArray = resultsData.hits;
    const totalApiResults = resultsData.totalHits;

    dispatch({
      type: types.IMAGE_RESULTS_SUCCESSFUL,
      payload: {
        imageResults: resultsArray,
        totalApiResults
      }
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: types.IMAGE_RESULTS_FAILED
    });

    Alert.alert(
      'Oops',
      'Could not fetch images. Please try another search.'
    );
  }
};
