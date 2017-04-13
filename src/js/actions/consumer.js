import api from './api';
import { DEFAULTPAGESIZE, GET_CONSUMERS_SUCCESS, UPDATE_CONSUMERS_SUCCESS, UPDATE_CONSUMERS_API_SUCCESS  } from '../constants';


export function getConsumers(email) {
  return (dispatch) => {
    let uri = '/GetConsumers';
    uri += "/" + encodeURIComponent(email);
    let params = {
      limit: DEFAULTPAGESIZE,
      offset: 0
    };
    api.gets(uri, params).then((data) => {
       dispatch({type: GET_CONSUMERS_SUCCESS, result:data})
    })
    .catch(error => {
      console.log("Error in Retreiving consumer");
    });
  };
}

export function updateConsumers(consumerData) {
  return (dispatch) => {
    let uri = '/updateConsumer/' + consumerData.consumerid;
    //uri += "/" + encodeURIComponent(consumerId);
    debugger;
    api.posts(uri, consumerData.body).then((data) => {
       dispatch({type: UPDATE_CONSUMERS_SUCCESS, result:data})
    })
    .catch(error => {
      console.log("Error in updating consumer" + error);
    });
  };
}

export function updateConsumersWithApi(consumerData) {
  return (dispatch) => {
    let uri = '/integrateClientAppWithAPI/' + consumerData.consumerid;
    //uri += "/" + encodeURIComponent(consumerId);
    debugger;
    api.posts(uri, consumerData.body).then((data) => {
       dispatch({type: UPDATE_CONSUMERS_API_SUCCESS, result:data})
    })
    .catch(error => {
      console.log("Error in updating consumer" + error);
    });
  };
}