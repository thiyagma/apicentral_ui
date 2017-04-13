import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import SwaggerUI from '../components/SwaggerUI';
import ApiPanel from '../components/ApiPanel';
import ResultCommonBth from '../components/ResultCommonBth';
import ResultDetailSummary from '../components/ResultDetailSummary';


class ResultDetail extends Component {

  render () {
    const {apicatelog: {apiDetail}} = this.props;
    console.log(apiDetail);
    return (
      <ApiPanel title="Api Details" >
        <Tabs justify="end">
        <Tab title="Summary">
          <ResultDetailSummary apiDetail={apiDetail} />
        </Tab>
        <Tab title="How to use">
          <Container apiid={apiDetail.api_id}>
            <h2> How to use </h2>
            <div className="grommetux-tbd">TBD</div>
          </Container>
        </Tab>
        <Tab title="Try It">
          <Container apiid={apiDetail.api_id}>
            <SwaggerUI url = 'https://apicatalog-dev.stackato.g4ihos.itcs.hpecorp.net/swagger.json'/>
          </Container>
        </Tab>
      </Tabs>
      </ApiPanel>
    );
  }
};

let select = (state) => state;
export default connect(select)(ResultDetail);


class Container extends Component {
  render() {
    return (
      <Box pad={{horizontal: 'large', vertical: 'medium'}}>
        <ResultCommonBth apiid={this.props.apiid}/>
        {this.props.children}
      </Box>
    );
  }
}
