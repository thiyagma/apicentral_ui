import React from 'react';
import License from 'grommet/components/icons/base/License';
import Catalog from 'grommet/components/icons/base/Catalog';
import Stakeholder from 'grommet/components/icons/base/Stakeholder';

class Results extends React.Component {
  /*--[1]------------------------- LIFECYCLE ------------------------------*/
  constructor() {
    super();

    this.renderResult = this.renderResult.bind(this);
  }

  /*--[2]---------- RENDER METHODS ---------------*/
  renderKeywords(metadata) {
    let keywords = "";
    // for (let data in metadata) {
    //   if (metadata[data].name === "keywords") {
        // keywords = metadata[data].value.split("|").join(" \u2022 ");
    //   }
    // }
    if (metadata.keyword) {
      keywords = metadata.keyword.split("|").join(" \u2022 ");
    }
    return (
      keywords
    );
  }

  renderCategory(value_chain) {
    return (value_chain && value_chain.length > 0) ? value_chain[value_chain.length-1].value : '';
  }

  selectResult(currentValue) {
    if (this.props.onSelect) {
      this.props.onSelect(currentValue);
    }
  }

  renderResult(currentValue, index, array) {
    return (
      <div className="result" key={index} onClick={this.selectResult.bind(this, currentValue)}>
        <div>{currentValue.eprId}</div>
        <div className="title">{currentValue.title}</div>
        <div className="result_content">
          <div className="status">{currentValue.status}</div>
          <div className="description">{currentValue.description}</div>
          <div className="keywords">
            <License size="small" />
            <span>
              {this.renderKeywords(currentValue)}
            </span>
          </div>
          <div className="category">
            <Catalog size="small" />
            <span>{this.renderCategory(currentValue.value_chain)}</span>
          </div>
          <div className="createBy">
            <Stakeholder size="small" />
            <span>{currentValue.create_by}</span>
          </div>
        </div>
      </div>
    );
  }


  /*--[1]------------------------- RENDER ------------------------------*/
  render() {
    var classes = ["containerResults"];
    var displayResults = null;
    if (this.props.results && this.props.results.length > 0) {
      displayResults = this.props.results.map(this.renderResult);
    } else {
      displayResults = (
        <div className="noResults">
          There is no results that match your query<br/>
          Try with another query
        </div>
      );
    }

    if(this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div className={classes.join(' ')}>
        <div className="results" data-aligment={this.props.resultsAligment}>
          {
            displayResults
          }
        </div>
      </div>
    );
  }
};

Results.propTypes = {
  results: React.PropTypes.array.isRequired,
  resultsAligment: React.PropTypes.oneOf(['start', 'center', 'end', 'spaceAround', 'spaceBetween']).isRequired,
  onSelect: React.PropTypes.func.isRequired,
  cssStyle: React.PropTypes.object
};

Results.defaultProps = {
  results: [],
  resultsAligment: "start"
};

export default Results;
