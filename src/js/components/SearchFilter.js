import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, FilterIcon, Menu, CheckBox, SearchInput } from '../grommet';
import { applyFilter } from '../actions/search';

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this._onCheckedChange = (e) => {
      this.state.options[e.target.name] = !this.state.options[e.target.name];
      this.setState(this.state);
    };
    // this._onCheckedChange.bind(this);
    this._onDOMChange = (e) => this.setState({term: e.target.value});

    this._onFilter = this._onFilter.bind(this);
    this.state = props.filterOptions;
    //{term: '', title: true, description: true, keywords: true, category: true, author: true};
  }

  componentWillReceiveProps(nextProps) {
    console.log("SearchFilter: ", nextProps.filterOptions);
    this.setState(nextProps.filterOptions);
  }

  _onFilter(e) {
    console.log(this.state);
    // this.props.onFilter(this.state);
    this.props.dispatch(applyFilter(this.state));
  }

  render () {
    return (
      <Menu icon={<FilterIcon />} closeOnClick={false} dropAlign={{"left": "left"}} pad="medium">
        <Box pad="medium">
          <SearchInput placeHolder="search with in" value={this.state.term} onDOMChange={this._onDOMChange}/>
          <Box pad="medium">
            <CheckBox id="check-title" name="title" checked={this.state.options.title}
              onChange={this._onCheckedChange} label="Title" />
            <CheckBox id="check-description" name="description" checked={this.state.options.description}
              onChange={this._onCheckedChange} label="Description" />
            <CheckBox id="check-keywords" name="keywords"  checked={this.state.options.keywords}
              onChange={this._onCheckedChange} label="Keywords" />
            <CheckBox id="check-category" name="category" checked={this.state.options.category}
              onChange={this._onCheckedChange} label="Category" />
            <CheckBox id="check-author" name="author" checked={this.state.options.author}
              onChange={this._onCheckedChange} label="Author" />
          </Box>
          <Box pad="none" align="end">
            <Button label="apply" primary={true} onClick={this._onFilter}/>
          </Box>
        </Box>
      </Menu>
    );
  }
}


let select = (state) => state.search;
export default connect(select)(SearchFilter);
// export default SearchFilter;
