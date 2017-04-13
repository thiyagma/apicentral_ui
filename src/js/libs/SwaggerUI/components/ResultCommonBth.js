// (C) Copyright 2014-2016 Hewlett Packard Enterprise LP
'use strict';

import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Box, Anchor, Menu, EditIcon, SocialMailIcon, FavoriteIcon} from '../grommet';
import {addMyFav} from '../actions';
class ResultCommonBth extends Component {
  constructor(props) {
    super(props);
    this._addFav = this._addFav.bind(this);

    this.state = {
      favtoggle: false,
      fav: this.props.session.favoriteapi,
      apiId: this.props.apiid
    };
  }

  _addFav() {
    // if (this.state.favtoggle) {
    //   this.props.dispatch(addMyFav(this.props.session.email, this.props.apiid, this.props.apicatalog.apiDetail.title, false));
    // } else {
    //   this.props.dispatch(addMyFav(this.props.session.email, this.props.apiid, this.props.apicatalog.apiDetail.title, true));
    // }
    // this.props.dispatch(login(this.props.session.email, null));
    if (this.props.apiid != undefined && this.props.session.email != undefined) {
      this.props.dispatch(addMyFav(this.props.session.email, this.props.apiid, this.props.apicatalog.apiDetail.title, !this.state.favtoggle));
    }
  }

  render() {
    const {session, apiid} = this.props;
    // const apicatalog = this.props.apicatalog;
    // const fav = session.favoriteapi;
    // const id = apiId;
    // var item = fav.find(function (d) {
    //   return d.id === id;
    // });
    var item = session.favoriteapi.find((f) => f.api_id == apiid);
    this.state.favtoggle = item != undefined? true : false;

    let edit = this.props.onEditClick ? (<Anchor href="#" icon={<EditIcon />} onClick={this.props.onEditClick}/>) : null;

    return (
      <Box className="result-commonbtn" pad="none" justify="between" align="end" >
        <Menu direction="row">
          {edit}
          <Anchor href="#" icon={<SocialMailIcon />}/>
          <Anchor  className={this.state.favtoggle ? 'fav-isSet': ''} icon={<FavoriteIcon/>} onClick={this._addFav} />
        </Menu>
      </Box>
    );
  }
}

// export default ResultCommonBth;
let select = (state) => state;
export default connect(select)(ResultCommonBth);
