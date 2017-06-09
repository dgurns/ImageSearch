import { Dimensions } from 'react-native';
import { DEVICE_DIMENSIONS_SET } from './types';
import { MEDIUM_WIDTH, LARGE_WIDTH } from '../constants';

export const setDeviceDimensions = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  let contentWidth;
  if (screenWidth > 700) {
    contentWidth = LARGE_WIDTH;
  } else if (screenWidth > 500) {
    contentWidth = MEDIUM_WIDTH;
  } else {
    contentWidth = screenWidth - 20;
  }

  return {
    type: DEVICE_DIMENSIONS_SET,
    payload: { screenWidth, screenHeight, contentWidth }
  };
};
