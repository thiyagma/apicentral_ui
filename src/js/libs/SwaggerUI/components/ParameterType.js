import React, { Component, PropTypes } from 'react';
import {TableRow} from './Grommet';
import SignatureView from './SignatureView';
import ContentType from './ContentType';
var CLASS_ROOT = 'parametertype';
export default class ParameterType extends Component {
  constructor (props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._onContentTypeChange = this._onContentTypeChange.bind(this);
    // this.state = []; //{file:null, ContentType: null, body: ''};
    var val;
    if(props.model.type === "string") {
      val = props.model.defaultVal || "";
    } else if(props.model.type === "integer") {
      val = props.model.defaultVal || 0;
    } else {
      val = props.model.defaultVal;
    }
    this.state = {value: val};
  }

  _onChange (event) {

    var obj = {
      id: this.props.model.name,
      value: event.target.value,
      paramType: this.props.model.paramType
    };
    if (this.props.onChange) {
      this.props.onChange(obj);
    }

    this.setState({value: event.target.value});
  }
  _onContentTypeChange(event) {
    // var obj = {
    //   id: parameterContentType,
    //   ContentType: event.target.value
    // };

    // console.log(obj);
  }

  _renderParam(model, isRequired) {
    var {name, isBody, isFile, valueId, defaultVal, description, paramType, signatureModel} = model;
    var id = valueId;
    var ele = [];
    ele.push(<td key={id + '.1'} className='code'> <label key={id + '.1.1'}  htmlFor={id}>{name}</label></td>);
    var ele1 = [];
    if (isBody) {
      if(isFile) {
        ele1.push(<input key={id + '.2.1'} type="file" name={name} id={id} onChange={this._onChange}/>);
        if (!isRequired) {
          ele1.push(<ContentType title="Parameter Content Type" key={id + '.2.2'} model={model.contentTypeModel.consumes} onChange={this._onContentTypeChange}/>);
        }
      } else {
        if (defaultVal) {
          ele1.push(<div key={id + '.2.1'} className="editor_holder"></div>);
          if (isRequired) {
            ele1.push(<textarea key={id + '.2.2'} className='body-textarea required' placeholder='(required)' name={name} id={id} value={this.state.value} onChange={this._onChange}>{defaultVal}</textarea>);
          } else {
            ele1.push(<textarea key={id + '.2.2'} className='body-textarea' name={name} id={id} value={this.state.value} onChange={this._onChange}>{defaultVal}</textarea>);
          }
          ele1.push(<br  key={id + '.2.3'} />);
          ele1.push(<ContentType title="Parameter Content Type" key={id + '.2.4'} model={model.contentTypeModel.consumes} onChange={this._onContentTypeChange}/>);
        } else {
          if (isRequired) {
            ele1.push(<textarea key={id + '.2.1'} className='body-textarea required' placeholder='(required)' name={name} id={id} value={this.state.value} onChange={this._onChange}></textarea>);
          } else {
            ele1.push(<textarea key={id + '.2.1'} className='body-textarea' name={name} id={id} value={this.state.value} onChange={this._onChange}></textarea>);
          }
          ele1.push(<div key={id + '.2.2'} className="editor_holder"></div>);
          ele1.push(<br key={id + '.2.3'} />);
          ele1.push(<ContentType title="Parameter Content Type" key={id + '.2.4'} model={model.contentTypeModel.consumes} onChange={this._onContentTypeChange}/>);
        }
      }
    } else {
      if(isFile) {
        if (isRequired) {
          ele1.push(<input key={id + '.2.1'} className='required' type="file" name={name} id={valueId} value={this.state.value} onChange={this._onChange}/>);
        } else {
          ele1.push(<input key={id + '.2.1'} type="file" name={name} id={valueId} value={this.state.value} onChange={this._onChange}/>);
        }
        ele1.push(<ContentType title="Parameter Content Type" key={id + '.2.2'} model={model.contentTypeModel.consumes} onChange={this._onContentTypeChange}/>);
      } else {
        //TODO
        if (isRequired) {
          ele1.push(<input key={id + '.2.3'} className='required' type="text" placeholder='(required)' value={this.state.value} name={name} id={valueId} onChange={this._onChange}/>);
        } else {
          ele1.push(<input key={id + '.2.3'} type="text" name={name} id={valueId} value={this.state.value} onChange={this._onChange}/>);
        }

      }
    }

    ele.push(<td key={id + '.2'}>{ele1}</td>);
    ele.push(<td key={id + '.3'} className='markdown'>{description}</td>);
    ele.push(<td key={id + '.4'}>{paramType}</td>);
    ele.push(<td key={id + '.5'}><SignatureView key={valueId + '.5.1'} model={signatureModel} /></td>);
    //{this._renderSignature(signatureModel)}
    console.log(ele);

    return ele;
  }
  _renderParamList(model) {
    var {allowableValues, valueId, name, description, paramType, signatureModel} = model; //isBody, isFile, defaultVal,
    var id = valueId;
    var ele = [];
    ele.push(<td key={id + '.1'} className='code'> <label key={id + '.1.1'} htmlFor={id}>{name}</label></td>);
    var ele1 = [];
    ele1.push(<option key={id + '.2.1.0'}> select one </option>);
    if (allowableValues) {
      if (allowableValues.descriptiveValues) {
        allowableValues.descriptiveValues.map(function(item, i) {
          ele1.push(<option key={id + '.2.1.' + i+1}>{item.value}</option>);
        });
      }
    }
    ele.push(<td key={id + '.2'}> <select key={id + '.2.1'} className= {CLASS_ROOT + '_select'} onChange={this._onChange} value={model.defaultVal}>{ele1}</select></td>);
    ele.push(<td key={id + '.3'} className='markdown'> {description}</td>);
    ele.push(<td key={id + '.4'}> {paramType}</td>);
    ele.push(<td key={id + '.5'}><SignatureView key={id + '.5.1'} model={signatureModel} /></td>);
    return ele;
  }
  _renderParamReadOnly(model, isrequired) {
    isrequired = isrequired || false;
    var {name, isBody, valueId, defaultVal, description, paramType, signatureModel} = model; //isFile,
    var id = valueId;
    var ele1 = [];
    if (isBody) {
      if (isrequired) {
        ele1.push(<textarea key={id + '.2.1'} readOnly='readonly' placeholder='(required)' className='body-textarea' name={name} id={id}>{defaultVal}</textarea>);
      } else {
        ele1.push(<textarea key={id + '.2.1'} className='body-textarea' name={name} id={id}>{defaultVal}</textarea>);
      }
      if (!isrequired) {
        ele1.push(<ContentType title="Parameter Content Type" key={id + '.2.2'} model={model.contentTypeModel.consumes}/>);
      }

    } else {
      if(defaultVal) {
        ele1.push(<span> defaultVal </span>);
      }
    }

    var ele = [];
    ele.push(<td key={id + '.1'} className='code'> <label key={id + '.1.1'} htmlFor={id}>{name}</label></td>);
    ele.push(<td key={id + '.2'}>{ele1}</td>);
    ele.push(<td key={id + '.3'} className='markdown'> {description}</td>);
    ele.push(<td key={id + '.4'}> {paramType}</td>);
    ele.push(<td key={id + '.5'}><SignatureView model={signatureModel} /></td>);
    return ele;
  }

  render() {

    var row = null;
    const {model} = this.props;

    if (model.isList) {
      row = this._renderParamList(model);
    } else {
      if (this.readOnly) {
        if (model.required) {
          // view = "param_readonly_required";
          // return Handlebars.templates.param_readonly_required;
          row = this._renderParamReadOnly(model, true);
        } else {
          // view = "param_readonly";
          // return Handlebars.templates.param_readonly;
          row = this._renderParamReadOnly(model);
        }
      } else {
        if (model.required) {
          // view = "param_required";
          // return Handlebars.templates.param_required;
          row = this._renderParam(model, true);
        } else {
          row = this._renderParam(model);
        }
      }
    }

    return (<TableRow>{row}</TableRow>);
  }
};

ParameterType.proptypes = {
  onChange: PropTypes.func,
  onContentTypeChange: PropTypes.func
};
