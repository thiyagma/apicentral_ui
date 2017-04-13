// SecurityView
import React, { Component } from 'react';
// import {Box, Header, Anchor} from './Grommet';
import Box from 'grommet/components/Box';
// import TextInput from 'grommet/components/TextInput';
import Anchor from 'grommet/components/Anchor';
var CLASS_ROOT = 'securityview';
export default class SecurityView extends Component {

  constructor(props) {
    super(props);
    this.state = { userName: '', password: '' }; //enableUserDetails: false, authLabel: 'Authenticate',
  }
  // _onClickAuthenticate() {
  //   console.log('Authenticate');
  //   this.setState({enableUserDetails: true});
  // }
  _onChangeUsername(event) {
    console.log(event.target.value);
    this.setState({ userName: event.target.value });
  }
  _onChangePassword(event) {
    console.log(event.target.value);
    this.setState({ password: event.target.value });
  }
  _onAuthenticateUser() {
    console.log('Authenticate');
  }
  // _onCancelAuthenticate() {
  //   console.log('Cancel');
  //   this.setState({enableUserDetails: false});
  // }
  _renderAnchor(label, onClickFunc) {
    return React.createElement(
      Anchor,
      { className: CLASS_ROOT + '_item', onClick: onClickFunc },
      label
    );
  }
  _renderTextInput(placeHolder, val, onChangeFunc) {
    var input = (
      <input className={CLASS_ROOT + '_userinput'} type='text' name={placeHolder} id={placeHolder} onChange={onChangeFunc} value={val}/>
    );
    return React.createElement(
      Box,
      { className: CLASS_ROOT + '_textinput', direction: 'row' },
      React.createElement(
        'span',
        {},
        placeHolder
      ),
      input
    );
  }
  render() {

    var userDetails = React.createElement(
      Box,
      { className: CLASS_ROOT + '_userdetails', pad: 'small'},
      this._renderTextInput('Username : ', this.state.userName, this._onChangeUsername.bind(this)),
      this._renderTextInput('Password : ', this.state.password, this._onChangePassword.bind(this))
    );

    return this.props.securityModel ? React.createElement(
      Box,
      { className: CLASS_ROOT},
      React.createElement(
        'h4',
        { className: 'summary'},
        'Security'
      ),
      React.createElement(
        Box,
        { className: CLASS_ROOT + '_innerbox', direction: 'row' },
        'HTTP Basic Authentication',
        this._renderAnchor('Authenticate', this._onAuthenticateUser.bind(this))
      ),
      userDetails
    ) : null;
  }
};
