import React from 'react';

import FormField from 'grommet/components/FormField';
import './MultipleSelector.scss';

class MultipleSelector extends React.Component {
  constructor(props) {
    super(props);

    this.renderSelectedOption = this.renderSelectedOption.bind(this);
    this.removeSelectedOption = this.removeSelectedOption.bind(this);
    this.renderAvailableOption = this.renderAvailableOption.bind(this);
    this.selectAvailableOption = this.selectAvailableOption.bind(this);

    this.state = {
      availableOptions: [],
      selectedOptions: this.props.selectedOptions || [],
      values: props.values || []
    };

    this.value = [];
  }

  componentDidMount() {
    var selectorOptions = [];
    this.props.selectorOptions.map(function(currentValue, index, array) {
      selectorOptions.push(JSON.parse(JSON.stringify(currentValue)));
    });

    this.setState({
      availableOptions: [{label: "", value: ""}].concat(selectorOptions)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectorOptions !== this.props.selectorOptions) {
      var selectorOptions = [];
      this.nextProps.selectorOptions.map(function(currentValue, index, array) {
        selectorOptions.push(JSON.parse(JSON.stringify(currentValue)));
      });

      this.setState({
        availableOptions: [{label: "", value: ""}].concat(selectorOptions)
      }, this.selectedOptionsChanged);
    }
  }

  renderSelectedOption(currentValue, index, array) {
    return (
      <div className="selectedOption" key={index} onClick={this.removeSelectedOption.bind(null, index)}>
        {currentValue.label}
        <span>&#x274C;</span>
      </div>
    );
  }

  removeSelectedOption(index, event) {
    // Delete option from selected option
    var option = this.state.selectedOptions.splice(index, 1)[0];
    // Enable available option
    this.state.availableOptions[option.selectedOptionIndex].disabled = false;

    this.setState({
      availableOptions: this.state.availableOptions,
      selectedOptions: this.state.selectedOptions
    }, this.selectedOptionsChanged);
  }

  renderAvailableOption(currentValue, index, array) {
    return (
      <option key={index} disabled={currentValue.disabled}>{currentValue.label}</option>
    );
  }

  selectAvailableOption(event) {
    if (event.target.selectedIndex === 0) {
      return;
    }

    // Disable available option
    this.state.availableOptions[event.target.selectedIndex].disabled = true;
    // Add option to selected options
    this.state.availableOptions[event.target.selectedIndex].selectedOptionIndex = event.target.selectedIndex;
    this.state.selectedOptions.push(this.state.availableOptions[event.target.selectedIndex]);

    this.setState({
      availableOptions: this.state.availableOptions,
      // availableOptions: availableOptions,
      selectedOptions: this.state.selectedOptions
    }, this.selectedOptionsChanged);

    // Clear selection
    this.refs.select.value = "";
  }

  selectedOptionsChanged() {
    this.value = this.state.selectedOptions.map( (currentValue, index, array) => {
      return currentValue.value;
    });

    if (this.props.onChange) {
      this.props.onChange(this.value, this.props);
    }
  }
  _disableSelectedOption() {
    this.state.availableOptions.map(function (o) {
      for (var i = 0; i < this.state.selectedOptions.length; i++) {
        if(o.label == this.state.selectedOptions[i].label) {
          o.disabled = true;
          break;
        }
      }
    }, this);
  }
  render() {
    // console.log('selectedOptions');
    // console.log(this.props.selectedOptions);
    this._disableSelectedOption();
    return (
      <div className="containerMultipleSelector">
        <FormField label={this.props.label} htmlFor="select">
          <div className="selectedOptions">
            {
              this.state.selectedOptions.map(this.renderSelectedOption)
            }
          </div>
          <select ref="select" id="select" onChange={this.selectAvailableOption.bind(this)}>
            {
              this.state.availableOptions.map(this.renderAvailableOption)
            }
          </select>
        </FormField>
      </div>
    );
  }
};

MultipleSelector.propTypes = {
  label: React.PropTypes.string,
  selectorOptions: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  selectedOptions: React.PropTypes.array
};

// MultipleSelector.defaultProps= {
//   values: []
// }

export default MultipleSelector;
