import React from 'react';
import { connect } from 'react-redux';
import License from 'grommet/components/icons/base/License';
import Catalog from 'grommet/components/icons/base/Catalog';
import Stakeholder from 'grommet/components/icons/base/Stakeholder';
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';

import Group from 'grommet/components/icons/base/Group';
import StarHalf from 'grommet/components/icons/base/StarHalf';
import LinkUp from 'grommet/components/icons/base/LinkUp';
import Bookmark from 'grommet/components/icons/base/Bookmark';
import {addMyBookMarks} from '../../actions/myfavapi';


import SpinningIcon from 'grommet/components/icons/Spinning';
import InfiniteScroll from 'grommet/utils/InfiniteScroll';

import Apps from 'grommet/components/icons/base/Apps';
import Menu from 'grommet/components/icons/base/Menu';
import Select from 'grommet/components/Select';

import { TILE_VIEW, LIST_VIEW, sortOptions } from '../../constants';


const CLASS_ROOT = "containerResults";
class ResultPanel extends React.Component {
  /*--[1]------------------------- LIFECYCLE ------------------------------*/
  constructor(props) {
    super(props);
    const {session} = props;
    this.renderResult = this.renderResult.bind(this);
    this.bookmarkClick = this.bookMarkClick.bind(this);

    this.state = {
      favtoggle: true,
      bookmarks: session.bookmarks,
      orderBy:'Recent'
      // apiId: this.props.apiid
    };
  }

  componentDidMount () {
    const {onMore} = this.props;

    if (onMore) {
      this._scroll = InfiniteScroll.startListeningForScroll(
        this.moreRef, onMore
      );
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
      this._scroll = undefined;
    }
  }

_onTileViewClick(){
    console.log('Tile');
    this.setState({viewStyle: TILE_VIEW});
  }
  
  _onListViewClick(){
    console.log('List');
      this.setState({viewStyle: LIST_VIEW});
  }

_onSortByClick(e){
    this.props.onSort(e.value)
    //this.setState({orderBy:e.value});
    //this.props.dispatch({action:'sort'});
    
  }

  bookMarkClick(currentValue) {
    console.log("bookmark cliked");
    const {session: {email}, session: {api_id}} = this.props;
    if (currentValue != undefined && email != undefined) {
      this.props.dispatch(addMyBookMarks(email, currentValue.api_id, currentValue.title, true));
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const { onMore } = this.props;

    if (onMore && !this._scroll) {
      this._scroll = InfiniteScroll.startListeningForScroll(
        this.moreRef, onMore
      );
    }
  }

  componentWillUnmount () {
    if (this._scroll) {
      InfiniteScroll.stopListeningForScroll(this._scroll);
    }
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
      keywords = metadata.keyword.split("|").join(", ");
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
  let item = this.state.bookmarks.find((f) => f.api_id == currentValue.api_id);
  let isShow=item != undefined? true : false;

    let viewResult = "";
    if(this.props.viewStyle == TILE_VIEW)
      viewResult = (
      <div className="result" key={index} >
        <div>{currentValue.eprId}</div>
        
        <div className="title">
          <Bookmark className={isShow ? 'bookmark-icon': ''}  onClick={this.bookMarkClick.bind(this,currentValue)}/>
          <span className="tile-title-h" onClick={this.selectResult.bind(this, currentValue)}>{currentValue.title}</span>
          <span className="tile-title-p"> By: {extractAuthorFromEmail(currentValue.create_by)}</span>
         </div>
       
        <div>
          <img className="tile-image" src="https://asmallorange.com/assets/img/logo/logo.png"/>
        </div>
        <div className="description">{currentValue.description}</div>
        <div className="keywords">
            <span>
              {this.renderKeywords(currentValue)}
            </span>
        </div>
        
        <Columns>
        <div className="tile-footer">
        <Box size='xsmall' colorIndex='light-2' className="tile-footer-box">
           <Group  className="user-icon"/><span className="tile-icon-text">268</span>
        </Box>
        <Box size='xsmall'colorIndex='light-2' className="tile-footer-box">
          <StarHalf className="rating-icon"/><span className="tile-icon-text">4.5</span>
        </Box>
        <Box size='xsmall' colorIndex='light-2' className="tile-footer-box">  
          <LinkUp className="uptime-icon"/><span className="tile-icon-text">99%</span>
        </Box>
        </div>
        </Columns>
      </div>
    );
    else
    {
       viewResult = (
      <div className="result" key={index} onClick={this.selectResult.bind(this, currentValue)}>
        <div>{currentValue.eprId}</div>
        
        <div className="title">
          <Bookmark className={isShow ? 'bookmark-icon-fill': 'bookmark-icon'} onClick={this.bookMarkClick.bind(this,currentValue,isShow)}/> 
          <span className="tile-title-h">{currentValue.title}</span>
          <span className="tile-title-p"> By: {extractAuthorFromEmail(currentValue.create_by)}</span>
         </div>
       
        <div className="description">{currentValue.description}</div>
        <div className="keywords">
            <span>
              {this.renderKeywords(currentValue)}
            </span>
        </div>
        
        <Columns className="tile-footer">
        <div >
        <Box size='xsmall' colorIndex='light-2' className="tile-footer-box">
           <Group  className="user-icon"/><span className="tile-icon-text">268</span>
        </Box>
        <Box size='xsmall'colorIndex='light-2' className="tile-footer-box">
          <StarHalf className="rating-icon"/><span className="tile-icon-text">4.5</span>
        </Box>
        <Box size='xsmall' colorIndex='light-2' className="tile-footer-box">  
          <LinkUp className="uptime-icon"/><span className="tile-icon-text">99%</span>
        </Box>
        </div>
        </Columns>
      </div>
    );
    }
    return viewResult;
  }


  /*--[1]------------------------- RENDER ------------------------------*/
  render() {
    const {session: {bookmarks},onMore, className, results, sortedValue, viewStyle} = this.props;
    //var item = bookmarks.find((f) => f.api_id == api_id);
    var classes = [CLASS_ROOT];
    var displayResultPanel = null;
    if (results && results.length > 0) {
      displayResultPanel = results.map(this.renderResult);
    } else {
      displayResultPanel = (
        <div className="noResultPanel">
          There is no results that match your query<br/>
          Try with another query
        </div>
      );
    }

    if(className) {
      classes.push(className);
    }
    let resultsClass = "";
    if(viewStyle == TILE_VIEW) {
      resultsClass = 'results';
    }
    else {
      resultsClass = 'resultsList';
    }


    let more;
    if (onMore) {
      more = (
        <div ref={ref => this.moreRef = ref} className={`${CLASS_ROOT}__more`}>
          <SpinningIcon />
        </div>
      );
    }

  /*  <Box direction='row' className="right">
          <Select options={sortOptions} onChange={this._onSortByClick} value={sortedValue}/>
      <Apps className='cursor' onClick={this._onTileViewClick}/>
            <Menu onClick={this._onListViewClick}/>
          </Box>
*/

    return (
      <div ref={ref => this.containerRef = ref} className={classes.join(' ')}>
        
        <div className={resultsClass} data-aligment={this.props.resultsAligment}>
          {
            displayResultPanel
          }
        </div>
        {more}
      </div>
    );
  }
};

ResultPanel.propTypes = {
  results: React.PropTypes.array.isRequired,
  resultsAligment: React.PropTypes.oneOf(['start', 'center', 'end', 'spaceAround', 'spaceBetween']).isRequired,
  onSelect: React.PropTypes.func.isRequired,
  cssStyle: React.PropTypes.object,
  onMore: React.PropTypes.func
};

ResultPanel.defaultProps = {
  results: [],
  resultsAligment: "start"
};

function extractAuthorFromEmail(val) {
  if(val) {
    return val.slice(0,val.indexOf('.'));
  }
  else {
    return "";
  }
  
}

let select = (state) => state;
export default connect(select)(ResultPanel);