import { combineReducers } from 'redux';
import device from './device_reducer';
import data from './data_reducer';

export default combineReducers({
  device, data
});
