// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';
import { SWAGGERFILE_SUCCESS, SWAGGERFILE_FAILURE } from '../constants';

// import common from '../common';
import { headers, buildQuery } from 'grommet/utils/Rest';
import "isomorphic-fetch";
require('es6-promise').polyfill();

let _headers = {
  ...headers,
  'X-API-Version': 101
};

//let _host = 'https://apicatalog-dev.stackato.g4ihos.itcs.hpecorp.net';
let _host = 'https://hc4t02445.itcs.hpecorp.net:8443'

let urlPrefix = '/apiswagger';

function _get(uri, params) {
  const options = { method: 'GET', headers: _headers };
  const query = buildQuery(params);
  console.log(`${_host}${urlPrefix}${uri}${query}`);

  return fetch(`${_host}${urlPrefix}${uri}${query}`, options);
}

function _post(uri, dataArg) {
  const data = (typeof dataArg === 'object') ?
    JSON.stringify(dataArg) : dataArg;
  const options = { method: 'POST', headers: _headers, body: data };
  return fetch(`${_host}${urlPrefix}${uri}`, options);
  // .then(response => response.json());
}


export function ReadSwaggerJson(uri, options) {
  return (dispatch) => {
    var params = {};// = {url: uri};
    _get(uri, params)
      .then(response => response.json())
      .then((api) => dispatch({ type: SWAGGERFILE_SUCCESS, result: api, error: undefined }))
      .catch((error) => {
        console.log("ReadSwaggerJson: ", SWAGGERFILE_FAILURE, error);
      });
    // swaggersvc.GetSwagger(file, (data) => {
    //   dispatch(UploadApiDefination(data.result, options));
    // }, (err) => {
    //   var msg = parseErrorMessage(err);
    //   dispatch(saveSWAPIResponse(type.UPLOAD_API_FAILURE, { swagger: body, data: undefined, error: msg }));
    //   dispatch(notifyError(msg));
    // });
    //UploadApiDefination
    // return _file;
  };
}

export function GetSwaggerJson(swaggeruri) {
  var uri = '/getdefination';
  var params = { url: swaggeruri };
  return (dispatch) => {
    _get(uri, params)
      .then(response => response.json())
      .then((api) => dispatch({ type: SWAGGERFILE_SUCCESS, result: api, error: undefined }))
      .catch((error) => {
        console.log("getdefination: ", SWAGGERFILE_FAILURE, error);
      });
    // swaggersvc.GetDefination(uri, (data) => {
    //   dispatch({type: type.SWAGGERFILE_SUCCESS, data: data, error: undefined});
    // }, (err) => {
    //   var msg = parseErrorMessage(err);
    //   dispatch({type: type.SWAGGERFILE_FAILURE, data: undefined, error: msg });
    //   dispatch(notifyError(msg));
    // });
  };
}

export function SwaggerTryOut(request) {
  const dataArg = { url: request.url, method: request.method, headers: request.headers };
  if (request.body) {
    dataArg.body = request.body.value;
  }

  let uri = '/tryout';
  _post(uri, dataArg)
    .then(request.success)
    .catch((error) => {
      console.log("SwaggerTryOut: ", SWAGGERFILE_FAILURE, error);
      request.failure(error);
    });
}
