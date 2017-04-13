// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';
require('./polyfill');

var hasOwnProperty = Object.prototype.hasOwnProperty;
var common = {
  /*** parse Error Message ***/
  parseErrorMessage: function(e) {
    return e ? (e.response || e.message) : undefined; //'something went wrong'
  },
  /*** parse Error Message End ***/
  currentEpoch: () => new Date().valueOf(),
  b64EncodeUnicode: (str) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  },
  merge_object: function (obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }
    return obj3;
  },
  extend: function (bool, obj1, obj2) {
    for (var attrname in obj2) {
      if (obj1[attrname]) {
        obj1[attrname] = bool ? obj2[attrname] : obj1[attrname];
      } else {
        obj1[attrname] = obj2[attrname];
      }
    }
  },

  isObjectEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        return false;
      }
    }

    return true;
  },
  buildSearchQuery: (props) => {
    try {
      const {search: {searchTerm, selectedOption, optionalQuery}} = props;
      var options = {
        query: optionalQuery,
        searchtype: selectedOption,
        term: searchTerm
      };
      return options; // == "all" ? '' : selectedOption
    } catch (error) {
      throw error;
    }

  },
  buildQueryString: (req) => {
    //searchtype=apiname&term=him&limit=10&offset=0
    var q = req.query || {};
    var p = req.path || '';

    if (req.searchtype) {
      q.searchtype = req.searchtype;
    }

    if (req.term) {
      q.term = req.term;
    }

    return p + buildQuery(q);
  },

  IsNullOREmpty: (val) => {
    return (val == undefined || val.length < 1);
  },

  IsArrayNullOREmpty: (val) => {
    if (val) {
      if (!Array.isArray(val)) {
        throw new Exception('Not an Array type.');
      }

      return val.length > 0;
    }
    return false;
  }
};

module.exports = common;

// copyed from Grommet/util/rest
var buildParams = (object) => {
  let params = [];
  if (object) {
    for (const property in object) {
      if (object.hasOwnProperty(property)) {
        const value = object[property];
        if (null !== value && undefined !== value) {
          if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              params.push(property + '=' + encodeURIComponent(value[i]));
            }
          } else {
            params.push(property + '=' + encodeURIComponent(value));
          }
        }
      }
    }
  }
  return params;
};
var buildQuery = (object) => {
  const params = (Array.isArray(object) ? object : buildParams(object));
  return (params.length > 0 ? `?${params.join('&')}` : '');
};

