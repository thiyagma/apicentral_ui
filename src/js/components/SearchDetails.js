// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {Box} from '../grommetref';
import AppPanel from './ApiPanel';

import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import Sidebar from 'grommet/components/Sidebar';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Columns from 'grommet/components/Columns';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Add from 'grommet/components/icons/base/Add';

import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';


import Accordion from 'grommet/components/Accordion';
//import AccordionPanel from 'grommet/components/AccordionPanel';
import AccordionPanel from './AccordionPanel';
import Tab from 'grommet/components/Tab';
import Tabs from 'grommet/components/Tabs';
import Select from 'grommet/components/Select';
import RegisterNewAppForm from './RegisterNewAppForm';

import GroupIcon from 'grommet/components/icons/base/Group';
import CalendarIcon from 'grommet/components/icons/base/Calendar';
import StarIcon from 'grommet/components/icons/base/Star';
import History from 'grommet/components/icons/base/History';
import Tag from 'grommet/components/icons/base/Tag';

import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';

import { getConsumers, updateConsumersWithApi } from '../actions/consumer';

import ApiTryout from './ApiTryOut';
import {CLEAR_CLIENT_APP} from '../constants';

class SearchDetails extends Component {
  constructor() {
    super();
    this._registerChange = this._registerChange.bind(this);
    this._onRegisterFormClose = this._onRegisterFormClose.bind(this);
    this._onRegisterNewApi = this._onRegisterNewApi.bind(this);
    this._onActiveAccordion = this._onActiveAccordion.bind(this);
    this.state = {
       activeMethodIndex : 0,
       newApplication : false
    };
    /*this.state = {
       newApplication : false,
       activeMethodIndex : 0
    };*/
  }

  componentWillMount() {
    this.props.dispatch(getConsumers(this.props.session.email));
  }

  _registerChange(e){
    debugger;
    //this.props.dispatch
    let consumerData = {};
    consumerData.consumerid = this.props.clientApp.consumer_id;
   consumerData.body = {
               api_id : this.props.registerApi.apiDetail.api_id   
    };
   //this.setState({loading:true});
   this.props.dispatch(updateConsumersWithApi(consumerData));

    //e.value;
    //this.props.registerApi.apiDetail.api_id
    //this.setState({newApplication:true});
    
  }

  _onRegisterFormClose() {
    console.log("Register Form closing");
    this.props.dispatch({type:CLEAR_CLIENT_APP});
    this.setState({newApplication:false});
  }

  _onRegisterNewApi() {
    console.log("Submit for new registration");
  }

  _onActiveAccordion(e) {
    //debugger;
    this.setState({activeMethodIndex:e})
  }

  render () {
    //{this.props.children? React.cloneElement(this.props.children, {...this.props}) : (<span />)}
    debugger;
    const {registerApi: {apiDetail}, session: {email}, clientApp } = this.props;
    const {activeMethodIndex} = this.state;
    const apiMethods = apiDetail.paths || [];

    const accordionPanels = apiMethods.map(apiMethod => {  
      return (
        <AccordionPanel key={apiMethod.name} heading={apiMethod.name}>
          <ul className='details-menu'>
            <li><Anchor href='#'>Authentication</Anchor></li>
            <li><Anchor href="#">HTTP Headers</Anchor></li>
            <li><Anchor href="#parameters">Parameters</Anchor></li>
            <li><Anchor href="#">Sample Requests and Response</Anchor></li>
            <li><Anchor href="#response_codes">Response Codes</Anchor></li>
          </ul>
        </AccordionPanel>
      )
    });
  var parameters='parameters';
  if(apiMethods && apiMethods[activeMethodIndex]) {
    let activeMethod = apiMethods[activeMethodIndex];
    if(activeMethod.parameters.constructor === Array){
      parameters = activeMethod.parameters.map(parameter => {
                            return (
                              <TableRow>
                                <td>{parameter.$ref}</td>
                                <td>{parameter.type}</td>
                                <td>{parameter.description}</td>
                                <td>{parameter.required}</td>
                                </TableRow>
                            )
                   });
      }
  }

var responses = 'responses';
if(apiMethods && apiMethods[activeMethodIndex]) {
    let activeMethod = apiMethods[activeMethodIndex];
    let responseKeys = [];
    for(var objectKey in activeMethod.responses) {
        responseKeys.push(objectKey);
    }
  responses =  responseKeys.map(responseCode => {
                   return(
                       <TableRow key={responseCode}>
                         <td>{responseCode}</td>
                         <td>{activeMethod.responses[responseCode].description}</td>
                       </TableRow>
                       )
                  });
}
     

var produces = 'Produces data goes here';
if(apiDetail && apiDetail.produces) {
  if(apiDetail.produces.constructor === Array){
    produces = apiDetail.produces.map(item => {
    return (
      <TableRow key={item}>
        <td>{item}</td>
      </TableRow>
    )
  });
  }
  
}

var consumes = 'Consumes data goes here';
if(apiDetail && apiDetail.consumes) {
   if(apiDetail.consumes.constructor === Array){
     consumes = apiDetail.consumes.map(item => {
    return (
      <TableRow key={item}>
        <td>{item}</td>
      </TableRow>
    )
  });
   }
  
}

    let registerForm; 
    if(this.state.newApplication) {
      registerForm = (<RegisterNewAppForm dispatch={this.props.dispatch} submitstatus={clientApp} session={this.props.session} apiId={apiDetail.api_id} onClose={this._onRegisterFormClose.bind(this)} onSubmit={this._onRegisterNewApi}/>);
    }
    else {
      registerForm = "";
    }

/* <Box>
        <GroupIcon />
        <StarIcon />
        <Select value='Register to use API' options={valuesForRegister} onChange={this._registerChange}></Select>
       </Box>*/
      /*<li><Anchor href="#security_definitions">Security Definitions</Anchor></li>
          <li><Anchor href="#definitions">Definitions</Anchor></li>*/
          

    const created = new Date(apiDetail.create_ts).toDateString();


    const valuesForRegister = clientApp.consumers.map(consumer => {
        return {label:consumer.name, value: consumer.consumer_id };
    });
    
    //['Register new client application','My application 1','My application 2','Create a new application'];
  
    
    

    return (
      <AppPanel>
        <Box direction='row' className='details-header'>
          <Box  basis='full'>
          <Heading tag='h2' strong={true}>{apiDetail.title} <span className='by'> By {apiDetail.author}</span></Heading> 
          <Box direction='row'><CalendarIcon className='header-icon'/> Created : {created} <History className='header-icon'/> Created : {created}  <Tag className='header-icon'/> Keyword : {apiDetail.keyword}</Box>
          <Paragraph size='medium' margin='small' >You can use this API to access all our API endpoints allowing you to get collateral
          from the {apiDetail.title} application</Paragraph>
       </Box>
          <Box basis='small' align='end'>
            <Box direction='row' className='icon-box'>
            <GroupIcon className='detail-icon-18'/>
            <StarIcon className='detail-icon-18'/>
            </Box>
            <Select value='Register to use API' options={valuesForRegister} onChange={this._registerChange.bind(this)}></Select>
          </Box>
       </Box>
       
       
       <Box direction='row'>
         <Box basis='medium' className='details-left-menu'>
                
                <Accordion active={0}  onActive={this._onActiveAccordion}>
                  {accordionPanels}
                </Accordion>
                <li><Anchor href="#consumes">Consumes</Anchor></li>
                <li><Anchor href="#produces">Produces</Anchor></li>
                <li><Anchor href='#tryout'>Try it</Anchor></li>
          </Box>
        <Box basis='xxlarge' pad='none' className='details-center-content'>
          <Section id='authentication' pad='none'>
            <Heading tag='h2'>Authentication</Heading>
            <Paragraph> Authentication content goes here </Paragraph>
          </Section>
          <Section id='http_headers' pad='none'>
            <Heading tag='h2'>HTTP headers</Heading>
            <Paragraph> HTTp headers content goes here </Paragraph>
          </Section>
          <Section id='parameters' pad='none'>
            <Heading tag='h2'>Parameters</Heading>
            <Table>
              <thead>
                <tr>
                  <th> #ref</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Required</th>
                </tr>
              </thead>
              <tbody>
                {parameters}
              </tbody>
          </Table>
          </Section>
          <Section id='request_response' pad='none'>
            <Heading tag='h2'>Sample Request and Response</Heading>
            <Paragraph>Sampe Request and Response goes here</Paragraph>
          </Section>
           <Section id='response_codes' pad='none'>
            <Heading tag='h2'>Response Codes</Heading>
            <Table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Description</th>
                </tr>
              </thead>
          <tbody>
            {responses}
          </tbody>
          </Table>
          </Section>
          <Section id='security_definitions' pad='none'>
            <Heading tag='h2'>Security Definitions</Heading>
            <Paragraph>Security Definition goes here</Paragraph>
          </Section>
          <Section id='produces' pad='none'>
            <Heading tag='h2'>Produces</Heading>
            <Table>
              <thead>
                <tr><th>Format</th></tr>
              </thead>
              <tbody>
                {produces}
              </tbody>
            </Table>
          </Section>
          <Section id='consumes' pad='none'>
            <Heading tag='h2'>Consumes</Heading>
            <Table>
              <thead>
                <tr><th>Format</th></tr>
              </thead>
              <tbody>
                {consumes}
              </tbody>
            </Table>
          </Section>
        <Section id='tryout'>
              <Heading tag='h2'>Tryout</Heading>
              <FormField label='Name of the accounts to return' htmlFor='labelId'>
                <input type='text' name='label' id='accounts'
                  onChange={this._onLabelChange} />
              </FormField>
              <FormField label='Starting Position' htmlFor='labelId'>
                <input type='text' name='label' id='labelId'
                  onChange={this._onLabelChange} />
              </FormField>
              <Select value='Production'></Select>
            <ApiTryout apiDetail={apiDetail}/>
        </Section>
        </Box>
        <Box basis='medium'>
          <Tabs>
            <Tab title='NodeJS'>
              <Paragraph>
                NodeJS Code Snippet goes here
              </Paragraph>
            </Tab>
              <Tab title='Shell'>
                <Paragraph>
                  Shell script goes here
                </Paragraph>
              </Tab>
              <Tab title='Java'>
                <Paragraph>
                  Java code snippet goes here
                </Paragraph>
              </Tab>
            </Tabs>
            {/*<Heading tag="h2">Response </Heading>
            <Heading tag="h3">Headers</Heading>*/}
            {registerForm}
        </Box>
       </Box>
      </AppPanel>
    );
  }
}

let select = (state) => state;
export default connect(select)(SearchDetails);
