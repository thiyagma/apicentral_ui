// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {
  SESSION_LOAD, SESSION_LOGIN, SESSION_LOGOUT
} from '../actions';
import { createReducer } from './utils';

const initialState = {};

const handlers = {};

export default createReducer(initialState, handlers);
