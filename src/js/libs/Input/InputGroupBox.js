'use strict';

import React, {Component} from 'react';
import {InputDiv} from './';
const CLASS_ROOT = "input_groupbox";
class InputGroupBox extends Component {
  render () {
    var {className} = this.props;
    var classes = [CLASS_ROOT];
    if (className) {
      classes.push(className);
    }
    return (
      <InputDiv direction="row" pad="small" align="start" justify="between" className={classes.join(' ')}>
        {this.props.children}
      </InputDiv>
    );
  }
}

export default InputGroupBox;
