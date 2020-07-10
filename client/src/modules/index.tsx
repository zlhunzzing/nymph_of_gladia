import { combineReducers } from 'redux';
import Battle from './Battle';
import HandleModal from './HandleModal';

const reducers = combineReducers({
  Battle,
  HandleModal,
});

export default reducers;
