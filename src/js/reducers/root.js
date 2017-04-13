import { combineReducers } from 'redux';

import landingpage from './landingpage';
import nav from './nav';
import session from './session';

import index from './index';
import search from './search';
import myfavapi from './myfavapi';
import registerApi from './registerApi';
import swagger from './swagger';
import clientApp from './clientApp';
import teams from './teams';

export default combineReducers({
  landingpage,
  nav,
  index,
  search,
  myfavapi,
  registerApi,
  swagger,
  session,
  clientApp,
  teams
});
