import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CheckBox from 'grommet/components/CheckBox';
import Sidebar from 'grommet/components/Sidebar';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';
import {navActivate} from '../actions/nav';
import Label from 'grommet/components/Label';
class FacetedMenu extends Component {

  constructor() {
    super();
    this.renderResult = this
      .renderResult
      .bind(this);
    this._onDOMChange = this
      ._onDOMChange
      .bind(this);

  }

  _onDOMChange(e) {
    this
      .props
      .onChange(e);
    //this.setState({checked: e.target.checked});
  }

  renderResult(currentValue, index) {
    if (currentValue != undefined) {
      var chkNme = index + "chk";
      return (<CheckBox
        id={chkNme}
        name={chkNme}
        key={index}
        value={currentValue}
        label={currentValue}
        onClick={this._onDOMChange}/>);
    }
  }
  uniquedata(data, type) {
    var uniqueNames = [];
    data.forEach(function (value) {
      if (type === 'SOR') {
        if (value.system_of_record != null && value.system_of_record.length > 0) {
          value
            .system_of_record
            .forEach(function (element) {
              if (uniqueNames.indexOf(element) === -1) {
                uniqueNames.push(element);
              }
            })
        }
      } else {
        if (uniqueNames.indexOf(value.audience) === -1) {
          uniqueNames.push(value.audience);
        }
      }
    });
    return uniqueNames;
  }

  render() {
    var displaySOR = null;
    var displayAudience = null;

    if (this.props.results && this.props.results.length > 0) {
      displaySOR = this
        .uniquedata(this.props.results, 'SOR')
        .map(this.renderResult);
    } else {
      displaySOR = (
        <div className="noResults">
          No Data<br/>
        </div>
      );
    }

    if (this.props.results && this.props.results.length > 0) {
      displayAudience = this
        .uniquedata(this.props.results, 'Audience')
        .map(this.renderResult);
    } else {
      displayAudience = (
        <div className="noResults">
          No Data<br/>
        </div>
      );
    }

    return (
      <Sidebar fixed={false} className="left-clear">
        <Box flex='grow' justify='start' className="divider">
          <Title>Latency in Mins</Title>
          <Box direction="column" align="start">
            <CheckBox
              id="25"
              name="latency_25"
              key="under_25"
              value="0-25"
              label="Under 25"
              onClick={this._onDOMChange}/>
            <CheckBox
              id="50-100"
              name="latency_50-100"
              key="50_100"
              value="50-100"
              label="50 - 100"
              onClick={this._onDOMChange}/>
            <CheckBox
              id="100-200"
              name="latency_100-200"
              key="100-200"
              value="100-200"
              label="100-200"
              onClick={this._onDOMChange}/>
            <Box direction="row"></Box>
          </Box>

          <Title>Audience</Title>
          {displayAudience}
          <Title>System of Record</Title>
          {displaySOR}
        </Box>
      </Sidebar>
    );
  }

}

FacetedMenu.propTypes = {
  dispatch: PropTypes.func.isRequired,
  results: React.PropTypes.array.isRequired
};

let select = (state) => state;
export default connect(select)(FacetedMenu);
