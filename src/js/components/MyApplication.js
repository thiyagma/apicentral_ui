// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getConsumers } from '../actions/consumer';

import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import TextInput from 'grommet/components/TextInput';
import Layer from 'grommet/components/Layer';
import Button from 'grommet/components/Button';

import ActionIcon from 'grommet/components/icons/base/Actions';
import EditIcon from 'grommet/components/icons/base/Edit';
import TrashIcon from 'grommet/components/icons/base/Trash';

import Menu from 'grommet/components/Menu';
import InputRow from '../libs/Input/InputRow';
import EditClientForm from './EditClientApp';
import { updateConsumers } from '../actions/consumer';
import { CLIENT_APP_UPDATE_SUCCESS, CLEAR_CLIENT_APP } from '../constants';
import RegisterNewAppForm from './RegisterNewAppForm';

class MyApplication extends Component {
  constructor(props) {
    super(props);
    this._onEditClick = this._onEditClick.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._addNewClient = this._addNewClient.bind(this);
    this._onOk = this._onOk.bind(this);
    this._onCancel =this._onCancel.bind(this);
    this.state = {
      editClient:false,
      confirmDelete:false,
      registerClient:false
    };

    this.editFormObj = {};
  }

  componentWillMount() {
    this.props.dispatch(getConsumers(this.props.session.email));
    //this.props.dispatch(getConsumers('aa@abc.com'));
  }

  _onOk() {
   let consumerData = {};
   debugger;
   consumerData.consumerid = this.editFormObj.consumer_id;
   consumerData.body = {
               is_active : false
   };
   this.props.dispatch(updateConsumers(consumerData));
    this.setState({confirmDelete:false});  
  }

  _onCancel() {
   this.setState({confirmDelete:false});  
  }

  _addNewClient() {
    this.setState({registerClient:true});
  }

_onEditClick(obj) {
  debugger;
  this.editFormObj = obj;
  this.setState({editClient:true})
  console.log('edit action triggered');
}

_onDeleteClick(obj) {
  this.editFormObj = obj;
  this.setState({confirmDelete:true});
}

_onRegisterFormClose() {
    console.log("Register Form closing");
    this.props.dispatch({type:CLEAR_CLIENT_APP});
    this.setState({registerClient:false});
}

  _onRegisterNewApi() {
    //todo
  }

  render(){
    const { clientApp, session } = this.props;
    let consumers = clientApp.consumers;

var consumerList = '';

var editForm ='';

let editClientObj = this.editFormObj;
debugger;

let registerClient; 
    if(this.state.registerClient) {
      registerClient = (<RegisterNewAppForm dispatch={this.props.dispatch} submitstatus={clientApp} session={this.props.session} apiId="12" onClose={this._onRegisterFormClose.bind(this)} onSubmit={this._onRegisterNewApi}/>);
    }
    else {
      registerClient = "";
    }


let editClientAppForm; 
if(this.state.editClient) {
      editClientAppForm = (<EditClientForm clientApp={this.editFormObj} updateStatus={clientApp.client_app_updated}dispatch={this.props.dispatch} onClose={this._onRegisterFormClose.bind(this)} onSubmit={this._onRegisterNewApi}/>);
}
else {
      editClientAppForm = "";
}

let confirmPopup;
if(this.state.confirmDelete) {
   confirmPopup = (<Layer className="overlayForm" align='center' closer={true} onClose={this.props.onClose}>
                      <h3> Are you sure you want to delete this item? </h3>
                      <Box direction='row' pad='medium'>
                        <Button primary={true} type='submit' label='Ok' onClick={this._onOk} />
                        <Button type='submit' label='Cancel' onClick={this._onCancel} />
                      </Box>
                   </Layer>)
}
else {
  confirmPopup = "";
}

debugger;

if(consumers != undefined) {
 consumerList = consumers.map(consumer => {
                            return (
                              <TableRow>
                                <td>{consumer.name}</td>
                                <td>{consumer.description}</td>
                                <td>{consumer.client_id}</td>
                                <td>{consumer.client_secret}</td>
                                <td>{consumer.team.name}</td>
                                <td>{consumer.rating}</td>
                                <td>{consumer.status}</td>
                                <td><EditIcon className="myapp-edit-icon" onClick={this._onEditClick.bind(this,consumer)}/><TrashIcon className="myapp-delete-icon" onClick={this._onDeleteClick.bind(this,consumer)}/></td>
                                </TableRow>
    )
  });

}
    return (
      <Box>
        <Box align='end' pad='small'>
          <Button label='Register New Client Application' onClick={this._addNewClient} primary={true} />
        </Box>
        
  <Table>
              <thead>
                <tr>
                  <th className="table-head"> Name </th>
                  <th className="table-head"> Description </th>
                  <th className="table-head"> Client ID </th>
                  <th className="table-head"> Client Secret </th>
                  <th className="table-head"> Team </th>
                  <th className="table-head"> My Rating </th>
                  <th className="table-head"> Security Token Status </th>
                  <th className="table-head"> Actions </th>
                </tr>
              </thead>
              <tbody>
                {consumerList}
              </tbody>
          </Table>
          {registerClient}
          {editClientAppForm}
          {confirmPopup}
      </Box>
    );
  }
}

let select = (state) => state;
export default connect(select)(MyApplication);