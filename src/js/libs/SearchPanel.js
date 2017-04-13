// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, { Component, PropTypes } from 'react';
import {Anchor, Box, Search, RadioButton, Layer, Heading} from "../grommet";
import SearchIcon from 'grommet/components/icons/base/Search';

const CLASS_ROOT = "search-panel";
class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this._onDOMChange = this._onDOMChange.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onOptionChange = this._onOptionChange.bind(this);
    this._onShowSearch = this._onShowSearch.bind(this);
    this._onClose = this._onClose.bind(this);
    this.state = {
      value: props.value || "",
      simpleSuggestions: [],
      richSuggestions: [],
      option: props.selectedOption || "",
      active: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value || ""
    });
  }

  _onClose(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({ active: null });
  }

  _onShowSearch() {
    this.setState({ active: true });
  }

  _onDOMChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  _onSearch(e) {
    if (e.key == "Enter" && this.props.onSearch) {
      var obj = { text: this.state.value, selectedfilter: this.state.option };
      this.props.onSearch(obj);
    }
  }

  _onOptionChange(e) {
    this.setState({ option: e });
  }

  _rendersearchoption(items, action, option) {
    var itms = items || [];
    return React.createElement(
      Box, { className: CLASS_ROOT + "_options", direction: this.props.inline ? "row" : "column", pad: "none", align: this.props.inline ? "center" : "start" },
      itms.map(function (itm, i) {
        return React.createElement(
          RadioButton,
          { key: i, id: itm.id, name: "choice", label: itm.name, onChange: action.bind(this, itm.id), checked: option == itm.id }
        );
      })
    );
  }

  _renderSearchBlock() {
    const {options} = this.props;
    var searchcontainer = this._rendersearchoption(options, this._onOptionChange, this.state.option);
    var _sch =
    // React.createElement(
    //   Box, { direction: "row" },
      React.createElement(
        Search, {
          className: CLASS_ROOT + "_search", inline: true, size: "medium", placeHolder: "search", fill: true, responsive: false,
          value: this.state.value, suggestions: this.state.simpleSuggestions, onDOMChange: this._onDOMChange
        }
      // )
    );
    return React.createElement(
      Box,
      { className: CLASS_ROOT + "_searchcontainer", onKeyPress: this._onSearch},
      _sch,
      searchcontainer
    );
  }

  render() {
    if (this.state.active) {
      return (
        <Layer onClose={this._onClose} closer={true}
          align="top">
          <Box pad={{ horizontal: 'large', vertical: 'medium' }}>
            <Heading tag="h2"> Search </Heading>
            {this._renderSearchBlock()}
          </Box>
        </Layer>
      );
    }
    if (this.props.inline) {
      return this._renderSearchBlock();
    } else {
      return (
        <Anchor icon={<SearchIcon />}  onClick={this._onShowSearch} />
      );
    }
  }
}

SearchPanel.propTypes = {
  value: PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number]),
  suggestions: PropTypes.array,
  options: PropTypes.array,
  selectedOption: PropTypes.string,
  onSearch: PropTypes.func
};

export default SearchPanel;
