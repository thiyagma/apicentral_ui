import React, { Component } from 'react';
import {Tabs, Tab} from './Grommet'; //Anchor
const CLASS_ROOT = "signature";
export default class SignatureView extends Component {
  render() {
    const {model: {sampleJSON, sampleXML, signature, isParam}} = this.props;
    var ele;
    if (sampleXML || sampleJSON) {
      var sample = sampleJSON || sampleXML;
      var notice = isParam? (<small className="notice" ></small>) : null;
      ele = (
        <div className={CLASS_ROOT + "-container"}>
          <Tabs justify="start" activeIndex={1}>
            <Tab title="Model">
              <div className="description" dangerouslySetInnerHTML={{ __html: signature }} />
              {notice}
            </Tab>
            <Tab title="Example Value">
              <pre><code>{sample}</code></pre>
              {notice}
            </Tab>
          </Tabs>
        </div>);
    } else {
      ele = (<span> {signature} </span>);
    }
    return ele;
  }
};
