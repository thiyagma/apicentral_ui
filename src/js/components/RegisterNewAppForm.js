import React, { Component, PropTypes } from 'react';

import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';

import InputRow from '../libs/Input/InputRow';

import CheckBox from 'grommet/components/CheckBox';
import TextInput from 'grommet/components/TextInput';
import {registerClientApp} from '../actions/registerapi';
import Loader from './Loader';

import { CLIENT_APP_REGISTER_FAIL, CLIENT_APP_REGISTER_SUCCESS } from '../constants';

import {merge_object, currentEpoch, IsNullOREmpty, IsArrayNullOREmpty} from '../common';

export default class RegisterNewAppForm extends Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._onAppNameChange = this._onAppNameChange.bind(this);
    this._onDescriptionChange = this._onDescriptionChange.bind(this);
    this._onStatusChange = this._onStatusChange.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    
    this.state = {
      label: undefined,
      status: undefined,
      isAuthFlow:false,
      mask:false
    };

    this.error = {};

    this.clientForm = {
      //api_id: undefined,
      api_info : [],
      name : '',
      description : '',
      status:'pending',
      is_authorization_flow: false,
      is_client_flow: true,
      create_by: "",
      create_ts: '',
      is_active: true,
      callbackurl: '',
    };

/*    {
  "api_id": "Api id is mandatory",
  "client_id": "Auto gernerated",
  "name": "Consumer name",
  "status": "Status approved or stalled etc",
  "is_authorization_flow": true,
  "is_client_flow": true,
  "description": "Consumer Description",
  "create_ts": "2017-04-03",
  "create_by": "aa@abc.com",
  "update_ts": "2017-04-03",
  "update_by": "aa@abc.com",
  "is_active": true,
  "callbackurl": "string",
  "team": [
    {
      "name": "string",
      "role": "string"
    }
  ],
  "rating": "string"
}
*/  }


  /*_onSubmit(event) {
    debugger;
    event.preventDefault();
    if(this.refs['appName'].value == '')
       this.refs['appName']
    if (this.state.label) {
      this.props.onSubmit({
        label: this.state.label,
        status: this.state.status || 'ok'
      });
    }
  }*/

  _onAppNameChange(event) {
    debugger;
    //this.setState({ label: event.target.value });
  }

  _onDescriptionChange(event) {
    debugger;
  }

  _onStatusChange(event) {
    this.setState({isAuthFlow: true});
  }

_validate() {
  debugger;
    var flg = true;
    var key;
    this.error = {};
    const check = (key, required, val) => {
      if (required) {
        var flag = Array.isArray(val) ? IsArrayNullOREmpty(val) : IsNullOREmpty(val);
        debugger;
        if (flag) {
          this.error[key] = true;
          flg = false;
        }
      }
    };

    try {
      for (key in this.clientForm) {
        if (this.clientForm.hasOwnProperty(key)) {
          var ele = this.refs[key];
          if (ele) {
            if (ele.tagType == "text" || ele.tagType == "file" || ele.tagType == "textarea" || ele.tagType == "select" || ele.tagType == "checkbox" || ele.tagType == "tag" || ele.tagType == 'multiselect') {
              check(key, ele.required, ele.value);
              this.clientForm[key] = ele.value;
            }
        }
      }
    }
  }
  catch (error) {
      console.log("%c Error", "color: red");
      console.log("key: " + key);
      console.log(error);
  }
    if (this.error) {
      console.log("%c Error", "color: Orange");
      console.log(this.error);
    }
    // console.log(this.apiform);
    debugger;
    if(!flg) {
          //this.state.mask=false;
         // this.setState({mask: false});
        } else {
          //this.setState({mask: true});
        }
        return flg;
  }

  _onCheckboxChange() {
    debugger;
     this.setState({isAuthFlow: true});
  }

 _onSubmit() {
   debugger;
      if (this._validate()) {
      debugger;
      this.clientForm = { ...this.clientForm,
           create_by: this.props.session.email
          }
        this.setState({mask: true});
        this.props.dispatch(registerClientApp(this.clientForm));
        //this.props.dispatch(saveSWAPI(this.apiform, true));


    } else { 
      console.log("Form Incomplete");
      this.setState({});
    }
  }

  render() {
    const {apiId, submitstatus} = this.props;
    debugger;
    console.log("Mask " + this.state.mask);
    let callbackText;

    var loading = this.state.mask? React.createElement(Loader, null) : null;
    var successMsg='';

    if(submitstatus.client_app_registration_status != undefined) {
      loading = "";
    }
    
    debugger;
    //this.clientForm.api_id = apiId;
    debugger;

    let errMsg;
    if(submitstatus.client_app_registration_status == CLIENT_APP_REGISTER_FAIL) {
       //this.error.name = submitstatus.client_app_registration_status
       this.error['name'] = true;
       errMsg = submitstatus.client_app_registration_msg;
    }
    if(submitstatus.client_app_registration_status == CLIENT_APP_REGISTER_SUCCESS) {
      successMsg = (<span> Successfully Registered </span>);  
    }

    if(this.state.isAuthFlow) {
      callbackText = (<InputRow key="callbackurl" title='Callbackurl' name="callbackurl" ref='callbackurl'/>);
    }
    else
    {
      callbackText = (<InputRow key="callbackurl" title='Callbackurl' name="callbackurl" ref='callbackurl' disabled="true"/>);
    }
    return (
      <Layer className="overlayForm" align='right' closer={true} onClose={this.props.onClose}>
        <h2>Register New Application</h2>
          {loading}
          <InputGroup title="Application Information">
             <InputRow key="name" name="name" ref='name' title='Application Name' required={true} type='text' error={this.error.name} errMsg={errMsg}/>
             <InputRow key="description" title='Description' name="description" ref='description' />
             <InputRow key="is_authorization_flow" title='Is Authorization Flow' name="is_authorization_flow" type="checkbox" ref='is_authorization_flow' onChange={this._onCheckboxChange.bind(this)}/>
             <InputRow key="callbackurl" title='Callbackurl' name="callbackurl" ref='callbackurl'/>
             <InputRow key="is_client__flow" title='Is Client Flow' name="is_client__flow" type="checkbox" ref='is_client__flow' />
          </InputGroup> 
        <Footer pad={{ vertical: 'large' }}>
          <Button primary={true} type='submit' label='Register' onClick={this._onSubmit} />
        </Footer>
        {successMsg}
      </Layer>
    );
  }
}

RegisterNewAppForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};


class InputGroup extends Component {
  render() {
    const {title, uppercase} = this.props;
    return (
      <Box pad={{ vertical: 'medium', horizontal: 'none' }}>
        <Heading tag="h6" strong={true} uppercase={uppercase || true}> {title} </Heading>
        <Box> {this.props.children} </Box>
      </Box>
    );
  }
}

/*<Form onSubmit={this._onSubmit}>
          <FormFields>
            <fieldset>
              <legend>Application Information</legend>
              <FormField label='Application Name' error="required">
                <input key="appName" ref="appName" type='text' name='appName' 
                  />
              </FormField>
              <FormField label='Description' htmlFor='labelId'>
                <input key="description" ref="description" type='text' name='label'
                  />
              </FormField>
              </fieldset>
                        </FormFields>
          </Form>
             {/* <fieldset>
              <legend>Security Credentials</legend>
              <FormField label='HPE OAuth(Client credential flow) or Open ID' htmlFor='labelId'>
                <CheckBox label='Is Authorization Flow' />
              </FormField>
              <FormField label='Is Client Flow' htmlFor='labelId'>
                <CheckBox label='Is Client Flow' />
                <FormField label='CallbackURL' htmlFor='labelId'>
                <input type='text' name='callbackurl' id='labelId'
                  onChange={this._onLabelChange} />
              </FormField>
              </FormField>
              </fieldset>*/
        