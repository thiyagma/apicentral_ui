import './scss/Paginator';
import React from 'react';
import Button from 'grommet/components/Button';
import Previous from 'grommet/components/icons/base/Previous';
import Next from 'grommet/components/icons/base/Next';

class Paginator extends React.Component {
  /*--[1]------------------------- LIFECYCLE ------------------------------*/
  constructor() {
    super();

    this.itemsPerPageChange = this.itemsPerPageChange.bind(this);
    this.decreaseCurrentPage = this.decreaseCurrentPage.bind(this);
    this.increaseCurrentPage = this.increaseCurrentPage.bind(this);

    this.state = {
      paginationInfo: "",
      itemsPerPage: 10,
      currentPage: 1,
      disabledPrevPage: true,
      disabledNextPage: true,
      maxPages: 0,
      paginatedResults: []
    };
  }

  componentDidMount() {
    // Determine max pages
    var maxPages = Math.ceil(this.props.totalHits/this.state.itemsPerPage);

    // Determine enabled buttons
    var disabledPrevPage = (this.state.currentPage > 1) ? false : true;
    var disabledNextPage = (this.state.currentPage < maxPages) ? false : true;

    this.setState({
      disabledPrevPage: disabledPrevPage,
      disabledNextPage: disabledNextPage,
      maxPages: maxPages
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.totalHits !== this.props.totalHits ||
      nextProps.limitedHits !== this.props.limitedHits
    ) {
      this.setState({
        currentPage: 1
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      nextState.itemsPerPage !== this.state.itemsPerPage ||
      nextState.currentPage !== this.state.currentPage
    ) {
      // Determine max pages
      var maxPages = Math.ceil(nextProps.totalHits/nextState.itemsPerPage);

      // Determine enabled buttons
      var disabledPrevPage = (nextState.currentPage > 1) ? false : true;
      var disabledNextPage = (nextState.currentPage < maxPages) ? false : true;

      this.setState({
        disabledPrevPage: disabledPrevPage,
        disabledNextPage: disabledNextPage,
        maxPages: maxPages
      }, function() {

      });

  //     if (nextProps.filteredResults.length) {

  //       var start = parseInt((nextState.currentPage-1) * nextState.itemsPerPage,10);
  //       var end = start +  parseInt(nextState.itemsPerPage, 10);

  //       var paginatedResults = nextProps.filteredResults.slice(start,end);

  //       // Determine max pages
  //       var maxPages = Math.ceil(nextProps.filteredResults.length/nextState.itemsPerPage);

  //       // Determine enabled buttons
  //       var disabledPrevPage = (nextState.currentPage > 1) ? false : true;
  //       var disabledNextPage = (nextState.currentPage < maxPages) ? false : true;

  //       // Set pagination information
  //       var paginationInfo = (start+1) + "-" + ((nextState.currentPage === maxPages) ? nextProps.filteredResults.length : end);

  //       this.setState({
  //         displayPaginator: true,
  //         paginationInfo: paginationInfo,
  //         disabledPrevPage: disabledPrevPage,
  //         disabledNextPage: disabledNextPage,
  //         maxPages: maxPages,
  //         paginatedResults: paginatedResults
  //       }, function() {

  //       });
  //     } else {
  //       this.setState({
  //         displayPaginator: false,
  //         paginationInfo: "0",
  //         disabledPrevPage: true,
  //         disabledNextPage: true,
  //         maxPages: 0,
  //         paginatedResults: []
  //       }, function() {

  //       });
  //     }
    }
  }

  itemsPerPageChange(event) {
    var itemsPerPage = event.target.value;
    // var currentPage = this.state.currentPage;
    // if (currentPage * itemsPerPage > this.props.filteredResults.length) {
    //   currentPage = 1;
    // }

    // this.setState({
    //   itemsPerPage: itemsPerPage,
    //   currentPage: currentPage
    // });

    this.setState({
      currentPage: 1,
      itemsPerPage: itemsPerPage
    }, function() {
      this.props.onPaginationChange(
        this.state.itemsPerPage,
        this.state.currentPage,
        this.state.maxPages
      );
    });
  }

  decreaseCurrentPage() {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      }, function() {
        this.props.onPaginationChange(
          this.state.itemsPerPage,
          this.state.currentPage,
          this.state.maxPages
        );
      });
    }
  }

  increaseCurrentPage() {
    if (this.state.currentPage < this.state.maxPages) {
      this.setState({
        currentPage: this.state.currentPage + 1
      }, function() {
        this.props.onPaginationChange(
          this.state.itemsPerPage,
          this.state.currentPage,
          this.state.maxPages
        );
      });
    }
  }

  /*--[1]------------------------- RENDER ------------------------------*/
  render() {
    //!this.state.displayPaginator ||
    return (
      <div className="paginator" hidden={!this.props.show}>
        <span>Results per page:</span>
        <select ref="resultsPerPage" value={this.state.itemsPerPage} onChange={this.itemsPerPageChange} >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="100">100</option>
        </select>
        <span className="paginationInfo">
          <span>Current page:</span>
          <span>{this.state.currentPage}</span>
          <span>of:</span>
          <span>{this.state.maxPages}</span>
        </span>
        <span className="controls">
          <Button icon={<Previous />} onClick={this.state.disabledPrevPage ? null : this.decreaseCurrentPage}/>
          <Button icon={<Next />} onClick={this.state.disabledNextPage ? null : this.increaseCurrentPage} />
        </span>
      </div>
    );
  }
};

Paginator.propTypes = {
  totalHits: React.PropTypes.number,
  limitedHits: React.PropTypes.number,
  show: React.PropTypes.bool,
  onPaginationChange: React.PropTypes.func.isRequired
};

Paginator.defaultProps = {
  show: false
};

export default Paginator;
