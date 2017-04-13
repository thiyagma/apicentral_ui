import React, { Component, PropTypes } from 'react';
import MainView from './MainView';
import { headers, processStatus } from 'grommet/utils/Rest';
import Swagger from 'swagger-client';
export default class SwaggerUI extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spec: props.swaggerSpec
    };

    this.error = undefined;
    this.message = undefined;
  }

  componentWillMount() {
    this.options = {};
    if (this.props.options) {
      var opj = this.defaultProps();
      for (var key in opj) {
        if (this.props.options.hasOwnProperty(key)) {
          this.options[key] = this.props.options[key];
        } else {
          this.options[key] = opj[key];
        }
      }
    } else {
      this.options = this.defaultProps();
    }
  }

  componentDidMount() {
    console.log('SwaggerUI - ComponentDidMount');
    //
    try {
      if (this.state.spec == undefined || Object.keys(this.state.spec).length === 0) {
        throw new SwaggerException("Invalid Swagger specification.");
      }
      this.options.spec = this.state.spec;
      var that = this;
      this.options.success = function (e) {
        if (this.isBuilt) {
          that.setState({ apiClient: api });
        }
      };
      this.options.onFailure = function (e) {
        console.error(e);
      };

      var api = new Swagger(this.options);
    } catch (error) {
      console.error(error);
    }
  }


  _testUrl(url) {
    var pttn = "^((http[s]?):\/\/)\/?([^:\/\s]+)(.*)?(\/swagger.json)$";
    return url.match(pttn);
  }

  _onTryNow(event) {
    if (this.props.onTryNow) {
      this.props.onTryNow(event);
    } else {
      var request = {
        url: event.url,
        method: event.method,
        success: event.success,
        failure: event.failure
      };

      for (var key in event.headers) {
        if (event.headers.hasOwnProperty(key)) {
          headers[key] = event.headers[key];
        }
      }

      const options = { method: request.method, headers: headers };
      if (event.body) {
        options.body = event.body.value;
      }

      fetch(request.url, options)
        .then(processStatus)
        .then(request.success)
        .catch(request.failure);
    }
  }

  render() {
    return this.state.apiClient ? (<MainView apiClient={this.state.apiClient} options={this.options} onTryNow={this._onTryNow.bind(this)}/>) : null;
  }
};

SwaggerUI.propTypes = {
  swaggerSpec: PropTypes.object.isRequired,
  options: PropTypes.shape({
    docExpansion: PropTypes.string,
    apisSorter: PropTypes.string,
    showRequestHeaders: PropTypes.bool,
    supportedSubmitMethods: PropTypes.arrayOf(PropTypes.string),
    defaultModelRendering: PropTypes.string,
    highlightSizeThreshold: PropTypes.number
  }),
  onTryNow: PropTypes.func
};


SwaggerUI.prototype.defaultProps = () => {
  return {
    docExpansion: "none",
    apisSorter: "alpha",
    showRequestHeaders: false,
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
    defaultModelRendering: 'schema',
    highlightSizeThreshold: 10000,
    enableCookies: false
  };
};

function SwaggerException(error, message) {
  this.error = error;
  this.message = message;
}
