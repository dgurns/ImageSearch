import { Dimensions } from 'react-native';
import { DEVICE_DIMENSIONS_SET } from './types';
import { MAX_WIDTH } from '../constants';

export const setDeviceDimensions = () => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  let contentWidth;
  if (screenWidth > 500) {
    contentWidth = MAX_WIDTH;
  } else {
    contentWidth = screenWidth - 20;
  }

  return {
    type: DEVICE_DIMENSIONS_SET,
    payload: { screenWidth, screenHeight, contentWidth }
  };
};
