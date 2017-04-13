import {INIT} from '../constants';

const initialState = {
  title: undefined,
  license: "(C) 2016 Hewlett Packard Enterprise LP."
};

const handlers = {
  [INIT]: (_, action) => (action)
};

export default function indexReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
};
