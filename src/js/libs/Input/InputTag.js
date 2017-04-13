'use strict';
import React, {Component, PropTypes} from 'react';
const CLASS_ROOT = "input_tag";
class InputTag extends Component {

  constructor (props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onDOMChange = (e) => this.setState({value: e.target.value});

    this.type = 'tag';
    this.ref = "inputtag";
    this.value =  props.tags;
    this.inputType = typeof this.value;
    this.state = {tags: this._resolveTag(props.tags, props.delimiter), delimiter: props.delimiter};

  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log('do validate');
      this.handleAdd();
    }
  }

  handleAdd() {
    this.state.actionType= "add";
    this._onChange();
  }

  handleDelete(e) {
    this.state.itemtoremove = e;
    this.state.actionType = "remove";
    this._onChange();
  }

  _onChange () {
    var {value, tags, delimiter, actionType, itemtoremove} = this.state;
    if (actionType == "add") {
      tags.push(value);
    } else if(tags && tags.length > 0) {
      tags.splice(tags.indexOf(itemtoremove), 1);
    }

    var val = (typeof this.inputType === 'string')? tags.join(delimiter) : tags;
    console.info('val  - >');
    console.info(val);
    this.props.onChange({target: {value: val, type: 'tag' }});
    this.state = {tags: tags, delimiter: delimiter};
    this.setState(this.state);
  }

  _renderTag(tags = []) {
    var _tagClass = CLASS_ROOT + '-list';
    var li = tags.map((t, i) => {
      return (<li className={_tagClass + "_item"} key={i}>
        <span className={_tagClass + "_item--box"}>
          <span className={_tagClass + "_item--label"}> {t} </span>
          <a className={_tagClass + "_item--remove"} onClick={this.handleDelete.bind(this, t)} >x</a>
        </span>
      </li>);
    });
    return (<ul className={_tagClass}> {li} </ul>);
  }

  _resolveTag(tags, delimiter) {
    return tags == undefined? [] : (this.inputType === 'string')? tags.length > 0 ? tags.split(delimiter): [] : tags;
  }

  render() {
    let tagsele;
    const {name, className} = this.props;
    const {tags, value, delimiter} = this.state;
    var classes = [CLASS_ROOT];
    if (className) {
      classes.push(className);
    }
    var _name = name || "text." + Math.random();
    tagsele = this._renderTag(tags, delimiter);
    return (
      <div className={classes.join(' ')}>
        {tagsele}
        <input className='input' id={_name} name={_name} type='text' placeholder="Add tags" onChange={this._onDOMChange} value={value || ''} onKeyPress={this._handleKeyPress}/>
      </div>
    );
  }
}

export default InputTag;

InputTag.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  delimiter: PropTypes.string
};
InputTag.contextTypes = {
  onChange: PropTypes.func
};
InputTag.childContextTypes = {
  onChange: PropTypes.func.isRequired
};
InputTag.defaultProps = {
  delimiter: "|",
  tags: []
};
