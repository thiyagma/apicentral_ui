import React, { Component, PropTypes } from 'react';

import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';
import Layer from 'grommet/components/Layer';

import InputRow from '../libs/Input/InputRow';

import CheckBox from 'grommet/components/CheckBox';
import TextInput from 'grommet/components/TextInput';
import { addTeamMember } from '../actions/teams';
import Loader from './Loader';
import Anchor from 'grommet/components/Anchor';
import LinkNextIcon from 'grommet/components/icons/base/LinkNext';
import Table from 'grommet/components/Table';


import { CLIENT_APP_REGISTER_FAIL, CLIENT_APP_REGISTER_SUCCESS,CLIENT_APP_UPDATE_SUCCESS,RESET_CLIENT_APP_UPDATE } from '../constants';

import {merge_object, currentEpoch, IsNullOREmpty, IsArrayNullOREmpty} from '../common';

export default class AddNewTeamMember extends Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._onOptionChange = this._onOptionChange.bind(this);
    this.state = {
      selectedOption:{value:"-1",label:"select one"}
    };
    this.error = {};

  }

  _onOptionChange(e) {
    debugger;
    this.setState({selectedOption:e.value});
  }

 _onSubmit() {
   debugger;
    let newMemberDetails = {};
   debugger;
   newMemberDetails.teamId = this.props.teamid;

   newMemberDetails.body = {
    //  "members":{
    //   "email":this.refs.emailId.value,
    //  "role" : this.refs.role.value
    //  }

     
      "email":this.refs.emailId.value,
     "role" : this.state.selectedOption.value
                
   };
   this.props.dispatch(addTeamMember(newMemberDetails));
    this.setState(this.props.onClose);
   
  }

   render() {
    //const {apiId, submitstatus} = this.props;
    const {updateStatus} = this.props;
 
    

   // loading = this.state.loading? React.createElement(Loader, {null}) : null;
    const options=[ {value:"admin",label:"admin"},{value:"consumer",label:"consumer"}];
    //const selectedOption = ;
    
    return (
      <Layer className="overlayForm" align='center' closer={true} onClose={this.props.onClose}>
        <h2> Add New Member</h2>
        <p>Type information to add a new member </p>
          <InputGroup>
            
           <InputRow key="emailId" name="emailId" ref='emailId' title='Email Address' type='text'/>            
         {/*  <InputRow key="role" title='role' name="role" ref='role'/>*/}
         <label>Role</label> <Select options={options}ref='role' value={this.state.selectedOption} onChange={this._onOptionChange} /> 
           
        {/*      <Table>
                <tr>
                  <td>
                  <label>Email Address</label>
                  <TextInput id='item1' name='Email Address'  placeHolder='Enter Email Id'/>
                  </td>
                </tr>
                <tr>
                  <td>
                  <label>Role</label>
                  <Select options={options} value={this.state.selectedOption} onChange={this._onOptionChange} />
                  </td>
                </tr>
              </Table>
           */}
        
          </InputGroup> 
        <Footer pad={{ vertical: 'large' }}>          
          <Button type='submit' label='OK' onClick={this._onSubmit} />
          <Anchor align='end'  icon={<LinkNextIcon />}   label='Group Import'  href='#' />

        </Footer>
       
      </Layer>
    );
  }
}

AddNewTeamMember.propTypes = {
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