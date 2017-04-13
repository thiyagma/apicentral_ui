import React, { Component } from 'react';
import SignatureView from './SignatureView';
import ResponseContentType from './ContentType';

export default class TypeView extends Component {
  render() {
    const {model} = this.props;
    if (model == undefined || model.signatureModel == undefined) {
      return null;
    }
    var desc;
    if (model.successDescription) {
      desc = (<div> {model.successDescription} </div>);
    }

    return (
      <span>
      <section>
        <h4 className="summary">
          <span>Response Class</span> (<span>Status</span> {model.successCode})
        </h4>
        {desc}
      </section>
      <section>
        <SignatureView  model= {model.signatureModel} />
        <ResponseContentType title="Response Content Type" model={model.contentTypeModel.produces}/>
      </section>
      </span>
    );
  }
};
