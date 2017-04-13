import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Loader from './Loader';
import { login } from '../actions/session';

class Login extends Component {
  componentWillMount() {
    this.props.dispatch(login("/"));
  }
  render() {
    return (
      <div>
        <Loader />
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const select = state => state;
export default connect(select)(Login);
