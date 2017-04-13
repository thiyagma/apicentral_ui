import React, {Component, PropTypes} from 'react';

const CLASS_ROOT = "input_checkbox";
class InputCheckBox extends Component {
  constructor(props) {
    super(props);
    this._onDOMChange = this._onDOMChange.bind(this);
    this.state = { checked: props.checked };
  }

  _onDOMChange(e) {
    this.props.onChange(e);
    this.setState({checked: e.target.checked});
  }
  render () {
    const {className, name} = this.props;
    var classes = [CLASS_ROOT];
    // let items = null;
    if (className) {
      classes.push(className);
    }
    return (
      <div className={classes.join(' ')}>
        <input id={name} className="checkbox" type="checkbox" name={name} checked = {this.state.checked} onClick={this._onDOMChange}/>
      </div>
    );
  }
}

InputCheckBox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool
};

InputCheckBox.defaultProps = {
  checked: false
};

export default InputCheckBox;
