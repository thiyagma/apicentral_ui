import {MYBOOKMARKS_SUCCESS,MYBOOKMARKS_FAILURE,ADDMYBOOKMARKS_SUCCESS,ADDMYBOOKMARKS_FAILURE,DEFAULTPAGESIZE, MORE_MYBOOKMARKS_SUCCESS, MYFAV, MYFAV_SUCCESS, MYFAV_FAILURE, MYAPI_SUCCESS, MYAPI_FAILURE, ADDMYFAV_SUCCESS, ADDMYFAV_FAILURE} from '../constants';
import api from './api';
import {getUserByEmail} from './session';

export function addMyFav(email, apiid, apiName, condition) {
  var path = [];
  path.push(condition ? "/favoriteApi" : "/removeFavorite");
  path.push(encodeURIComponent(email));
  var obj = {
    api_id: apiid.toString(),
    api_name: apiName.toString()
  };
  return (dispatch) => {
    api.posts(path.join('/'), obj)
      .then((data) =>  {
        dispatch(getUserByEmail(email));
        dispatch({ type: ADDMYFAV_SUCCESS, values: obj, result: data});
      })
      .catch(error => {
        console.log("addMyFav: ", ADDMYFAV_FAILURE, error);
      });
  };
}


export function getMyApiFav(email, reqType) {
  return (dispatch) => {
    // dispatch({type: MYAPI_SUCCESS})
    let uri = (reqType == MYFAV) ? "/findMyFavorites" : "/findMyAPI";
    uri += "/" + encodeURIComponent(email);
    let params = {
      limit: DEFAULTPAGESIZE,
      offset: 0
    };

    // TODO: remove cond. when sort is implement in findMyFavorites service
    if (reqType != MYFAV) {
      params = {
        ...params,
        sortField: 'api_id',
        sortOrder: -1
      };
    }

    api.gets(uri, params)
    .then ((apis) => dispatch(loadSucess(reqType, apis)))
    .catch(error => {
      console.log("getMyApiFav: ", (reqType != MYFAV? MYAPI_FAILURE : MYFAV_FAILURE), error);
    });
  };
} 

export function getMyBookmarks(email) {
  return (dispatch) => {
    // dispatch({type: MYAPI_SUCCESS})
    let uri =  "/findMyBookmarks";
    uri += "/" + encodeURIComponent(email);
    let params = {
      limit: DEFAULTPAGESIZE,
      offset: 0
    };
    api.gets(uri, params)
    .then((data) =>  {
     dispatch({ type: MYBOOKMARKS_SUCCESS, result: data});
      })
    .catch(error => {
      console.log("getMyBookmarks: ", MYBOOKMARKS_FAILURE, error);
    });
  };
} 

export function getMoreBookmarks(email, options) {
  return (dispatch) => {
    // dispatch({type: MYAPI_SUCCESS})
    let uri =  "/findMyBookmarks";
    uri += "/" + encodeURIComponent(email);
    let params = {
      limit: DEFAULTPAGESIZE,
      offset: options.search.optionalQuery.offset
    };
    api.gets(uri, params)
    .then((data) =>  {
     dispatch({ type: MORE_MYBOOKMARKS_SUCCESS, result: data });
      })
    .catch(error => {
      console.log("getMyBookmarks: ", MYBOOKMARKS_FAILURE, error);
    });
  };
} 





function loadSucess(type, apis) {
  return {type: type == MYFAV? MYFAV_SUCCESS: MYAPI_SUCCESS, result: apis};
}


export function addMyBookMarks(email, apiid, apiName, isBookmarked) {
  var path = [];
  path.push(isBookmarked ? "/removebookmarks" : "/bookmarks");
  
  //path.push("/bookmarks");
  path.push(encodeURIComponent(email));
  var obj = {
    api_id: apiid.toString(),
    api_name: apiName.toString()
  };
  return (dispatch) => {
    api.posts(path.join('/'), obj)
      .then((data) =>  {
        dispatch(getUserByEmail(email));
        dispatch({ type: ADDMYBOOKMARKS_SUCCESS, values: obj, result: data});
      })
      .catch(error => {
        console.log("addMyBookMark: ", ADDMYBOOKMARKS_FAILURE, error);
      });
  };
}

// function loadFailure(type, error) {
//   return {type: type == MYFAV? MYFAV_SUCCESS: MYAPI_SUCCESS, result: [], error: error};
// };
