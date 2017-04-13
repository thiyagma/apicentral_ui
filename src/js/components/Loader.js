import React, { Component } from 'react';
import SpinningIcon from 'grommet/components/icons/Spinning';
import Box from 'grommet/components/Box';
export default class Loader extends Component {
  render () {
    const {loaderText} = this.props;
    var loader = React.createElement('div', {className: 'loader_icon'}, React.createElement(SpinningIcon, null));
    let loaderLabel; 
    if(loaderText != undefined) {
       loaderLabel = loaderText;
    }
    else {
      loaderLabel = ""
    }
    var msg = React.createElement('div', {className: 'loader_label'}, "Loading...");
    return React.createElement(
      Box,
      {className: 'loader_mask'},
      React.createElement(
        Box,
        {className: 'loader_block', pad: 'small', direction: 'row', justify: 'between'},
        loader,
        msg
      ));
  }
}
