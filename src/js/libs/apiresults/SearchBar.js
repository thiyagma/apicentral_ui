import './scss/SearchBar';
import React from 'react';
import Menu from 'grommet/components/Menu';
import Filter from 'grommet/components/icons/base/Filter';
import CheckBox from 'grommet/components/CheckBox';

class SearchBar extends React.Component {
  /*--[1]------------------------- LIFECYCLE ------------------------------*/
  constructor() {
    super();

    this.searchBarChange = this.searchBarChange.bind(this);
    this.searchBarCheckedOptionsChange = this.searchBarCheckedOptionsChange.bind(this);
  }

  componentDidMount() {
    this.searchBarCheckedOptions = {
      title: this.props.searchBarCheckedOptions.title,
      description: this.props.searchBarCheckedOptions.description,
      keywords: this.props.searchBarCheckedOptions.keywords,
      category: this.props.searchBarCheckedOptions.category,
      author: this.props.searchBarCheckedOptions.author
    };
  }

  componentWillReceiveProps(nextProps) {
    this.searchBarCheckedOptions = {
      title: nextProps.searchBarCheckedOptions.title,
      description: nextProps.searchBarCheckedOptions.description,
      keywords: nextProps.searchBarCheckedOptions.keywords,
      category: nextProps.searchBarCheckedOptions.category,
      author: nextProps.searchBarCheckedOptions.author
    };
  }


  searchBarChange() {
    this.props.onSearchBarChange(
      this.searchBarCheckedOptions
    );
  }

  searchBarCheckedOptionsChange(event) {
    this.searchBarCheckedOptions[event.target.id.replace("check-","")] = event.target.checked;

    this.searchBarChange();
  }

  /*--[1]------------------------- RENDER ------------------------------*/
  render() {
    return (
      <div className="searchBarBox" hidden={!this.props.show}>
        <div className="searchBarOptions">
          <Menu icon={<Filter />} closeOnClick={false} ref="menu"
            dropAlign={{"left": "left"}} pad="medium">
            <CheckBox id="check-title" checked={this.props.searchBarCheckedOptions.title}
              onChange={this.searchBarCheckedOptionsChange} label="Title" />
            <CheckBox id="check-description" checked={this.props.searchBarCheckedOptions.description}
              onChange={this.searchBarCheckedOptionsChange} label="Description" />
            <CheckBox id="check-keywords" checked={this.props.searchBarCheckedOptions.keywords}
              onChange={this.searchBarCheckedOptionsChange} label="Keywords" />
            <CheckBox id="check-category" checked={this.props.searchBarCheckedOptions.category}
              onChange={this.searchBarCheckedOptionsChange} label="Category" />
            <CheckBox id="check-author" checked={this.props.searchBarCheckedOptions.author}
              onChange={this.searchBarCheckedOptionsChange} label="Author" />
          </Menu>
        </div>
      </div>
    );
  }
};

SearchBar.propTypes = {
  show: React.PropTypes.bool,
  searchBarCheckedOptions: React.PropTypes.object.isRequired,
  onSearchBarChange: React.PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  show: false
};
export default SearchBar;
