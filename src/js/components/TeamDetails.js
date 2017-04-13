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
import Heading from 'grommet/components/Heading';
import { CLIENT_APP_UPDATE_SUCCESS } from '../constants';


class TeamDetails extends Component {
  constructor(props) {
    super(props);
    this.editFormObj = {};
  }

  componentWillMount() {
  }


  render(){
    debugger;
    const teamid = this.props.params.id;
    const { teams } = this.props;
    
    let myTeams = teams.myTeams;
    
    let index=-1;

    for(let i=0; i < myTeams.length; i++) {
      if(teamid == myTeams[i].team_id) {
        index = i;
        break;
      }
    }
  
  let membersList = "No Members or Invalid Team Id";
   if(index != -1) {
     let members = myTeams[index].members;
     membersList = members.map(member => {
                 return (
                   <TableRow>
                     <td>{member.email}</td>
                     <td>{member.role}</td>
                   </TableRow>
                 )
     });
   }


    return (
      <Box full={true} pad="medium">
           <Heading tag="h4" strong={true}>{myTeams[index].team_name}</Heading>
           <Table>
              <thead>
                <tr>
                  <th> Member </th>
                  <th> Role </th>
                  <th> API </th>
                </tr>
              </thead>
              <tbody>
                {membersList}
              </tbody>
          </Table>
      </Box>
    );
  }
}

let select = (state) => state;
export default connect(select)(TeamDetails);