import {INIT, DEFAULTRESULT, CREATE_TYPE_SUCCESS, DETAILS_VIEW, DETAILS_EDIT, CREATE_UPLOAD, CREATE_EDIT , VALUECHAIN_SUCCESS, VALUECHAIN_FAILURE, 
  DATASUBJECT_SUCCESS, DATASUBJECT_FAILURE,CATEGORIES_SUCCESS,CATEGORIES_FAILURE,
  SAVESWAPI_SUCCESS, SAVESWAPI_FAILURE, UPLOAD_API_SUCCESS, UPLOAD_API_FAILURE, UPDATE_API_SUCCESS, UPDATE_API_FAILURE, CLIENT_APP_SUCESS
} from '../constants';

//LATEST_API_SUCCESS,
const initialState = {
  valuechain: DEFAULTRESULT,
  datasubject: DEFAULTRESULT,
  categories: DEFAULTRESULT,
  createType: CREATE_UPLOAD,
  UpdateApiStatus: false,
  apiDetail: {}
};

const handlers = {
  [INIT]: (_, action) => (action),
  [VALUECHAIN_SUCCESS]: (state, action) => ({ valuechain: action.result }),
  [DATASUBJECT_SUCCESS]: (state, action) => ({ datasubject: action.result }),
  [CATEGORIES_SUCCESS]: (state, action) => ({ categories: action.result }),
  [CREATE_TYPE_SUCCESS]: (state, action) => (
    { createType: action.results, UpdateApiStatus: (action.results == CREATE_EDIT || action.results == DETAILS_EDIT) ? state.UploadApiStatus : false }),
  [DETAILS_VIEW]: (state, action) => ({ apiDetail: action.result, UpdateApiStatus: false, UploadApiStatus: false }),
  [VALUECHAIN_FAILURE]: () => ({error: "something went wrong"}),
  [DATASUBJECT_FAILURE]: () => ({error: "something went wrong"}),
  [CATEGORIES_FAILURE]: () => ({error: "something went wrong"}),

  [SAVESWAPI_SUCCESS]: (state, action) => {
    const {apiDetail} = state;
    var obj = { api_id: apiDetail.api_id };
    if (action.apiDetail) {
      obj = (typeof action.apiDetail === 'string') ? JSON.parse(action.apiDetail) : action.apiDetail;
    }

    return { apiDetail: obj, createType: state.createType == DETAILS_EDIT ? DETAILS_VIEW : CREATE_UPLOAD, UpdateApiStatus: true, UploadApiStatus: false };
  },
  [SAVESWAPI_FAILURE]: (_, action) => ({ error: action.error, UpdateApiStatus: false }),

  [UPLOAD_API_SUCCESS]: (state, action) => {
    var data = action.result; // || mock;
    return { apiDetail: data.results[0], createType: CREATE_EDIT, UploadApiStatus: true };
  },
  [UPLOAD_API_FAILURE]: (_, action) => ({ error: action.error, createType: CREATE_UPLOAD, UploadApiStatus: false }),
  [UPDATE_API_SUCCESS]: (state, action) => {
    const {apiDetail} = state;
    var obj = { api_id: apiDetail.api_id };
    if (action.apiDetail) {
      obj = (typeof action.apiDetail === 'string') ? JSON.parse(action.apiDetail) : action.apiDetail;
    }

    return { apiDetail: obj, createType: state.createType == DETAILS_EDIT ? DETAILS_VIEW : CREATE_UPLOAD, UpdateApiStatus: true, UploadApiStatus: false };
  },
  [UPDATE_API_FAILURE]: (_, action) => ({ error: action.error, UpdateApiStatus: false })
};

export default function registerApiReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
