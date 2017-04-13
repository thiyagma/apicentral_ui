// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';


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
import { getTeams } from '../actions/teams';
import { CLIENT_APP_UPDATE_SUCCESS } from '../constants';
import AddIcon from 'grommet/components/icons/base/Add';
import AddNewTeamMember from './AddNewTeamMember';



class TeamDetails extends Component {
  constructor(props) {
    super(props);
    this.addNewMemberFormObj = {};
    this._onAddTeamMember = this._onAddTeamMember.bind(this);
  
    this.state = {
      addTeamMember:false
    };

  }

  componentWillMount() {
    //this.props.dispatch(getTeams('aa@abc.com'));
  }

   _onAddTeamMember() {
    //todo
    this.setState({addTeamMember:true});
  }


_onRegisterFormClose() {
   //todo
   this.setState({addTeamMember:false});
  }

  _onRegisterNewApi() {
    //todo
  }

  render(){
    debugger;
    const teamid = this.props.params.id;
    const { teams,session } = this.props;
    
    var teamName="";
   
    let myTeams = teams.myTeams;
    
    let index=-1;
    for(let i=0; i < myTeams.length; i++) {
      if(teamid == myTeams[i].team_id) {
        index = i;
        teamName=myTeams[i].team_name;
        break;
      }
    }
    
    let addNewMemberForm; 
    if(this.state.addTeamMember) {
          addNewMemberForm = (<AddNewTeamMember dispatch={this.props.dispatch} onClose={this._onRegisterFormClose.bind(this)} onSubmit={this._onRegisterNewApi} teamid={teamid}/>);
    }
    else {
          addNewMemberForm = "";
    }

  
  console.log("teamName :- "+teamName);
  let membersList = "No Members or Invalid Team Id";
   if(index != -1) {
     let members = myTeams[index].members;
     var teamApiName=myTeams[index].api_name;
     var updateTime=myTeams[index].update_ts;
    // let members = myTeams[index];
     membersList = members.map(member => {
                 return (
                   <TableRow>
                     <td>{member.email}</td>
                     <td>{member.role}</td>
                     <td>{teamApiName}</td>
                     <td>{updateTime}</td>
                   </TableRow>
                 )
     });
   }



    return (
      <Box full={true}>
      	<Box>
            <h2>{teamName}</h2>
        </Box>
        <Box align="end">
          <Menu align="end" label="Filter By"  dropAlign="right" icon="<DownIcon />"/>
          <Button icon={<AddIcon />} align="end" label="Add New Member"  onClick={this._onAddTeamMember} primary={true} />                  
       </Box>
      <Table>
        <thead>               
          <tr>
            <th> Member </th>
            <th> Role </th>
            <th> API  </th>
            <th> Last Activity </th>
          </tr>
        </thead>
        <tbody>
          {membersList}      
        </tbody>
      </Table>
      <layer>
          {addNewMemberForm}
      </layer>
         
      </Box>
    );
  }
}

let select = (state) => state;
export default connect(select)(TeamDetails);