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
import Label from 'grommet/components/Label';
import Select from 'grommet/components/Select';

import InputRow from '../libs/Input/InputRow';

import CheckBox from 'grommet/components/CheckBox';
import TextInput from 'grommet/components/TextInput';
import { addTeam } from '../actions/teams';
import Loader from './Loader';
import { ADD_TEAM_SUCCESS,RESET_TEAM_ADD,ADD_TEAM_FAIL } from '../constants';

import { CLIENT_APP_REGISTER_FAIL, CLIENT_APP_REGISTER_SUCCESS,CLIENT_APP_UPDATE_SUCCESS,RESET_CLIENT_APP_UPDATE } from '../constants';

import {merge_object, currentEpoch, IsNullOREmpty, IsArrayNullOREmpty} from '../common';

export default class AddNewTeam extends Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._onAdd = this._onAdd.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this._onSelect = this._onSelect.bind(this);
    
    this.state = {
      label: undefined,
      status: undefined,
      isAuthFlow:false,
      loading:false,
      selectedOption : { value: '-1', label: 'Select an API' }
    };

    this.error = {};

    this.error.name = false;

    this.teamObj = {
      create_by:undefined,
      team_name: undefined,
      members:[],
      description: undefined,
      api_id: undefined,
      api_name : '',
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
   const val = this.refs["name"].value;

   var flag = Array.isArray(val) ? IsArrayNullOREmpty(val) : IsNullOREmpty(val);
   if (flag) {
          this.error['name'] = true;
          this.setState({loading: false});
   }
   else {
    this.teamObj.create_by = this.props.sessionObj.email;
    this.teamObj.team_name = this.refs["name"].value;
    this.teamObj.description= this.refs['description'].value;
    this.teamObj.api_id = this.state.selectedOption.value;
    this.teamObj.api_name = this.state.selectedOption.label;
    this.setState({loading:true, reset_err_msg:true});
    this.props.dispatch(addTeam(this.teamObj));
   }
   

   /*for(let i=0 ; i < this.myapis.length; i++) {
     if(this.myapis[i].name == this.refs['api'].value) {
       this.teamObj.api_id = this.myapis[i].key;
       this.teamObj.api_name = this.myapis[i].name;
       break;
     }
   }*/
   
   //this.props.onClose();
  }

  _onAdd(){

  }

  _onSelect(e) {
    debugger;
    this.setState({selectedOption:e.value});
  }

  render() {
    //const {apiId, submitstatus} = this.props;
    const {clientApp , updateStatus, myapi, sessionObj, addStatus,errMsg} = this.props;
    debugger;
    let callbackText;
    var loading;
    let errorMsg = errMsg;
    
    if(addStatus == ADD_TEAM_SUCCESS) {
       this.state.loading = false;
       this.props.dispatch({type:RESET_TEAM_ADD});
    }
    else if(addStatus == ADD_TEAM_FAIL) {
      this.state.loading = false;
      this.error.name = true;
    }
    
    
    loading = this.state.loading? React.createElement(Loader, {null}) : null;
    
    var successMsg='';

  
    return (
      <Layer className="overlayForm" align='center' closer={true} onClose={this.props.onClose}>
        <h2> Create New Team</h2>
        <p>Fill out the following information to create your new team</p>
          {loading}
          <InputGroup>
             <InputRow key="name" name="name" ref='name' title='Name' type='text' required={true} error={this.error.name} errMsg={errMsg}/>
             <InputRow key="description" title='Description' name="description" ref='description' />
             {/*<InputRow key="api" title='Assigned API' name="api" ref='api' type='select' model={myapi}/>*/}
             <Box direction='column'>
               <Label>
                 Assigned API
               </Label>
               <Select key="api" options={myapi} value={this.state.selectedOption} onChange={this._onSelect} />
             </Box>
          </InputGroup> 
        <Footer pad={{ vertical: 'large' }}>
          <Button primary={true} type='submit' label='Add Team' onClick={this._onSubmit} />
          {/*<Button type='submit' label='Add Memebers' onClick={this._onSubmit} />*/}
        </Footer>
        {successMsg}
      </Layer>
    );
  }
}

AddNewTeam.propTypes = {
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
