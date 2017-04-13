import React, { Component, PropTypes } from 'react';
import Section from 'grommet/components/Section';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

import App from 'grommet/components/App';
class Main extends Component {
  constructor(props) {
    super(props);
    this._onResponsive = this._onResponsive.bind(this);
  }

  _onResponsive(responsive) {
    // this.props.dispatch(navResponsive(responsive));
  }

  render() {
    const {responsive} = this.props;
    return (
      <App centered={false}>
        <Section full="vertical" pad="none">
          <AppHeader responsive={responsive} />
          {this.props.children}
          <AppFooter responsive={responsive} />
        </Section>
      </App>
    );
  }
}

Main.propTypes = {
  children: PropTypes.any.isRequired,
  responsive: React.PropTypes.string
};

Main.defaultProps = {
  responsive: "single"
};

export default Main;