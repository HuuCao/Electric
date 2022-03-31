import {combineReducers} from 'redux';
import {versionReducer} from './version/index';
import {languageReducer} from './lang/index';

const rootReducer = combineReducers({
  versionReducer,
  languageReducer,
});

export default rootReducer;
