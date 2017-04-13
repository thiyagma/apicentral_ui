import React, { Component, PropTypes } from 'react';

import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';
import Search from 'grommet/components/Search';
//import Search from './Search';
import Button from 'grommet/components/Button';
import SearchIcon from 'grommet/components/icons/base/Search';


const CLASSROOT = "search-ctrl";
class SearchCtrl extends Component {
	constructor(props) {
		super(props);
		this._onSearch = this._onSearch.bind(this);
		this._onSuggestionSelect = this._onSuggestionSelect.bind(this);
		this._onSearchTextChange = this._onSearchTextChange.bind(this);
		this._onKeyPress = this._onKeyPress.bind(this);
		this._onOptionChange = (e) => this.setState({ selectedOption: e.option });
		this.state = { term: '', suggestions: [], selectedOption: props.selectedOption };
	}

	componentWillReceiveProps(nextProps) {
		this.setState({suggestions: nextProps.suggestions});
	}
	
	_onSearchTextChange(e) {
		var term = e.target.value;
		if (this.props.onSearchTextChange) {
			//this.props.onSearchTextChange({ term: term, option: selectedOption});
			this.props.onSearchTextChange(e.target.value);
		}
		
		this.setState({ term: term});
	}

	_onSuggestionSelect(e) {
		let term = e.suggestion;
		term = term.substr(0,(term.indexOf('within')-1))
		debugger;
		this.setState({ term: term});
		console.log("Selected term " + e.target);
		if (this.props.onSearch) {
			const {term, selectedOption} = this.state;
			this.props.onSearch({ text: term, selectedfilter: selectedOption });
		}
	}
	
	_onSearch(e) {
		// if (e.key == "Enter" && this.props.onSearch) {
      //var obj = { text: this.state.value, selectedfilter: this.state.option };
      //this.props.onSearch(obj);
    //}
		if (this.props.onSearch) {
		 	const {term, selectedOption} = this.state;
		 	this.props.onSearch({ text: term, selectedfilter: selectedOption });
		}
	}

   searchTerm() {
	   if (this.props.onSearch) {
			const {term, selectedOption} = this.state;
			this.props.onSearch({ text: term, selectedfilter: selectedOption });
		}
   }

_onKeyPress(e) {
	if(e.key == "Enter") {
      this.searchTerm();
	}
  }

	render() {
		const {options, placeHolder} = this.props;
		const {term, selectedOption, suggestions} = this.state;
		return (
			<Box className={CLASSROOT} direction="row" pad="none"  onKeyPress={this._onKeyPress}>
				<Select className={CLASSROOT + "_filter"} options={options} value={selectedOption} onChange={this._onOptionChange} />
				<Search className={CLASSROOT + "_input"} inline={true} placeHolder={placeHolder} suggestions={suggestions} value={term} onDOMChange={this._onSearchTextChange} onSelect={this._onSuggestionSelect}/>
				<Button className={CLASSROOT + "_button"} label="Search" icon={<SearchIcon />} primary={true} onClick={this._onSearch} />
			</Box>

		);
	}
}

SearchCtrl.propTypes = {
	placeHolder: PropTypes.string,
	//selectedOption: PropTypes.object,
	options: PropTypes.array,
	suggestions: PropTypes.array,
	onSearch: PropTypes.func,
	onSearchTextChange: PropTypes.func
};

SearchCtrl.defaultProps = {
	placeHolder: "Search",
	selectedOption: { label: "Search All", value: 0 },
	options: [{ label: "Search All", value: 0 }],
	suggestions: []
};

export default SearchCtrl;
