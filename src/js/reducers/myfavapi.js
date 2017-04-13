import {MYBOOKMARKS_SUCCESS,ADDMYBOOKMARKS_SUCCESS,MYBOOKMARKS_FAILURE,DEFAULTRESULT, INIT, MYAPI_SUCCESS, MYAPI_FAILURE, MYFAV_SUCCESS, MYFAV_FAILURE} from '../constants';

var defaultPageSize = 30;

const initialState = {
  myapi: DEFAULTRESULT, 
  myfav: DEFAULTRESULT,
  myBookmarks: DEFAULTRESULT,
  optionalQuery: {
    limit: defaultPageSize,
    offset: 0,
    sortField: "update_ts",
    sortOrder: -1
  }
};

const handlers = {
  [INIT]: (_, action) => action,
  [MYAPI_SUCCESS]: (state, action) => {
    debugger;
    return { myapi: action.result, error: undefined }
  },
  [MYAPI_FAILURE]: (state, action) => ({ myapi: DEFAULTRESULT, error: action.error}),
  [MYFAV_SUCCESS]: (state, action) => ({ myfav: action.result, error: undefined }),
  [MYFAV_FAILURE]: (state, action) => ({ myfav: DEFAULTRESULT, error: action.error}),

  [MYBOOKMARKS_SUCCESS]: (state, action) => {
    debugger;
    var orignalResult = {results: action.result.results, totalhit: action.result.TotalHits, limit: action.result.LimitedHits};
    return { myBookmarks:orignalResult, error: undefined }
  },
  [MYBOOKMARKS_FAILURE]: (state, action) => ({ myBookmarks: DEFAULTRESULT, error: action.error})
};

export default function myfavapiReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
};


  //[ADDMYBOOKMARKS_SUCCESS]:(state,action) => {debugger; return {myBookmarks:action.result}}
