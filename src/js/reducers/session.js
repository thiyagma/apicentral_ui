import {SESSION_INIT, USER_SUCCESS} from '../constants';

const initialState = {
  error: undefined,
  email: undefined,
  role: undefined,
  state: 'initial', // initial | changing | ready
  token: undefined,
  userName: undefined,
  favoriteapi: [],
  bookmarks: []
  
};

const handlers = {
  // [SESSION_INIT]: (_, action) => action,
  [SESSION_INIT]: (_, action) => ({userName: action.userName, token: action.token, email: action.email}),
  [USER_SUCCESS]: (_, action) => {
    let favoriteapi = action.result.results[0].favoriteapi;
    let bookmarks = action.result.results[0].bookmarks;
    return {favoriteapi: favoriteapi,bookmarks:bookmarks};
  }
};

export default function sessionReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
