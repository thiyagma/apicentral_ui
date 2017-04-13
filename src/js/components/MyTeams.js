// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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
import AddNewTeam from './AddNewTeam';
import { getTeams } from '../actions/teams';
import { getMyApiFav } from '../actions/myfavapi';
import { RESET_TEAM_ADD } from '../constants';


class MyTeams extends Component {
  constructor(props) {
    super(props);
    this._onAddTeam = this._onAddTeam.bind(this);
  
    this.state = {
      addTeam:false
    };

    this.editFormObj = {};
  }

  componentWillMount() {
    this.props.dispatch(getTeams(this.props.session.email));
    this.props.dispatch(getMyApiFav(this.props.session.email,'MYAPI'));
    //this.props.dispatch(getTeams('aa@abc.com'));
  }

  _onAddTeam() {
    //todo
    this.setState({addTeam:true});
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
   //todo
   this.setState({addTeam:false});
   this.props.dispatch({type:RESET_TEAM_ADD});
  }

  _onRegisterNewApi() {
    //todo
  }

  
  render(){
    
    const { teams, session, myfavapi } = this.props;
    let myTeams = teams.myTeams;
    
    let teamList = '';
    let myapis = [];
    if(myfavapi.myapi.results.length > 0 ) {
      myapis = myfavapi.myapi.results.map(api => {
          //return {key: api.api_id, name:api.title, value:api.title };
          return {value: api.api_id, label:api.title};
       });
    }

debugger;
let addNewForm; 
if(this.state.addTeam) {
      addNewForm = (<AddNewTeam sessionObj={session} addStatus={teams.team_add_status} errMsg={teams.team_add_err_msg} dispatch={this.props.dispatch} myapi={myapis} onClose={this._onRegisterFormClose.bind(this)} onSubmit={this._onRegisterNewApi}/>);
}
else {
      addNewForm = "";
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



if(myTeams != undefined) {
 teamList = myTeams.map(team => {
                            return (
                              <TableRow key={team.team_id}>
                                <td><Link to={"/myteams/"+team.team_id} key={team.team_name}> {team.team_name} </Link></td>
                                <td>{team.api_name}</td>
                                <td>{team.members.length}</td>
                                <td>{team.update_ts}</td>
                                <td><EditIcon className="myteam-edit-icon" onClick={this._onEditClick.bind(this,team)}/><TrashIcon className="myteam-delete-icon" onClick={this._onDeleteClick.bind(this,team)}/></td>
                                </TableRow>
    )
  });

}
    return (
      <Box>
        <Box align="end" pad="small" full={false}>
          <Button label="Add New Team" onClick={this._onAddTeam} primary={true}/>
        </Box>
        
  <Table>
              <thead>
                <tr>
                  <th className="table-head"> Teams </th>
                  <th className="table-head"> API </th>
                  <th className="table-head"> Members </th>
                  <th className="table-head"> Last Updated </th>
                  <th className="table-head"> Actions </th>
                </tr>
              </thead>
              <tbody>
                {teamList}
              </tbody>
          </Table>
          {addNewForm}
          {confirmPopup}
      </Box>
    );
  }
}

let select = (state) => state;
export default connect(select)(MyTeams);