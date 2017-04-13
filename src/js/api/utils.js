// import RequestWatcher from './request-watcher';

//let host = "https://apicatalog-dev.stackato.g4ihos.itcs.hpecorp.net/";
let host = 'https://hc4t02445.itcs.hpecorp.net:8443/'

let basePath = "api/v1/apistore";
let _headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

export function headers() {
  return _headers;
}

export function parseJSON(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
}

export function updateHeaders(newHeaders) {
  _headers = { ..._headers, newHeaders };
  Object.keys(_headers).forEach((key) => {
    if (undefined === _headers[key]) {
      delete _headers[key];
    }
  });
}

// export const requestWatcher = new RequestWatcher();
export const hosturl = host+basePath;
