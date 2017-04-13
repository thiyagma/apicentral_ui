import './scss/ResultsControls';
import React from 'react';
import SearchBar from "./SearchBar";
import Paginator from "./Paginator";

class ResultsControls extends React.Component {
  /*--[1]------------------------- LIFECYCLE ------------------------------*/
  constructor() {
    super();

    this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);

    this.state = {
      SearchBar: {
        searchBarCheckedOptions: {
          title: true,
          description: true,
          keywords: true,
          category: true,
          author: true
        }
      }
    };
  }

  handleSearchBarChange(searchBarCheckedOptions) {
    this.setState({
      SearchBar: {
        searchBarCheckedOptions: searchBarCheckedOptions
      }
    });

    if (this.props.onFilterChange) {
      this.props.onFilterChange({
        options: searchBarCheckedOptions
      });
    }
  }

  handlePaginationChange(itemsPerPage, currentPage, maxPages) {
    if (this.props.onPaginationChange) {
      this.props.onPaginationChange(itemsPerPage, currentPage, maxPages);
    }
  }

  /*--[1]------------------------- RENDER ------------------------------*/
  render() {
    return (
      <div className="containerResultsControls">
        <SearchBar
          show={this.props.showFilter}
          searchBarCheckedOptions={this.state.SearchBar.searchBarCheckedOptions}
          onSearchBarChange={this.handleSearchBarChange}
        />
        <Paginator
          show={this.props.showFilter}
          totalHits={this.props.totalHits}
          limitedHits={this.props.limitedHits}
          onPaginationChange={this.handlePaginationChange}
        />
      </div>
    );
  }
};

ResultsControls.propTypes = {
  totalHits: React.PropTypes.number,
  limitedHits: React.PropTypes.number,
  showFilter: React.PropTypes.bool,
  onFilterChange: React.PropTypes.func.isRequired,
  onPaginationChange: React.PropTypes.func.isRequired
};

ResultsControls.defaultProps = {
  showFilter: false
};

export default ResultsControls;
