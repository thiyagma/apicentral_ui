import React, { Component } from 'react';

// Grommet Components
import Footer from 'grommet/components/Footer';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';

//---------------------------------------------------------------------------------------------------------------------------
// This component renders a responsive footer with legally required links
//
export default class AppFooter extends Component {
  constructor() {
    super();
    this._thisYear = (new Date).getFullYear();
  }

  render() {

    return (
      <Footer appCentered={false} separator="top" fixed={true} className="footer-bg" >
        <Box direction="row" justify="center" pad={{ vertical: 'small', horizontal: 'large', between: 'medium' }}>
          <Box> &copy; {this._thisYear} Hewlett Packard Enterprise Development LP</Box>
          <Box><Anchor href="https://www.hpe.com/us/en/legal/privacy.html" size="small">Privacy</Anchor></Box>
          <Box><Anchor href="http://www8.hp.com/us/en/hpe/legal/terms-of-use.html" size="small">Terms of Use</Anchor></Box>
          <Box><Anchor href="https://www.hpe.com/us/en/legal/privacy.html#accordion-accordioncontainerco-10" size="small">Cookies</Anchor></Box>
        </Box>
      </Footer>
    );
  }
}

AppFooter.propTypes = {
  responsive: React.PropTypes.string
};
AppFooter.defaultProps = {
  responsive: ""
};
