// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppPanel from './ApiPanel';
import {CREATE_UPLOAD} from '../constants';
import {UpdateCreateType, getValueChain, getDataSubject,getCategories} from '../actions/registerapi';

class CreateApi extends Component {

  componentWillMount() {
    this.props.dispatch(UpdateCreateType(CREATE_UPLOAD));
    this.props.dispatch(getValueChain());
    this.props.dispatch(getDataSubject());
    this.props.dispatch(getCategories());
  }

  render() {
    const {children} = this.props;
    let child = children? React.cloneElement(children, {...this.props}) : null;
    return (
      <AppPanel title="Register Api">
        {child}
      </AppPanel>
    );
  }
}

let select = (state) => state;
export default connect(select)(CreateApi);
