import React, {Component, PropTypes} from 'react';
import {Article, Box, Header, Heading} from '../grommet';
import HeaderMenu from './HeaderMenu';
const CLASS_ROOT = "app-panel";
class AppPanel extends Component {
  constructor (props) {
    super(props);

    this.BoxStyle = {
      direction: "column"
    };
    
    this.HeadStyle = {
      separator: "bottom",
      size: "large",
      // colorIndex: "light-1",
      justify: "between"
    };
  }

  
  componentWillMount() {
    const {bodyStyle, headerStyle} = this.props;
    if (bodyStyle) {
      for (var attr in bodyStyle) {
        this.BoxStyle[attr] = bodyStyle[attr];
      }
    }

    if (headerStyle) {
      for (var attr in headerStyle) {
        this.HeadStyle[attr] = headerStyle[attr];
      }
    }
  }
  
  render() {
    let classess = [CLASS_ROOT];
    const {className, title, context, primary, children} = this.props;
    let head = <span />;
    if (title) {
      head = (<Heading tag="h2" margin="none">{title}</Heading>);
    }

    if (className) {
      classess.push (className);
    }

    return (
      <Article className={classess.join(' ')} primary={primary}>
        <Header {...this.HeadStyle}>
          {context}
          {head}
          {
          // <HeaderMenu />
          }
        </Header>
        <Box full={true} ref='content' {...this.BoxStyle}>
          {children}
        </Box>
      </Article>
    );
  }
}

AppPanel.propTypes = {
  title: PropTypes.string,
  context: PropTypes.element,
  headerStyle: PropTypes.shape({colorIndex: PropTypes.string}),
  bodyStyle: PropTypes.shape({colorIndex: PropTypes.string, direction: PropTypes.oneOf(['row', "column"])})
};

AppPanel.defaultProps = {
  primary: true,
  headerStyle: {
    pad: {horizontal: 'large'}
  },
  bodyStyle: {
    // colorIndex: "light-1",
    pad: 'none'
  }
};

export default AppPanel;
