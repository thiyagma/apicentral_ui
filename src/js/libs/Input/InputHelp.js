// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, {Component, PropTypes} from 'react';
// import Box from 'grommet/components/Box';
// import HelpIcon from 'grommet/components/icons/base/Help';

const CLASS_ROOT = "input_help";
class InputHelp extends Component {
  render () {
    var {tooltip} = this.props;
    var classes = [CLASS_ROOT];
    if (tooltip == undefined) {
      classes.push(CLASS_ROOT + "--hide");
    }
    
    return (
      <a className={classes.join(' ')} title={tooltip || ''} > 
        <i className="icon" />
      </a>
    );
  }
}

export default InputHelp;

InputHelp.propTypes = {
  tooltip: PropTypes.string
};
