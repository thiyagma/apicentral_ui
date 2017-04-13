import {LATEST_API_SUCCESS} from '../constants';
import api from './api';

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
