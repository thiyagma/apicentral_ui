// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, {Component, PropTypes} from 'react';
import {Box} from '../grommet';
// import HelpIcon from 'grommet/components/icons/base/Help';

const CLASS_ROOT = "inputcomponent";
// const REF = "CUSTOMSELECT";
class CascadingDropDown extends Component {
  constructor() {
    super();
    this._initValue = this._initValue.bind(this);
    this.state = { selectCtrl: [] };
  }
  componentWillMount() {
    this._initValue(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._initValue(nextProps);
  }

  _initValue(props) {
    if (props.model && props.model.length > 0) {
      var defaultval = { id: 0, children: props.model, selectedvalue: "0", selectedIndex: 0 };
      if (props.value && props.value.length > 0) {
        this.state.selectCtrl = [defaultval];
        props.value.forEach((data, idx) => {
          if (this.state.selectCtrl[idx]) {
            var _data = this.state.selectCtrl[idx];
            for (var i = 0; i < _data.children.length; i++) {
              var child = _data.children[i];
              if (child.name == data) {
                this.state.selectCtrl[idx].selectedIndex = i + 1;
                this.state.selectCtrl[idx].selectedvalue = data;
                if (child.children && child.children.length > 0) {
                  this.state.selectCtrl.push({ id: idx + 1, children: child.children, selectedvalue: "", selectedIndex: 0 });
                }
                break;
              }
            }
          }
          // console.log(idx, this.state.selectCtrl);
        }, this);
      } else {
        this.setState({ selectCtrl: [defaultval] });
      }
    }
  }
  _onChange(event) {
    var ctrl = event.target;
    var tmp = [];
    for (var i = 0; i < this.state.selectCtrl.length; i++) {
      var ele = this.state.selectCtrl[i];
      if (ctrl.id == ele.id) {
        ele.selectedIndex = ctrl.selectedIndex;
        ele.selectedvalue = ctrl.value;
        tmp.push(ele);
        if (ele.children) {
          for (var j = 0; j < ele.children.length; j++) {
            if (ele.children[j].name == ctrl.value && ele.children[j].children && ele.children[j].children.length > 0) {
              var obj = { id: ele.id + 1, children: ele.children[j].children, selectedvalue: "0", selectedIndex: 0 };
              tmp.push(obj);
            }
          }
        }
        break;
      } else {
        tmp.push(ele);
      }
    }
    if (this.props.onChange) {
      this.props.onChange(tmp, this.props);
    }

    this.setState({ selectCtrl: tmp });
  }

  _renderSelect(data) {
    var id = data.id;
    var items = data.children.map(returnOpts, this);
    return React.createElement(Select, { key: id, id: id, options: items, value: data.selectedvalue, onChange: this._onChange.bind(this) });
  }

  render() {
    var selects = this.state.selectCtrl.map(this._renderSelect, this);
    var {id, title, required, className, validationText} = this.props;

    id = id || 'input.' + Math.random();
    // var ifRequired;
    // var errmsg = null;
    // var errcss = '';
    if (!title) {
      title = '';
    }
    if (!className) {
      className = '_text';
    }

    if (validationText) {
      errmsg = (<span className="error"> {validationText} </span>);
      errcss = " error";
    }

    if (required) {
      ifRequired = (<strong className={CLASS_ROOT + '_required'}>*</strong>);
    }

    return (<Box key={id} pad="none" className={CLASS_ROOT}> {selects} </Box>);

    // (
    //   {
    //   // <Box direction="row" pad="small" align="center" justify="between" className={CLASS_ROOT}>
    //   //   <label htmlFor={id} className={CLASS_ROOT + '_label' + errcss}> {title} {ifRequired} </label>
    //   //   <Box align="center" justify="center" pad={{ horizontal: 'medium' }}>
    //   //     {errmsg}
    //   //     <Box direction="row" align="center" justify="between">
    //   //       <Box direction="row" className={CLASS_ROOT + "_select--box"} align="center" justify="between">
    //   //         <div ref={REF} className={CLASS_ROOT + "_select" + errcss}> {selects} </div>
    //   //       </Box>
    //   //       <Box className={CLASS_ROOT + "_help"} pad={{horizontal: "small"}}>
    //   //         <a title={this.props.tooltip || ''}><HelpIcon className={this.props.tooltip? '': CLASS_ROOT + "_help--hide"}/> </a>
    //   //       </Box>
    //   //     </Box>
    //   //   </Box>
    //   // </Box>

    //   }

    // );
  }
}

CascadingDropDown.propTypes = {
  mdoel: PropTypes.array,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func
};

export default CascadingDropDown;


let returnOpts = (m) => m.name;

const Options = ({id, display, value}) => {
  return (
    <option key={id} value={value}> {display} </option>
  );
};

const Select = ({id, options, value, onChange}) => {
  var opts = options || [];
  var selectone = React.createElement(
    Options,
    { key: 'opt.' + id + Math.random(), display: 'select one', value: 'select' }
  );

  var items = [selectone];

  opts.forEach((o, i) => {
    var itm;
    if (typeof o === 'object') {
      itm = React.createElement(
        Options,
        { key: 'opt.' + id + Math.random(), display: o.name, value: o.children }
      );
    } else {
      itm = React.createElement(
        Options,
        { key: 'opt.' + id + Math.random(), display: o, value: o }
      );
    }
    items.push(itm);
  });
  return (
    <select className={CLASS_ROOT + '_select'} key={id} id={id} onChange={onChange} value={value}>
      {items}
    </select>
  );
};

CascadingDropDown.defaultProps = {
  required: false
};
