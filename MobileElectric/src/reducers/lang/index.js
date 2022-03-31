import * as Constants from '../../constant/lang';

const lang = {
  data: '',
};

const languageReducer = (state = lang, action) => {
  switch (action.type) {
    case Constants.EN:
      return {...state, data: action.data || ''};
    case Constants.VN:
      return {...state, data: action.data || ''};
    default:
      return state;
  }
};

export {languageReducer};
