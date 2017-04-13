import React, { Component } from 'react';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import NavControl from './NavControl';
import HeaderMenu from './HeaderMenu';
import SessionMenu from './SessionMenu';
class AppHeader extends Component {
	render() {
		var headerPad = { "horizontal": "medium", "vertical": "small" };
		return (
			<Header direction="row" align="center" justify="between" pad={headerPad} primary={true} colorIndex="light-1" >
				<NavControl />
				<div className="top-menu-left"> 
						<HeaderMenu/>
						</div>
					
					<SessionMenu dropAlign={{ right: 'right' }} />
      </Header>
		);
	}
}

export default AppHeader;

AppHeader.propTypes = {
  responsive: React.PropTypes.string
};
AppHeader.defaultProps = {
  responsive: ""
};
