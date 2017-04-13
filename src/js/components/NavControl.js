// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Title from 'grommet/components/Title';
import Logo from './APILogo';
import Anchor from 'grommet/components/Anchor';
import { navActivate } from '../actions/nav';
import Image from 'grommet/components/Image';



const CLASS_ROOT = "nav-bar";

class NavControl extends Component {
  render() {
    const { name, nav: { active } } = this.props;
    //const {headerStyle, footerStyle, index: {logo, logoStyle, license}, nav: {navmenu}} = this.props;

    let result;
    const title = <Title><Anchor href="/">{name || 'Api Catalog Grommet Ui'}</Anchor></Title>;
    if (active) {
      result = (
        <Button onClick={() => this.props.dispatch(navActivate(true))}>
          <Box direction='row' responsive={false}
            pad={{ between: 'small' }}> 
            <Anchor href="/">
              {/*<Logo className={CLASS_ROOT + "_logo"}/>*/}
              <Image src='/img/Api_Central_Logo.png' size="xsmall" className={CLASS_ROOT + "_logo"} />
            </Anchor>
          </Box>
        </Button>
      );
    } else {
      result = title;
    }
    return result;
  }
}

NavControl.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string,
  nav: PropTypes.object
};

const select = state => ({
  nav: state.nav
});

export default connect(select)(NavControl);
