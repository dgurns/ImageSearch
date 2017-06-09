import * as types from './types';

export const clearImageResults = () => {
  return {
    type: types.IMAGE_RESULTS_CLEARED,
  };
};
