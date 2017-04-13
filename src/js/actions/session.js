import { browserHistory as history } from 'react-router';
//import { SESSION_LOAD, SESSION_LOGIN, SESSION_LOGOUT } from '../actions';
import { SESSION_LOGIN, SESSION_LOGOUT } from '../actions';

import { deleteSession, postSession } from '../api/session';
import { updateHeaders } from '../api/utils';
import { getMyApiFav } from '../actions/myfavapi';

import { SESSION_INIT, SESSION_FAILURE, USER_SUCCESS, USER_FAILURE } from '../constants'; //SESSION_FAILURE, WHOAMI_SUCCESS, WHOAMI_FAILURE,
import api from './api';

const localStorage = window.localStorage;

export function initialize() {
  return (dispatch) => {
    const { email } = localStorage;
    
    // const { email, name, token } = localStorage;
    // if (email && token) {
    //   dispatch({
    //     type: SESSION_LOAD, payload: { email, name, token }
    //   });
    // } else {
    //   history.push('/login');
    //   //TODO: redirect to backend login.
    // }

//
    api.whoami()
      .then((whoami) => {
        if (whoami.statusCode == 401) {
           return api.login();
        } else {
          onSuccess(whoami);
          // dispatch({ type: WHOAMI_SUCCESS, result: whoami });
          dispatch(sessionSuccess(localStorage));
          dispatch(getUserByEmail(localStorage.email));
        }
        return true;
      })
      .catch((error) => {
        console.log("whoami: ", SESSION_FAILURE, error);
        // dispatch({ type: WHOAMI_FAILURE, error: whoami });
        // debugger
      });

  };
}

export function login(targetPath) {
  return (dispatch) => {
    var environment = process.env.NODE_ENV || 'development';
    if (environment == 'development') {
      let payload = {email: "himanshu.taunk@hpe.com", name: "himanshu", token: "asfafiqhq340fjq"};
      updateHeaders({ Auth: payload.token });
        dispatch({ type: SESSION_LOGIN, payload });
        try {
          localStorage.email = payload.email;
          localStorage.name = payload.name;
          localStorage.token = payload.token;
        } catch (e) {
          alert(
            'Unable to preserve session, probably due to being in private ' +
            'browsing mode.'
          );
        }
        history.push(targetPath);
    } else {
    postSession(email, password)
      .then((payload) => {
        updateHeaders({ Auth: payload.token });
        dispatch({ type: SESSION_LOGIN, payload });
        try {
          localStorage.email = payload.email;
          localStorage.name = payload.name;
          localStorage.token = payload.token;
        } catch (e) {
          alert(
            'Unable to preserve session, probably due to being in private ' +
            'browsing mode.'
          );
        }
        history.push(targetPath);
      })
      .catch(payload => dispatch({
        type: SESSION_LOGIN,
        error: true,
        payload: {
          statusCode: payload.status, message: payload.statusText
        }
      }))
    }
  };
}

export function logout(session) {
  return (dispatch) => {
    dispatch({ type: SESSION_LOGOUT });
    deleteSession(session);
    updateHeaders({ Auth: undefined });
    try {
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('token');
    } catch (e) {
      // ignore
    }
    window.location.href = '/login'; // reload fully
  };
}

export function sessionInitialize() {
  return (dispatch) => {
    const { email} = localStorage; //, token, userName 
    dispatch(sessionSuccess(localStorage));
    if (!email && process.env.NODE_ENV === 'production') {
      api.whoami()
      .then((whoami) => {
        // debugger
        if (whoami.statusCode == 401) {
           return api.login();
        } else {
          onSuccess(whoami);
          // dispatch({ type: WHOAMI_SUCCESS, result: whoami });
          dispatch(sessionSuccess(localStorage));
          dispatch(getUserByEmail(localStorage.email));
        }
        return true;
      })
      .catch((error) => {
        console.log("whoami: ", SESSION_FAILURE, error);
        // dispatch({ type: WHOAMI_FAILURE, error: whoami });
        // debugger
      });
    } else {
      // onSuccess({sessionIndex: "wefnwfowfwfw222rf", cn: "Guest", uid: "himanshu.taunk@hpe.com"});
      // dispatch(sessionSuccess(localStorage));
      // dispatch(getUserByEmail(localStorage.email));
      api.whoami()
      .then((whoami) => {
        // debugger
        if (whoami.statusCode == 401) {
          return api.login();
        } else {
          onSuccess(whoami);
          // dispatch({ type: WHOAMI_SUCCESS, result: whoami });
          dispatch(sessionSuccess(localStorage));
          dispatch(getUserByEmail(localStorage.email));
          //dispatch(getMyApiFav(localStorage.email,'MYAPI'));
        }
        return true;
      });
    }
  };
}


export function getUserByEmail(email) {
  return (dispatch) => {
    let uri = "/users/email/" + encodeURIComponent(email);
    api.gets(uri, {})
    .then ((user) => dispatch({type: USER_SUCCESS,  result:  user}))
    .catch(error => {
      console.log("getUserByEmail: ", USER_FAILURE , error);
    });
  };
}

function onSuccess(whoami) {
  let token = whoami.sessionIndex;
  try {
    localStorage.userName = whoami.cn;
    localStorage.token = token;
    localStorage.email = whoami.uid;
    //let fn = getMyApiFav(localStorage.email,'MYAPI');
    //fn((action)=>{});
    //obj();
  } catch (e) {
    alert(
      "Unable to preserve session, probably due to being in private" +
      "browsing mode."
    );
  }

  api.updateHeaders({ Auth: token, "Session-id": token });

}

function sessionSuccess(local) {
  return { type: SESSION_INIT, userName: local.userName || "Guest...!!!", token: local.token, email: local.email };
}

