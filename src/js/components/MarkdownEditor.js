import React, {Component} from 'react';
//import { ReactMarkdown } from "react-markdown";
var ReactMarkdown = require('react-markdown');
import Box from 'grommet/components/Box';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Button from 'grommet/components/Button';

const CLASS_ROOT = "markdown-editor";
class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = (event) => this.setState({ content: event.target.value,  tabId: 1});
    this.saveChange = () => {
      if (props.onSave) {
        props.onSave(this.state.content);
      }
    };
    // this._onContentChange = this._onContentChange.bind(this);
    // var data = [
    //   '# [Draft.js](https://facebook.github.io/draft-js/) [![Build Status](https://img.shields.io/travis/facebook/draft-js/master.svg?style=flat)]',
    //   '(https://travis-ci.org/facebook/draft-js) [![npm version](https://img.shields.io/npm/v/draft-js.svg?style=flat)](https://www.npmjs.com/package/draft-js)',
    //   '\n# Live demo\n\nChanges are automatically rendered as you type.\n\n* Follows the ',
    //   '[CommonMark](http://commonmark.org/) spec\n* Renders actual, "native" React DOM ',
    //   'elements\n* Allows you to escape or skip HTML (try toggling the checkboxes above)',
    //   '\n* If you escape or skip the HTML, no `dangerouslySetInnerHTML` is used! Yay!\n',
    //   '\n## HTML block below\n\n<blockquote>\n    This blockquote will change based ',
    //   'on the HTML settings above.\n</blockquote>\n\n## How about some code?\n',
    //   '```js\nvar React = require(\'react\');\nvar Markdown = require(\'react-markdown\');',
    //   '\n\nReact.render(\n    <Markdown source="# Your markdown here" />,\n    document.',
    //   'getElementById(\'content\')\n);\n```\n\nPretty neat, eh?\n\n', '## More info?\n\n',
    //   'Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)\n\n',
    //   '---------------\n\n',
    //   'A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal',
    //   '\n ```git clone https://github.com/facebook/draft-js.git',
    //   'cd draft-js \n npm install \nnpm run build \n```'
    // ].join('');
    this.state = { content: props.value || '', isReadOnly: props.isReadOnly, tabId: 0};
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.isReadOnly != this.props.isReadOnly) {
  //     this.setState({content: nextProps.value || '', isReadOnly: nextProps.isReadOnly});
  //   }
  // }

  

  render() {

    let editor = (
      <Tab key="editor" title="Editor">
        <Box className={CLASS_ROOT + "_container"} pad="none" align="start">
          <textarea className={CLASS_ROOT + "_container--textarea"} name="editor" value={this.state.content} onChange={this.handleChange}></textarea>
          <Button label="Save" primary={true} onClick={this.state.isReadOnly? null : this.saveChange} />
        </Box>
      </Tab>
    );

    let preview = (
       <Tab key="preview" title="Preview">
          <Box className={CLASS_ROOT + "_container--preview"} pad="small" align="start">
          {
           <ReactMarkdown source={this.state.content} />
          }
          </Box>
        </Tab>
        );

    let tabs = [preview];
    if (!this.state.isReadOnly) {
      tabs.push(editor);
    }

    return (
      <Box className={CLASS_ROOT} pad="none">
        <Tabs justify="start">
          {tabs}
        </Tabs>
      </Box>
    );
  }
}

export default MarkdownEditor;
