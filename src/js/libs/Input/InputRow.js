'use strict';

import React, {Component, PropTypes} from 'react';
// import './scss/index.scss';
import {InputGroupBox, TextBox, SelectBox, InputCheckBox, TagInput, InputHelp, InputDiv} from './';
import MultipleSelector from '../MultipleSelector/MultipleSelector';
import CascadingDropDown from '../CascadingDropDown';

const CLASS_ROOT = "input_row";
class InputRow extends Component {
  constructor (props) {
    super(props);
    this._onDOMChange = this._onDOMChange.bind(this);
    this._resolveSelect = this._resolveSelect.bind(this);
    const {name, value, suggestions, type, required} = props;
    this.state = { value: value, suggestions: suggestions || [] };
    this.name = name;
    this.value = value;
    this.tagType = type;
    this.required = required;
  }
  _onDOMChange(e, f) {
    this.value = (this.tagType == "checkbox")? e.target.checked : (this.tagType== "select")? this._resolveSelect(e.target) : (this.tagType == 'multiselect')? e.join(',') : (this.tagType == 'cascading')? this._onCascadingDropDownChange(e, f) : e.target.value;
  }

  _onCascadingDropDownChange(m, e) {
    var val = [];
    if (e && m && m.length > 0) {
      for (var i = 0; i < m.length; i++) {
        var d = m[i];
        if (d.selectedIndex == 0) {
          break;
        }
        val.push(d.selectedvalue);
      }
    }
    return val;
  }

  _resolveSelect(e) {
    var {model} = this.props;
    var tmp = null;
    if (model) {
      tmp = model.find(x => x.value == e.value);
    }
    return tmp? tmp.name : null;
  };

  render() {
    let {type, name, title, required, tooltip, value, model, error, readonly,disabled, errMsg} = this.props;
    let eleclass = 'input_' + type;
    if (!name) {
      name = 'Input.' + Math.random();
    }
    var classes = [CLASS_ROOT];
    var labelClasses = ['input_label'];
    // let ifRequired = null;
    let errormsg;

    if (error) {
      classes.push(CLASS_ROOT + '--error');
      eleclass += '--error';
      if(errMsg){
         errormsg = (<span className="error"> {errMsg} </span>);  
      }
      else {
        errormsg = (<span className="error"> "You can't leave this empty." </span>);
      }
    }

    if (required) {
      labelClasses.push(labelClasses.join('') + '--required');
    }

    let ele;
    switch (type) {
      case "textarea":
      case "text":
        ele = (<TextBox className={eleclass} name={name} type={type} value={value} disabled={disabled} readonly={readonly} onChange={this._onDOMChange}/>);
        break;
      case "select":
        ele = (<SelectBox className={eleclass} name={name} value={value} model={model} onChange={this._onDOMChange}/>);
        break;
      case "checkbox":
        ele = (<InputCheckBox className={eleclass} name={name} checked={value} onChange={this._onDOMChange}/>);
        break;
      case "tag":
        ele = (<TagInput className={eleclass} id={name} name={name} tags={value} onChange={this._onDOMChange}/>);
        break;
      case "multiselect":
        var _val = value && value.length > 0 ? value.split(',') : [];

        ele = (<MultipleSelector className={eleclass} id={name} selectorOptions={model || []} ref={name}
                // Callback for changes
                onChange={this._onDOMChange} selectedOptions={_val.map((a) => ({label: a, value: a}))} />);
        break;
      case "cascading":
        ele = (<CascadingDropDown className={eleclass} id={name} model={model || []} ref={name}
                // Callback for changes
                onChange={this._onDOMChange} value={value} />);
        break;
      default:
        ele = null;
        break;
    }

    return (
      <InputGroupBox className={classes.join(' ')}>
        <label htmlFor={name} className={labelClasses.join(' ')}> {title} </label>
        <InputDiv pad="none">
          <InputDiv className={CLASS_ROOT + '--box'} direction="row" align="start" justify="between">
            {ele}
            <InputHelp tooltip={tooltip}/>
          </InputDiv>
          {errormsg}
        </InputDiv>
      </InputGroupBox>
    );
  }
}

export default InputRow;

InputRow.propTypes = {
  className: PropTypes.string,
  isReadOnly: PropTypes.bool,
  tooltip: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool]),
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'file', 'textarea', 'select', 'checkbox', 'tag', 'multiselect', 'cascading'])
};

InputRow.defaultProps = {
  isReadOnly: false,
  required: false,
  type: 'text',
  accept: ".json"
};

