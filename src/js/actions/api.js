// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

// import common from '../common';
import Rest, { headers, buildQuery } from 'grommet/utils/Rest';
import "isomorphic-fetch";
require('es6-promise').polyfill();

let _headers = {
  ...headers,
  'X-API-Version': 101
};

//let _host = 'https://apicatalog-dev.stackato.g4ihos.itcs.hpecorp.net';
//let _host = 'https://apicatalog-dev.stackato.g4ihos.itcs.hpecorp.net';
let _host = 'https://hc4t02445.itcs.hpecorp.net:8443'

let urlPrefix = '/api/v1/apistore';

function updateHeaders (headers) {
  _headers = {..._headers, ...headers};
  Rest.setHeaders(headers);///
}

function _get (uri, params) {
  const options = { method: 'GET', headers: _headers };
  const query = buildQuery(params);
  console.log("API : query -> " + query);
  return fetch(`${_host}${urlPrefix}${uri}${query}`, options)
    .then(response => response.json());
}

function _post (uri, dataArg) {
  const data = (typeof dataArg === 'object') ?
    JSON.stringify(dataArg) : dataArg;
  const options = { method: 'POST', headers: _headers, body: data };
  return fetch(`${_host}${urlPrefix}${uri}`, options)
    .then(response => response.json());
}

let sessionPath = `${_host}/secure`;
function login() {
  let uri = `${sessionPath}/login`;
  window.open(uri, "_self");
  return false;
}

function logout() {
  let uri = `${sessionPath}/logout`;
  window.open(uri, "_self");
  return false;
}

function whoami() {
  const options = { method: 'GET', headers: _headers, 'credentials': 'include'};
  return fetch(`${sessionPath}/whoami`, options)
    .then(response => response.json());
}

export default {
  updateHeaders: updateHeaders,
  gets: _get,
  posts: _post,
  login: login,
  logout: logout,
  whoami: whoami
};
