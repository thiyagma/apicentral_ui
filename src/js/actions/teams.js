import api from './api';
import { DEFAULTPAGESIZE, GET_TEAM_SUCCESS, ADD_TEAM_SUCCESS  } from '../constants';


export function getTeams(email) {
  return (dispatch) => {
    let uri = '/GetTeams';
    uri += "/" + encodeURIComponent(email);
    let params = {
      limit: DEFAULTPAGESIZE,
      offset: 0
    };
    api.gets(uri, params).then((data) => {
       dispatch({type: GET_TEAM_SUCCESS, result:data})
    })
    .catch(error => {
      console.log("Error in Retreiving Teams" + error);
    });
  };
}

export function addTeam(teamData) {
  return (dispatch) => {
    let uri = '/registerTeam';
    debugger;
    api.posts(uri, teamData).then((data) => {
       dispatch({type: ADD_TEAM_SUCCESS, result:data})
    })
    .catch(error => {
      console.log("Error in adding team" + error);
    });
  };
}