// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import { SWAGGERFILE_SUCCESS, SWAGGERFILE_FAILURE} from '../constants';
const initialState = {
  swaggerdata: null
};

const handlers = {
  [SWAGGERFILE_SUCCESS]: (state, action) => ({swaggerdata: action.result}),
  [SWAGGERFILE_FAILURE]: (state, action) => ({swaggerdata: null, error: action.error})
};

export default function swagger (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
