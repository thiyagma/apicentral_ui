import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

class HeaderMenu extends Component {
  
  render() {
    const { nav: { headeritems } } = this.props;
    const links = headeritems.map(page => { return page.type == "button"? 
    (<Button key={page.label} path={page.path} label={page.label} primary={true}/> ) : 
    (<Anchor key={page.label} path={page.path} label={page.label} />)});

    return (
      <Box pad="none" direction="row">
        <Menu responsive={true} direction='row' size='small' align="center">
          {links}
        </Menu>
      </Box>
    );
  }
}


HeaderMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string,
  nav: PropTypes.object
};

const select = state => ({
  nav: state.nav
});

export default connect(select)(HeaderMenu);

