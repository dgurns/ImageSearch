import { combineReducers } from 'redux';
import images from './images_reducer';
import data from './data_reducer';

export default combineReducers({
  images, data
});
