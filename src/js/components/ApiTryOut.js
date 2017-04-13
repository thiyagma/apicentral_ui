import React, {Component} from 'react';
import SwaggerUI from '../libs/SwaggerUI';
import {Notification} from '../grommet';
import {SwaggerTryOut} from '../actions/swagger'; //GetSwaggerJson
class ApiTryOut extends Component {
  constructor(props) {
    super(props);
    // this.state = {show : false, url: props.url, swaggerSpec: {}};
  }

  componentWillMount () {
    // const {url} = this.props;
    // if (url) {      
    //   this.props.dispatch(GetSwaggerJson(url));
    // }
  }

  componentWillReceiveProps() {
    // const {swagger: {swaggerdata}, url} = nextProps;
    // this.state = {show: true, swaggerSpec: swaggerdata, url: url};
  }

  _onTryNow(e) {
    console.log(e);
    SwaggerTryOut(e);
  }

  render () {
   //const {registerApi: {apiDetail: {apiSpecification}}} = this.props;
    const {apiDetail: {apiSpecification}} = this.props;
    let spec = apiSpecification? JSON.parse(apiSpecification): undefined;
    if (spec == null) {
      return (<Notification status="warning" message="no open api defination found." />);
    } else {
      return (<SwaggerUI swaggerSpec={spec} onTryNow={this._onTryNow.bind(this)}/>);
    }
  }
}

export default ApiTryOut;

  // this.state.show = true;
    //   var spec = {
    //     swagger : '2.0',
    //     info : {
    //       description : '...',
    //       title : 'API',
    //       version : '1'
    //     },
    //     'scheme': ['http'],
    //     'host': 'localhost:8080',
    //     basePath : '/x',
    //     paths : {
    //       '/test' : {
    //         post : {
    //           responses : {
    //             200 : {
    //               description : 'Success',
    //               schema : {
    //                 $ref : '#/definitions/Object'
    //               }
    //             }
    //           }
    //         }
    //       }
    //     },
    //     definitions : {
    //       Object : {
    //         properties : {
    //           link : {
    //             title : 'Links',
    //             'schema': {
    //               $ref : 'TODO'
    //             },
    //             type : 'object'
    //           }
    //         },
    //         type : 'object'
    //       }
    //     }
    //   };

      // this.state = {show: true, swaggerSpec: spec};
    // var url = "https://apicatalog.stackato.g4ihos.itcs.hpecorp.net/swagger.json";
