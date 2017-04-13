import React, {Component} from 'react';
import Box from 'grommet/components/Box';
const CLASS_ROOT = "input-div";

class InputDiv extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount () {
    // if (!isRegistered("div-box")) {
    //   document.registerElement("div-box", {
    //     prototype: Object.create(HTMLElement.prototype)
    //   });
    // }
  }
  

  render() {
    const {className, children} = this.props;
    let classes = [CLASS_ROOT];

    if (className) {
      classes.push(className);
    }

    // let style = {
    //   display: "block"
    // }
    return (
      <Box className={classes.join(' ')} {...this.props}>
        {children}
      </Box>
    );
  }
}

export default InputDiv;

// const isRegistered = (name) => {
//   return document.createElement(name).constructor.__proto__ === window.HTMLElement;
// };
