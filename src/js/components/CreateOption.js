// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, {Component} from 'react';
import {Anchor,  Box, Button, RadioButton, Heading} from '../grommet'; //Label
import Dropzone from 'react-dropzone';
import {TextBox} from '../libs/Input';

import {CREATE_NEW} from '../constants'; //CREATE_UPDATE
import {UpdateCreateType, UploadApiDefination} from '../actions/registerapi';
import {ReadSwaggerJson} from '../actions/swagger';
import Loader from './Loader';

const CLASS_ROOT = "create-options";
class CreateOption extends Component {
  constructor (props) {
    super(props);
    this._onSwaggerOption = this._onSwaggerOption.bind(this);
    this._onSwaggerPublish = this._onSwaggerPublish.bind(this);
    this._renderUploadType = this._renderUploadType.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this.state = {showFileUpload: true, showUrlUpload: false, filepath: '', files: [], fileExt:'', isDisable: true,mask: false};
  }

  componentWillReceiveProps(nextProps) {
    const {registerApi:{UploadApiStatus}} = nextProps;
    if (UploadApiStatus) {
      this.context.router.push('/publishapi/step2');
    }
  }

  _onSwaggerOption(o) {
    this.setState({showFileUpload: (o.target.id == "swaggerf"), showUrlUpload: (o.target.id == "swaggeru"), filepath: ''});
  }

  _onSwaggerPublish() {
    this.state.mask=true;
    const {fileExt, files, showFileUpload, showUrlUpload, filepath} = this.state;
    var options = {fileExt: fileExt, email: this.props.session.email};

    if (showFileUpload && files.length > 0) {
      this.props.dispatch(UploadApiDefination(files, options));
    } else if(showUrlUpload && filepath.length > 0 && TestSwaggerUrl(filepath)) {
      this.props.dispatch(ReadSwaggerJson(filepath, options));
    }

    this.setState({isDisable: true});
  }

  _onDrop(files) {
    this.state.mask=true;

    if (files && files.length > 0) {
      var fr = new FileReader();
      var ext = files[0].name.match(/(\w+)$/);
      fr.readAsText(files[0]);
      var that = this;
      fr.onload = function(e) {
        var lines = e.target.result;
        that.setState({
          files: lines,
          isDisable: false,
          mask: false,
          fileExt: ext? ext[0] :''
        });
      };
    } else {
      this.setState({files: '', isDisable: true,mask:true});
    }
  }

  _onManual() {
    this.props.dispatch(UpdateCreateType(CREATE_NEW));
    this.context.router.push('/publishapi/step2');
  }

  _onChange(e) {
    this.setState({filepath: e.target.value, isDisable: false});
  }

  _renderUploadType() {
    var input = null;

    if (this.state.showFileUpload) {
      // input = (<InputText className={CLASS_ROOT + "_row--input"} id="fileurl" title='Select your Swagger.json/yaml file' name="fileurl" type="file" value={this.state.filepath} fileuploadbox={true} required={true} onChange={this._onChange} />);
      input = (
        <Dropzone className="dropzone" onDrop={this._onDrop}>
          <Box pad="large" align="center" justify="center">Try dropping some files here, or click to select files to upload.</Box>
        </Dropzone>
      );
    } else if (this.state.showUrlUpload) {
      input = (<TextBox className={CLASS_ROOT + "_row--input"} id="fileurl" title='Enter your Swagger.json/yaml Url' name="fileurl" value={this.state.filepath} required={true} onChange={this._onChange} />);
    }

    return input;
  }

  render() {
    var uploadType = this._renderUploadType();
    // var files = this.state.showFileUpload? this.state.files : this.state.filepath;
    var publishaction = this.state.isDisable? null : this._onSwaggerPublish;
    var loading = this.state.mask? React.createElement(Loader, null) : null;

    return (
      <Box pad='none'>
        {loading}
        <Box className={CLASS_ROOT} pad='large' align="start">
          <Heading tag="h3" margin="none"> I have a Existing API </Heading>
          <Box className={CLASS_ROOT + "_row"} direction="row" align="center" justify="start" pad="none">
            <label htmlFor="swagger">Import OPEN API definition from </label>
            <Box direction="row" align="center" justify="start" pad={{horizontal:'small'}}>
              <RadioButton id="swaggerf" name="swagger" label="Swagger file" checked={this.state.showFileUpload} onChange={this._onSwaggerOption}/>
              {/*<RadioButton id="swaggeru" name="swagger" label="Swagger URL" checked={this.state.showUrlUpload} onChange={this._onSwaggerOption}/>*/}
            </Box>
          </Box>
          <Box className={CLASS_ROOT + "_row"} direction="row" align="center" justify="start" pad={{vertical:'small'}}>
            {uploadType}
          </Box>
          <Box className={CLASS_ROOT + "_row"} direction="row" align="center" justify="start" pad={{vertical:'small'}}>
            <Button primary={true} label="Start Publishing" onClick={publishaction}/>
          </Box>
        </Box>
        {/*<Box pad={{horizontal: 'medium', vertical:'large'}} >
          <Anchor label="Go to Manual registration" primary={true} onClick={this._onManual.bind(this)}/>
        </Box>*/}
      </Box>
    );
  }
}

CreateOption.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default CreateOption;

const TestSwaggerUrl = (e) => {
  var ptn = '((?:https?):\/\/[-a-z0-9+&@#\/%?=~_()|!:,.;]*[-a-z0-9+&@#\/%=~_()|])\/swagger.(json|ymal)';
  //'(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])\/swagger.(json|ymal)';
  var rgx = new RegExp(ptn, 'ig');
  var flg = rgx.test(e);
  return flg;
};

