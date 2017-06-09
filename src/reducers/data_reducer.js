import * as types from '../actions/types';

const INITIAL_STATE = {
  imageResultsLoading: false,
  imageResults: [],
  totalApiResults: 0
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
        imageResultsLoading: false,
        imageResults: [...state.imageResults, action.payload.imageResults],
        totalApiResults: action.payload.totalApiResults
      };
    case types.IMAGE_RESULTS_CLEARED:
      return {
        ...state,
        imageResults: [],
        totalApiResults: 0
      };
    default:
      return state;
  }
}
