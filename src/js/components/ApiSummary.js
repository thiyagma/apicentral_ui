import React, {Component, PropTypes} from 'react';
import {Box, Tabs, Tab} from '../grommet';
import {DETAILS_EDIT} from '../constants';
import ApiTryOut from './ApiTryOut';
import MarkdownEditor from './MarkdownEditor';
import ResultCommonBth from './ResultCommonBth';
import ResultDetailSummary from '../libs/ResultDetails/js/components/ResultDetailSummary';
import {UpdateCreateType, saveSWAPI} from '../actions/registerapi';
const CLASS_ROOT = "api-summary";

class ApiSummary extends Component {
  constructor(props) {
    super(props);
    this._onDocumentUpdate = this._onDocumentUpdate.bind(this);
    this._onEditClick = this._onEditClick.bind(this);
    this._onActive = (e) => this.setState({tabIndex: e});
    this.state = {tabIndex: 0};
  }
  
  _onDocumentUpdate(e) {
    const {registerApi: {apiDetail}} = this.props;
    if (e && apiDetail.api_id) {
      apiDetail.howtodoc = e;
      this.props.dispatch(saveSWAPI(apiDetail, true));
    }
  }

  _onEditClick(e) {
    e.preventDefault();
    this.props.dispatch(UpdateCreateType(DETAILS_EDIT));
    this.context.router.push('/details/edit');
  }

  render() {
    const {registerApi: {apiDetail}, session: {email}} = this.props;
    const isEdit = (email == apiDetail.create_by);
    const editAction = isEdit? this._onEditClick : null;
    return (
      <Box className={CLASS_ROOT}> 
        <Tabs justify="end" activeIndex={this.state.tabIndex} onActive={this._onActive}>
          <Tab title="Summary" >
            <Container {...apiDetail} onEditClick={editAction}>
              <ResultDetailSummary apiDetail={apiDetail}/> 
            </Container>
          </Tab>
          <Tab title="How to use">
            <Container {...apiDetail}><span />
              <MarkdownEditor value={apiDetail.howtodoc} onSave={this._onDocumentUpdate} isReadOnly={!isEdit}/>
            </Container>
          </Tab>
          <Tab title="Try It">
            <Container apiid={apiDetail.api_id} title={apiDetail.title}>
              <ApiTryOut {...this.props}/>
            </Container>
          </Tab>
        </Tabs>
      </Box>
    );
  }
}

ApiSummary.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ApiSummary;

const Container = (props) => {
  return (<Box pad={{horizontal: 'large', vertical: 'medium'}}>
    <ResultCommonBth apiid={props.apiid} title={props.title} onEditClick={props.onEditClick}/>
    {props.children}
  </Box>);
};
