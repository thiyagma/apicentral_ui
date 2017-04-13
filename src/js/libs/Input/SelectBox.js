'use strict';
import React, {Component, PropTypes} from 'react';

const CLASS_ROOT = "input_select";
class SelectBox extends Component {
  constructor(props) {
    super(props);
    this._onDOMChange = this._onDOMChange.bind(this);
    this.state = { value: props.value };
    this.type = "select";
  }

  _onDOMChange(e) {
    // e.type = this.type;
    this.props.onChange(e);
    this.setState({value: e.target.value});
  }

  render () {
    const {className, name, model} = this.props;
    var classes = [CLASS_ROOT];
    let items = [];
    if (className) {
      classes.push(className);
    }

    if (model) {
      items = model.map((m, i) => {
        var opn = null;
        if (typeof m == "sring") {
          var k = m || 'opn.' + Math.random();
          opn = optionElement({key: k+i, value: m, name: m});
          //(<option key={m+i} value={m}> {m} </option>);
        } else {
          m.key = m.value || 'opn.' + Math.random();
          opn = optionElement(m);
          // opn = (<option key={k+i} value={m.value}> {m.name} </option>);
        }
        return opn;
      }, this);

      var selectOne = optionElement({key: name + ".000", value: '', name: 'select one'});
      items.splice(0, 0, selectOne);
    }
    return (
      <select className={classes.join(' ')} type="select" id={name} name={name} onChange={this._onDOMChange} value={this.state.value}>
        {items}
      </select>
    );
  }
}

SelectBox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  model: PropTypes.array,
  value: PropTypes.any
};

export default SelectBox;

const optionElement = (m) => (<option key={m.key} value={m.value}> {m.name} </option>);


