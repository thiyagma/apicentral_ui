import React from 'react';
import '../../scss/ResultDetailSummary.scss';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

class ResultDetailSummary extends React.Component {
  constructor(props) {
    super(props);
    this.renderKeywords = this.renderKeywords.bind(this);
    this.renderComposedObject = this.renderComposedObject.bind(this);

    this.complexField = {
      // author: '',
      auth_model: '',
      description_file_type: '',
      status: '',
      environment: '',
      repository: '',
      repositoryType: '',
      endpoint: '',
      endpointType: '',
      license: '',
      licenseType: ''
    };
  }

  renderKeywords(metadata) {
    let keywords = "";
    for (let data in metadata) {
      if (metadata[data].name === "keywords") {
        keywords = metadata[data].value.split("|").join("  \u2022  ");
      }
    }

    return (
      keywords
    );
  }

  renderComposedObject(obj) {
    var value = "";
    if (obj) {
      obj.map(function (currentValue, index, array) {
        value += currentValue.value + "  \u2022  ";
      });
      if (value.length) {
        value = value.substr(0, value.length - 7);
      }
    }

    return value;
  }

  render() {
    var apiDetail = this.props.apiDetail;
    ['endpoint', 'repository', 'license', "metadata"].map((key) => {
      var d = apiDetail[key];
      if (d) {
        if (key == "metadata") {
          this.complexField[key] = d.author ? d.author.value : '';
        } else {
          this.complexField[key] = d.url;
          this.complexField[key + "Type"] = d.name;
        }
      }
    });
    
    return (
      <Box pad={{ vertical: 'medium', horizontal: 'small' }} align="start">
        {/* BASIC INFORMATION */}
        <DisplayGroup title="BASIC INFORMATION">
          <DisplayValue label="API Id" value={apiDetail.api_id} />
          <DisplayValue label="EPR Id" value={apiDetail.epr_id} />
          <DisplayValue label="API Name" value={apiDetail.title} />
          <DisplayValue label="Version" value={apiDetail.version} />
          <DisplayValue label="License Type" value={this.complexField.licenseType} />
          <DisplayValue label="License" value={this.complexField.license} />
          <DisplayValue label="Device Specific" value={apiDetail.device_specific ? "Yes" : "No"} />
          <DisplayValue label="Is Active" value={apiDetail.is_active ? "Yes" : "No"} />
          <DisplayValue label="Environment" value={apiDetail.environment} />
        </DisplayGroup>
        {/* INDUSTRY DETAILS */}
        <DisplayGroup title="INDUSTRY DETAILS">
          <DisplayValue label="Provider" value={apiDetail.provider} />
          <DisplayValue label="Description" value={apiDetail.description} />
          <DisplayValue label="Summary" value={apiDetail.summary} />
          <DisplayValue label="Endpoint Type" value={this.complexField.endpointType} />
          <DisplayValue label="Endpoint" value={this.complexField.endpoint} />
          <DisplayValue label="Repository Type" value={this.complexField.repositoryType} />
          <DisplayValue label="Repository" value={this.complexField.repository} />
          <DisplayValue label="Value Chain" value={this.renderComposedObject(apiDetail.value_chain)} />
          <DisplayValue label="Data Subject" value={this.renderComposedObject(apiDetail.data_subject)} />
        </DisplayGroup>
        {/* META DETAILS FOR API */}
        <DisplayGroup title="META DETAILS FOR API">
          <DisplayValue label="Logo" value={apiDetail.logo} />
          <DisplayValue label="SSL Support" value={apiDetail.ssl_support ? "Yes" : "No"} />
          <DisplayValue label="Supported Request Formats" value={apiDetail.supported_request_formats} />
          <DisplayValue label="Supported Response Formats" value={apiDetail.supported_response_formats} />
          <DisplayValue label="Restricted Access" value={apiDetail.restricted_access ? "Yes" : "No"} />
          <DisplayValue label="Author" value={apiDetail.author} />
          <DisplayValue label="Keywords" value={apiDetail.keyword}/>
        </DisplayGroup>
        {/*this.renderKeywords(apiDetail.metadata) */}
        {/* API SUPPORT */}
        <DisplayGroup title="API SUPPORT">
          <DisplayValue label="Documentation Url" value={apiDetail.documentation_url} />
          <DisplayValue label="Support Email" value={apiDetail.support_email} />
          <DisplayValue label="Status" value={apiDetail.status} />
          <DisplayValue label="Auth Model" value={apiDetail.auth_model} />
          <DisplayValue label="Description FileType" value={apiDetail.description_file_type} />
        </DisplayGroup>
      </Box>
    );
  }
};

ResultDetailSummary.propTypes = {
  apiDetail: React.PropTypes.object.isRequired
};

export default ResultDetailSummary;


const SubHeader = ({title, uppercase}) => {
  return (
    <Heading tag="h6" strong={true} uppercase={uppercase || true}>{title}</Heading>
  );
};

const DisplayGroup = (props) => {
  const {title, uppercase, children} = props;
  return (<Box pad={{vertical: "small", horizontal: 'none'}} className="DisplayGroup">
      <SubHeader title={title} uppercase={uppercase}/>
      <Box pad="none">
        <table>
          <tbody>{children}</tbody>
        </table>
      </Box>
    </Box>);
};

const DisplayValue = (props) => (<tr className="DisplayValue"><td className="label">{props.label}</td><td className="value">{props.value || ''}</td></tr>);
