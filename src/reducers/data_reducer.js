import * as types from '../actions/types';

const INITIAL_STATE = {
  imageResultsLoading: false,
  imageResults: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.IMAGE_RESULTS_REQUESTED:
      return {
        ...state,
        imageResultsLoading: true
      };
    case types.IMAGE_RESULTS_FAILED:
      return {
        ...state,
        imageResultsLoading: false
      };
    case types.IMAGE_RESULTS_SUCCESSFUL:
      return {
        ...state,
        imageResultsLoading: false
      };
    case types.IMAGE_RESULTS_CLEARED:
      return {
        ...state,
        imageResults: []
      };
    default:
      return state;
  }
}
