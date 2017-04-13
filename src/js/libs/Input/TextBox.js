'use strict';

import React, {Component, PropTypes} from 'react';
// import InputHelp from './InputHelp';
// import TextInput from './TextInput'; //'Grommet/components/TextInput';

const CLASS_ROOT = "input";
class TextBox extends Component {
  constructor (props) {
    super(props);
    this._onDOMChange = (e) => this.props.onChange(e);
    const {value} = props;
    this.state = {defaultValue: value || ''};
  }

  render () {
    const {name, className, readonly, type, disabled} = this.props;
    var classes = [CLASS_ROOT + '_' + type];
    if (className) {
      classes.push(className);
    }

    var _name = name || "text." + Math.random();
    return type == 'text' ?
      (<input id={_name} className={classes.join(' ')} type={type} disabled={disabled} readOnly={readonly} defaultValue={this.state.defaultValue} name={_name} value={this.state.value} onChange={this._onDOMChange}/>) :
      (<textarea id={_name} className={classes.join(' ')} readOnly={readonly} defaultValue={this.state.defaultValue} name={_name} value={this.state.value} onChange={this._onDOMChange} />);
  }
}

export default TextBox;


TextBox.propTypes = {
  readOnly: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number]),
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'file', 'textarea'])
  // accept: PropTypes.oneOf(['.json','*.json', '.yaml','*.yaml'])
};


TextBox.defaultProps = {
  required: false,
  required: false,
  type: 'text'
  // accept: ".json"
};
