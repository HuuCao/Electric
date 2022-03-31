import * as Constants from '../../constant/version';

const lang = {
  data: '',
};

const versionReducer = (state = lang, action) => {
  switch (action.type) {
    case Constants.PRO:
      return {...state, data: action.data || ''};
    case Constants.FREE:
      return {...state, data: action.data || ''};
    case Constants.NULL:
      return {...state, data: action.data || ''};
    default:
      return state;
  }
};
export {versionReducer};
