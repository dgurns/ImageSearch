import * as types from '../actions/types';

const INITIAL_STATE = {
  currentSearchTerm: '',
  imageResultsLoading: false,
  imageResults: [],
  totalApiResults: 0,
  errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.IMAGE_RESULTS_REQUESTED:
      return {
        ...state,
        imageResultsLoading: true,
        currentSearchTerm: action.payload
      };
    case types.IMAGE_RESULTS_FAILED:
      return {
        ...state,
        imageResultsLoading: false,
        errorMessage: action.payload
      };
    case types.IMAGE_RESULTS_SUCCESSFUL:
      return {
        ...state,
        imageResultsLoading: false,
        imageResults: state.imageResults.concat(action.payload.imageResults),
        totalApiResults: action.payload.totalApiResults
      };
    case types.IMAGE_RESULTS_CLEARED:
      return {
        ...state,
        imageResults: [],
        totalApiResults: 0,
        errorMessage: ''
      };
    default:
      return state;
  }
}
