import {DETAILS_VIEW, LATEST_API_SUCCESS, VALUECHAIN_SUCCESS, VALUECHAIN_FAILURE, DATASUBJECT_SUCCESS, DATASUBJECT_FAILURE, CREATE_TYPE_SUCCESS, 
  UPLOAD_API_SUCCESS, UPLOAD_API_FAILURE, UPDATE_API_SUCCESS, UPDATE_API_FAILURE,CATEGORIES_SUCCESS,CATEGORIES_FAILURE, CLIENT_APP_SUCESS} from '../constants';
import api from './api';

export function getApiDetails(api) {
  return (dispatch) => {
    dispatch({type: DETAILS_VIEW, result: api});
  };
}


export function getLastUpdateApi(count) {
  return (dispatch) => {
    let uri = "";
    let params = {
      limit: count || 6,
      offset:0,
      sortField: 'update_ts',
      sortOrder:-1
    };
    api.gets(uri, params)
    .then ((apis) => dispatch({type: LATEST_API_SUCCESS, result: apis}))
    .catch(error => {
      console.log("getLastUpdateApi: ", error);
    });
    // dispatch({type: UPDATE_API_SUCCESS});
    //dispatch(loadItemFailure(error)
  };
}

export function getValueChain() {
  return (dispatch) => {
    let uri = "/valuechain";
    let params = {};
    api.gets(uri, params)
    .then ((vc) => dispatch({type: VALUECHAIN_SUCCESS, result: vc}))
    .catch(error => {
      console.log("getValueChain: ", VALUECHAIN_FAILURE, error);
    });
  };
}
export function getCategories() {
  return (dispatch) => {
    let uri = "/categories";
    let params = {};
    api.gets(uri, params)
    .then ((cat) => dispatch({type: CATEGORIES_SUCCESS, result: cat}))
    .catch(error => {
      console.log("getcategories: ", CATEGORIES_FAILURE, error);
    });
  };
}

export function getDataSubject() {
  return (dispatch) => {
    let uri = "/datasubject";
    let params = {};
    api.gets(uri, params)
    .then ((ds) => dispatch({type: DATASUBJECT_SUCCESS, result: ds}))
    .catch(error => {
      console.log("getValueChain: ", DATASUBJECT_FAILURE, error);
    });
  };
}

export function UpdateCreateType(cType) {
  return { type: CREATE_TYPE_SUCCESS, results: cType };
}

export function UploadApiDefination(body, options) {
  if (options && options.email && options.email.length > 0) {
    var email = options.email;
    return (dispatch) => {
      let uri = "/ParseSwagger/" + encodeURIComponent(email);
      let dataArg = body;
      api.posts(uri, dataArg)
      .then ((api) => dispatch({type: UPLOAD_API_SUCCESS, result: api}))
      .catch(error => {
        console.log("UploadApiDefination: ", UPLOAD_API_FAILURE, error);
      });
    };
  } else {
    console.log("UploadApiDefination: ", UPLOAD_API_FAILURE, "email id is missing");
    return null;
  }
}

export function UpdateHowToDoc(id, doc) {
  var body = { api_id: id, howtodoc: doc };
  return saveSWAPI(body, true);
}

export function saveSWAPI(dataArg, isUpdate) {
  var id = dataArg.api_id;
  var uri = isUpdate ? "/updateapi/" + id : "/register";
  // var action = svc.postApis; //isUpdate? svc.putApis :
  return (dispatch) => {
    api.posts(uri, dataArg)
      .then ((api) => dispatch({type: (isUpdate ? UPDATE_API_SUCCESS : UPDATE_API_SUCCESS), result: api, apiDetail: dataArg}))
      .catch(error => {
        console.log("UploadApiDefination: ", (isUpdate ? UPDATE_API_FAILURE : UPDATE_API_FAILURE), error);
      });
    // action(path, body, function (e) {
    //   dispatch(saveSWAPIResponse((isUpdate ? type.UPDATE_API_SUCCESS : type.SAVESWAPI_SUCCESS), { apiDetail: body, data: e, error: undefined }));
    // }, function (e) {
    //   var msg = parseErrorMessage(e);
    //   dispatch(saveSWAPIResponse((isUpdate ? type.UPDATE_API_FAILURE : type.SAVESWAPI_FAILURE), { apiDetail: body, data: undefined, error: msg }));
    //   dispatch(notifyError(msg));
    // });
  };
}

export function registerClientApp(dataArg) {
  debugger;
  var id = dataArg.api_id;
  var uri = "/registerConsumer";
  console.log("About to Post");
  return (dispatch) => {
    api.posts(uri, dataArg)
      .then ((api) => dispatch({type: CLIENT_APP_SUCESS, result: api, apiDetail: dataArg}))
      .catch(error => {
        console.log("Register fails: ", error);
      });
  };
}

