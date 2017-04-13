// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, { Component, PropTypes } from 'react';
import { Box, Button, Heading, Layer} from '../grommet';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import InputRow from '../libs/Input/InputRow';
import Loader from './Loader';

import {saveSWAPI, UpdateCreateType, getValueChain, getDataSubject,getCategories} from '../actions/registerapi';
import {CREATE_UPLOAD, CREATE_NEW, CREATE_EDIT, DETAILS_EDIT} from '../constants';
import {merge_object, currentEpoch, IsNullOREmpty, IsArrayNullOREmpty} from '../common';

class CreateNew extends Component {
  constructor(props) {
    super(props);
    const {session} = props;
    this._goBack = this._goBack.bind(this);
    this._validate = this._validate.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onCheckboxChange = this._onCheckboxChange.bind(this);
    this._onInputSelectorChange = this._onInputSelectorChange.bind(this);
    this._multipleSelectorChange = this._multipleSelectorChange.bind(this);
    this._onMetaDataChange = this._onMetaDataChange.bind(this);
    this._onCascadingDropDownChange = this._onCascadingDropDownChange.bind(this);
    this.state = {mask: false};

    this.error = {};
    this.state = {
      author: session.email,
      showConfirm: false,
      update_by: session.email,
      update_ts: currentEpoch(),
      endpoint: {
        name: '',
        url: ''
      },
      repository: {
        name: '',
        url: ''
      },
      license: {
        name: '',
        url: ''
      },
      // license: {},
      // repository: {},
      // endpoint: {},
      metadata: [],
      howtodoc: ''
    };

    this.metadata = {
    };

    this.dropdowns = {
      auth_model: '',
      description_file_type: '',
      status: '',
      environment: '',
      repositoryType: '',
      endpointType: '',
      licenseType: '',
      supported_request_formats: [],
      supported_response_formats: [],
      data_subject: [],
      categories: [],
      value_chain: []
    };

    this.apiform = {
      api_id: undefined,
      auth_model: undefined,
      create_by: undefined,
      create_ts: undefined,
      data_subject: [],
      categories: [],
      description: undefined,
      description_file_type: undefined,
      device_specific: false,
      documentation_url: undefined,
      endpoint: {
        name: undefined,
        url: undefined
      },
      environment: undefined,
      epr_id: undefined,
      is_active: false,
      license: {
        name: undefined,
        url: undefined
     },
      logo: undefined,
      latency: undefined,
      system_of_record: [],
      audience: undefined,
      metadata: [],
      provider: undefined,
      repository: {
        name: undefined,
        url: undefined
      },
      restricted_access: false,
      ssl_support: true,
      status: undefined,
      summary: undefined,
      support_email: undefined,
      supported_request_formats: undefined,
      supported_response_formats: undefined,
      title: undefined,
      update_by: undefined,
      update_ts: undefined,
      value_chain: [],
      version: undefined,
      author: '',
      keyword: '',
      howtodoc: ''
    };
  }

  componentWillMount() {
    let {options, registerApi: {apiDetail, createType}, location: {pathname}} = this.props;
    let _opn = options;
    if (pathname == "/details/edit" && createType == CREATE_UPLOAD) {
      this.context.router.push('#');
    }

    if (createType == DETAILS_EDIT) {
      this.props.dispatch(getValueChain());
      this.props.dispatch(getDataSubject());
      this.props.dispatch(getCategories());
    }

    this.isEdit = createType == CREATE_EDIT || createType == DETAILS_EDIT;
    if (this.isEdit) {

      apiDetail = apiDetail || {};
      this.state = merge_object(this.state, apiDetail);
      //TODO: resting need to remove.
      // this.state = { ...this.state,
      //   update_by: session.email,
      //   update_ts: currentEpoch(),
      //   // support_email: "support@apicatalog.com",
      //   // repository: {
      //   //   name: 'GIT',
      //   //   url: 'http://samplegitrepo.com'
      //   // }
      // };

      if (process.env.NODE_ENV !== 'production') {
        if (!this.state.support_email || this.state.support_email.length < 0) {
          this.state.support_email = "support@apicatalog.com";
        }
        _opn = _opn || {};
        _opn.fileExt = "json";

        if (!this.state.repository || this.state.repository.url < 0) {
          this.state.repository = {
           name: 'GIT',
            url: 'http://samplegitrepo.com'
          };
        }
      }

      if (_opn && _opn.fileExt) {
        this.state.description_file_type = "Swagger" + this.state.swagger + " " + _opn.fileExt.toUpperCase();
      }

      this.dropdowns = {
        auth_model: this.state.auth_model,
        status: this.state.status,
        environment: this.state.environment,
        description_file_type: this.state.description_file_type,
        repositoryType: this.state.repository.name,
        endpointType: this.state.endpoint.name,
        licenseType: this.state.license.name,
        supported_request_formats: [],
        supported_response_formats: [],
        data_subject: [],
        value_chain: [],
        categories:[]
     };


      // bind metadata
      this.state.metadata.forEach((item) => {
        this.metadata[item.name] = item.value;
      }, this);

      ["data_subject", "value_chain","categories"].forEach((key) => {
        if (this.state.hasOwnProperty(key)) {
          if (Array.isArray(this.state[key])) {
            this.dropdowns[key] = this.state[key].map((d) => d.value);
          }
        }
      }, this);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {registerApi: {UpdateApiStatus, createType}} = nextProps;
    this.formType = createType;
    if (UpdateApiStatus) {
      // this.context.router.push('/register/step1');
      this.setState({ showConfirm: true ,mask:true});
    }
  }


  _onChange(event) {
    debugger;
    if (event.id == "endpoint" || event.id == "repository" || event.id == "license") {
      if ("string" === typeof this.state[event.id]) {
        this.state[event.id] = {
          name: '',
          url: ''
        };
      }
      this.state[event.id].url = event.value;
    } else {
      this.state[event.id] = event.value;
    }

    this.setState(this.state);
  }

  _onMetaDataChange(e) {
    if (this.metadata == undefined) {
      this.metadata = {};
    }
    this.metadata[e.id] = e.value;
    this.setState({});
  }

  _multipleSelectorChange(val, e) {
    this.dropdowns[e.id] = val;
  }

  _onCheckboxChange(event) {
    debugger;
    this.setState({
      [event.id]: event.value
    });
  }

  _onCascadingDropDownChange(m, e) {
    debugger;
    if (e && m && m.length > 0) {
      this.dropdowns[e.id] = [];
      for (var i = 0; i < m.length; i++) {
        var d = m[i];
        if (d.selectedIndex == 0) {
          break;
        }
        this.dropdowns[e.id].push(d.selectedvalue);
      }
    }
  }

  _onInputSelectorChange(e) {
    debugger;
    var key = e.id;
    var val = e.value;
    this.dropdowns[key] = val;
  }

  _validate() {
    var flg = true;
    var key;
    this.error = {};
    const check = (key, required, val) => {
      if (required) {
        var flag = Array.isArray(val) ? IsArrayNullOREmpty(val) : IsNullOREmpty(val);
        if (flag) {
          // var msg = title + " is a required.";
          this.error[key] = true;
          flg = false;
        }
      }
    };

    try {
      for (key in this.apiform) {
        if (this.apiform.hasOwnProperty(key)) {
          var ele = this.refs[key];
          if (ele) {
            if (ele.tagType == "text" || ele.tagType == "file" || ele.tagType == "textarea" || ele.tagType == "select" || ele.tagType == "checkbox" || ele.tagType == "tag" || ele.tagType == 'multiselect') {
              check(key, ele.required, ele.value);
              // this.apiform[key] = ele.value;
              if (key == "endpoint" || key == "repository" || key == "license") {
                var keyType = this.refs[key+'type'].value;
                check(key + 'Type', ele.required, keyType);
                this.apiform[key] = { name: keyType, url: ele.value };
              } else {
                this.apiform[key] = ele.value;
              }

              if (key == "support_email") {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!filter.test(ele.value)) {
                  // var msg = ele.title + " is not valid.";
                  this.error[key] = true;
                }
              }
            // } else if (ele.tagType == "select") {
            //   check(key, ele.required, this.dropdowns[key]);
            //   this.apiform[key] = ele.value;
            // } else if (ele.tagType == "checkbox") {
            //   check(key, ele.required, this.dropdowns[key]);
            //   this.apiform[key] = ele.value;
            } else if (ele.tagType == "cascading") {
              this.apiform[ele.name] = ele.value.map((d, i) => {
                return { name: i == 0 ? "category" : "level" + i, "value": d };
              });
            } else if( ele.props.type == "CascadingDropDown") {
              var _data = this.dropdowns[ele.props.id] || [];
              if (ele.props.id == "value_chain") {
                this.apiform[key] = _data.map((d, i) => {
                  return { name: i == 0 ? "category" : "level" + i, "value": d };
                });
              } else {
                this.apiform[key] = _data.map((d, i) => {
                  //return { name: "level" + i, "value": d };
                  return { name: i == 0 ? "category" : "level" + i, "value": d };

                });
              }

            } else if (ele.props.type == "MultipleSelector") {
              check(key, ele.props.required, this.dropdowns[key]);
              this.apiform[key] = this.dropdowns[key].length > 0 ? this.dropdowns[key].join(',') : '';
            }
          } else if (key == "metadata") {
            this.apiform.metadata = [];
            for (var k in this.refs) {
              if (k.match(/metadata/gi)) {
                ele = this.refs[k];
                check(key, ele.props.title, ele.props.required, this.state.metadata[ele.props.id]);
                var obj = { name: ele.props.id, value: ele.props.value };
                this.apiform.metadata.push(obj);
              }
            }
          }
        }
      }
    } catch (error) {
      console.log("%c Error", "color: red");
      console.log("key: " + key);
      console.log(error);
    }
    if (this.error) {
      console.log("%c Error", "color: Orange");
      console.log(this.error);
    }
    // console.log(this.apiform);
    if(!flg) {
          this.state.mask=false;
        } else {
          this.state.mask=true;
        }
        return flg;
      }

 _onSubmit() {

    // if (this.refs) {
    //   var formdata = {};
    //   var obj = this.refs;
    //   for (var key in obj) {
    //     if (obj.hasOwnProperty(key)) {
    //       var ele = obj[key];
    //       //(ele.tagType == "checkbox")? ele.checked :
    //       formdata[ele.name] = ele.value;
    //     }
    //   }

    //   console.log(formdata);
    // }

    // this._validate();
    // console.log(this.apiform);

      if (this._validate()) {
      this.apiform.system_of_record = this.state.system_of_record;
      this.apiform.howtodoc = this.state.howtodoc;
      this.apiform.apiSpecification = this.state.apiSpecification;
      this.apiform = { ...this.apiform,
        update_by: this.props.session.email,
        update_ts: currentEpoch()
      };
      if (this.isEdit) {
        this.apiform = { ...this.apiform,
          create_by: this.state.create_by,
          create_ts: this.state.create_ts
        };
      } else {
        this.apiform = { ...this.apiform,
          create_by: this.props.session.email,
          create_ts: currentEpoch()
        };
        delete this.apiform.api_id;
      }

      console.log(this.apiform);
      this.props.dispatch(saveSWAPI(this.apiform, this.isEdit));

    } else {
      this.setState({});
    }
  }

  _goBack() {
    const {registerApi: {createType}} = this.props;
    var _path = createType == CREATE_UPLOAD ? '/discover' : '/details/view';
    this.props.dispatch(UpdateCreateType(createType));
    this.context.router.push(_path);
  }

  _mutliselectformater(d) {
    var _d = [];
    if (d) {
      _d = d.map((o) => ({value: o, label: o}));
    }
    return _d;
  }
_renderLoading(loading) {
    return React.createElement(
      loading
    );
  }
  render() {
    debugger;
    const {registerApi, auth_model, status, description_file_type, environment} = this.props;
    const {apiDetail: {title, api_id}, valuechain, datasubject, createType,categories} = registerApi;
    const vclist = valuechain.results;
    const dslist = datasubject.results;
    const catlist = categories.results;
    const isTrue=true;
    var loading = this.state.mask? React.createElement(Loader, null) : null;

    // const selectedReqFormat = this._mutliselectformater(this.dropdowns.supported_request_formats);
    // const selectedResFormat = this._mutliselectformater(this.dropdowns.supported_response_formats);
    const showBackBtn = isTrue ? (<Button label={createType == CREATE_NEW ? "Back to File upload" : "go Back"} icon={<LinkPrevious />} onClick={this._goBack}/>) : null;
    
    return (
      <Box ref="createform" pad={{ vertical: 'medium', horizontal: 'large' }} style={{width: "800px"}}>
        {loading}
        <Confirm show={this.state.showConfirm} onClose={this._goBack} title= {title} api_id={api_id}/>
        <InputGroup title="Basic Information">
          <InputRow key="api_id" name="api_id" ref='api_id' title='API Id' type = 'text'  value={this.state.api_id} readonly={true} />
          <InputRow key="epr_id" title='EPR Id' name="epr_id" ref='epr_id' value={this.state.epr_id} required={true}  error={this.error.epr_id}  tooltip="Epr ID (e.x., 123456)"/>
          <InputRow key="title" title='API Name' name="title" ref='title' value={this.state.title} required={true}  error={this.error.title} tooltip="Name of the Api"/>
          <InputRow key="version" title='Version' name="version" ref='version' value={this.state.version}   error={this.error.version} tooltip="Api Version (e.x.,  Version 1)"/>

          <InputRow key="licensetype" title='License Type' name="licensetype" ref="licensetype" type='select'  value={this.dropdowns.licenseType} model={this.props.licenseTypes} onChange={this._onInputSelectorChange} error={this.error.licenseType} required={true} tooltip="License Type Information(e.x., MIT)"/>
          <InputRow key="license" title='License' name="license" ref='license' required={true} value={this.state.license.url}  error={this.error.license} tooltip="Api License (e.x., license information)"/>

          <InputRow key="device_specific" title='Device Specific' name="device_specific" ref='device_specific' type="checkbox" value={this.state.device_specific} onChange={this._onCheckboxChange}/>
          <InputRow key="is_active" title='Is Active' name="is_active" ref='is_active' type="checkbox" value={this.state.is_active} onChange={this._onCheckboxChange}/>
          <InputRow key="environment" title='Environment' name="environment" ref="environment" type='select' value={this.dropdowns.environment} model={environment} required={true} onChange={this._onInputSelectorChange} error={this.error.environment}/>
        </InputGroup>

        <InputGroup title="Industry details">
          <InputRow key="provider" title='Provider' name="provider" ref='provider'  type="text" value={this.state.provider} />
          <InputRow key="description" title='Description' name="description" ref='description' type="textarea" value={this.state.description}  error={this.error.description} tooltip="Description (e.x., Give the description for the api.)"/>
          <InputRow key="summary" title='Summary' name="summary" ref='summary' type="textarea" value={this.state.summary}   error={this.error.summary} tooltip="Summary (e.x., Give the detailed summary for the api.)"/>

          <InputRow key="endpointtype" title='Endpoint Type' ref="endpointtype" name="endpointtype"  type="select" value={this.dropdowns.endpointType} model={this.props.endpointTypes} required={true} onChange={this._onInputSelectorChange} error={this.error.endpointType} tooltip="Endpoint Type Information (e.x., Rest based.)"/>
          <InputRow key="endpoint" title='Endpoint' name="endpoint" ref='endpoint' value={this.state.endpoint.url} required={true}  error={this.error.endpoint} tooltip="URL  (e.x., www.example.com/api)"/>

          <InputRow key="repositorytype" title='Repository Type' name="repositorytype" ref="repositorytype" type="select" required={true} value={this.dropdowns.repositoryType} model={this.props.repositoryTypes} onChange={this._onInputSelectorChange} error={this.error.repositoryType} tooltip="Repository (e.x., GIT or TFS etc)"/>
          <InputRow key="repository" title='Repository' name="repository" ref='repository' value={this.state.repository.url} required={true}  error={this.error.repository} tooltip="URL (e.x., Give the url to clone or download the code.)"/>
          {
           //<InputRow key="value_chain" title='Value Chain' name="value_chain" ref='value_chain' type="cascading" value={this.dropdowns.value_chain} model={vclist}  tooltip="select from the list"/>
          }
          <InputRow key="data_subject" title='Data Subject' name="data_subject" ref='data_subject' type="cascading" value={this.dropdowns.data_subject} model={dslist}  tooltip="select from the list"/>

          <InputRow key="categories" title='Business Data Subject' name="categories" ref='categories' type="cascading" value={this.dropdowns.categories} model={catlist}  tooltip="select from the list"/>

        </InputGroup>

        <InputGroup title="Meta details for api">
          <InputRow id="logo" title='Logo' name="logo" ref='logo' value={this.state.logo} />
          <InputRow key="latency" title='Latency' name="latency" ref='latency'  type="text" value={this.state.latency} />
          <InputRow key="audience" title='Audience' name="audience" ref='audience'  type="text" value={this.state.audience} />
          {/*<InputRow id="system_of_record" title='System Of Record' name="system_of_record" ref='system_of_record' value={this.state.system_of_record} type='tag'
            tooltip="(e.x., node,hapi,api)"/>*/
          }
          <InputRow key="supported_request_formats" title='Supported Request Formats' name="supported_request_formats" ref='supported_request_formats' type="multiselect" value={this.state.supported_request_formats} model={this.props.selectorOptions}  tooltip="select from the list"/>

          <InputRow key="supported_response_formats" title='Supported Response Formats' name="supported_response_formats" ref='supported_response_formats' type="multiselect" value={this.state.supported_response_formats} model={this.props.selectorOptions}  tooltip="select from the list"/>

          <InputRow id="author" title='Author' name="author" ref='author' value={this.state.author} error={this.error.author} readonly={true}/>
          <InputRow id="keyword" title='Keywords' name="keyword" ref='keyword' value={this.state.keyword} type='tag'
            tooltip="(e.x., node,hapi,api)"/>

          <InputRow key="documentation_url" title='Documentation Url' name="documentation_url" ref='documentation_url' value={this.state.documentation_url} />
          <InputRow key="support_email" title='Support Email' name="support_email" ref='support_email' value={this.state.support_email} required={true}  error={this.error.support_email}/>

          <InputRow key="status" title='Status' ref="status"  name="status" type="select" value={this.dropdowns.status} model={status} required={true} onChange={this._onInputSelectorChange} error={this.error.status} tooltip="Status (e.x., created ,Retried etc.)"/>
          <InputRow key="auth_model" title='Auth Model' ref="auth_model" name="auth_model" type="select" value={this.dropdowns.auth_model}  required={true} model={auth_model} onChange={this._onInputSelectorChange} error={this.error.auth_model} tooltip="Authentication  (e.x., OAuth , HTTPBasic etc.)"/>
          <InputRow key="description_file_type" title='Description FileType'  name="description_file_type" ref="description_file_type" type="select"  required={true} value={this.dropdowns.description_file_type} model={description_file_type} onChange={this._onInputSelectorChange} error={this.error.description_file_type} tooltip="File Type (e.x., YAML, JSON etc.)"/>

        </InputGroup>
        <Box direction="row" align="center" justify="start" pad="none">
          {showBackBtn}
          <Button label="Save" onClick={this._onSubmit}  primary={true} />
        </Box>
      </Box>
    );
  }
}

export default CreateNew;
// let select = (state) => state;
// export default connect(select)(CreateNew);

CreateNew.propTypes = {
  viewtype: PropTypes.oneOf(["create", "edit"]),
  selectorOptions: PropTypes.array,
  repositoryTypes: PropTypes.array,
  endpointTypes: PropTypes.array,
  licenseTypes: PropTypes.array
};

CreateNew.defaultProps = {
  endpointTypes: [{ name: "REST", value: "1" }, { name: "SOAP/HTTP", value: "2" }],
  repositoryTypes: [{ name: "GIT", value: "1" }, { name: "TFS", value: "2" }],
  licenseTypes: [
    { name: "Apache 2.0", value: "Apache 2.0" },
    { name: "MIT", value: "MIT" }
  ],
  selectorOptions: [
    { label: "JSON", value: "JSON" },
    { label: "CSV", value: "CSV" },
    { label: "Avro", value: "Avro" },
    { label: "XML", value: "XML" }
  ],
  status: [{ name: "Created", value: "Created" }, { name: "Retired", value: "Retired" }, { name: "Depricated", value: "Depricated" }, { name: "Published", value: "Published" }],
  environment: [{ name: "Development", value: "Development" }, { name: "Staging", value: "Staging" }, { name: "Production", value: "Production" }, { name: "Sandbox", value: "Sandbox" }],
  description_file_type: [{ name: "Swagger2.0 YAML", value: "Swagger2.0 YAML" }, { name: "Swagger2.0 JSON", value: "Swagger2.0 JSON" }], //, { name: "Swagger1.0 YAML", value: "3" }, { name: "Swagger1.0 JSON", value: "4" }, { name: "WSDL", value: "5" }
  auth_model: [{ name: "None", value: "None" }, { name: "App ID", value: "App ID" }, { name: "API Key", value: "API Key" }, { name: "HTTP Basic Auth", value: "HTTP Basic Auth" }, { name: "OAuth 1", value: "OAuth 1" }, { name: "OAuth 2", value: "OAuth 2" }, { name: "SAML", value: "SAML" }, { name: "WS-Security", value: "WS-Security" }, { name: "Unspecified", value: "Unspecified" }],
  viewtype: "create"
};

CreateNew.contextTypes = {
  router: React.PropTypes.object.isRequired,
  intl: React.PropTypes.object.isRequired
};

class InputGroup extends Component {
  render() {
    const {title, uppercase} = this.props;
    return (
      <Box pad={{ vertical: 'medium', horizontal: 'none' }}>
        <Heading tag="h6" strong={true} uppercase={uppercase || true}> {title} </Heading>
        <Box> {this.props.children} </Box>
      </Box>
    );
  }
}

const Confirm = ({show, onClose, title, api_id}) => {
  if (show) {
    return (
      <Layer onClose={onClose.bind(this)} closer={true}>
        <Box pad="large">
          {title ? 'Api Name: ' + title : 'Api Id: ' + api_id} has being SUCCESSFUllY save.
        </Box>
      </Layer>
    );
  } else {
    return null;
    this.state.mask=false;
  }
};

        // <InputRow key="categories" title={this.context.intl.formatMessage({id:'CATEGORIES', defaultMessage: "Categories"})} name="categories" ref='categories' type="cascading" value={this.dropdowns.categories} model={catlist}  
        //     tooltip={this.context.intl.formatMessage({id:'CATEGORIES_TOOLTIP', defaultMessage: "select from the list"})}/>
//  <InputRow key="value_chain" title={this.context.intl.formatMessage({id:'VALUE_CHAIN', defaultMessage: "Value Chain"})} name="value_chain" ref='value_chain' type="cascading" value={this.dropdowns.value_chain} model={vclist}  
//           tooltip={this.context.intl.formatMessage({id:'VALUE_CHAIN_TOOLTIP', defaultMessage: "select from the list"})}/>
//           <InputRow key="data_subject" title={this.context.intl.formatMessage({id:'DATA_SUBJECT', defaultMessage: "Data Subject"})} name="data_subject" ref='data_subject' type="cascading" value={this.dropdowns.data_subject} model={dslist}  
//             tooltip={this.context.intl.formatMessage({id:'DATA_SUBJECT_TOOLTIP', defaultMessage: "select from the list"})}/>

