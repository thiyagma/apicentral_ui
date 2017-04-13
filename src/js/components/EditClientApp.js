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
import { updateConsumers } from '../actions/consumer';
import Loader from './Loader';

import { CLIENT_APP_REGISTER_FAIL, CLIENT_APP_REGISTER_SUCCESS,CLIENT_APP_UPDATE_SUCCESS,RESET_CLIENT_APP_UPDATE } from '../constants';

import {merge_object, currentEpoch, IsNullOREmpty, IsArrayNullOREmpty} from '../common';

export default class EditClientApp extends Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._onStatusChange = this._onStatusChange.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    
    this.state = {
      label: undefined,
      status: undefined,
      isAuthFlow:false,
      loading:false
    };

    this.error = {};

    this.clientForm = {
      api_id: undefined,
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
  }

  _onStatusChange(event) {
    this.setState({isAuthFlow: true});
  }

  _onCheckboxChange() {
    debugger;
     this.setState({isAuthFlow: true});
  }

 _onSubmit() {
   debugger;
   let consumerData = {};

   consumerData.consumerid = this.props.clientApp.consumer_id;
   consumerData.body = {
               description : this.refs['description'].value,
               rating : this.refs['rating'].value
   };
   this.setState({loading:true});
   this.props.dispatch(updateConsumers(consumerData));
  }

  render() {
    //const {apiId, submitstatus} = this.props;
    const {clientApp , updateStatus} = this.props;
    debugger;
    let callbackText;
    var loading;
    if(updateStatus == CLIENT_APP_UPDATE_SUCCESS) {
       this.state.loading = false;
       this.props.dispatch({type:RESET_CLIENT_APP_UPDATE})
    }
    

    loading = this.state.loading? React.createElement(Loader, {null}) : null;
    
    var successMsg='';
    
    return (
      <Layer className="overlayForm" align='center' closer={true} onClose={this.props.onClose}>
        <h2> Edit Client Application</h2>
          {loading}
          <InputGroup title="Client Information">
             <InputRow key="name" name="name" ref='name' title='Application Name' type='text' value={clientApp.name} readonly={true}/>
             <InputRow key="description" title='Description' name="description" ref='description' value={clientApp.description} />
             <InputRow key="rating" title='rating' name="rating" ref='rating' value={clientApp.rating}/>
          </InputGroup> 
        <Footer pad={{ vertical: 'large' }}>
          <Button primary={true} type='submit' label='Update' onClick={this._onSubmit} />
        </Footer>
        {successMsg}
      </Layer>
    );
  }
}

EditClientApp.propTypes = {
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
