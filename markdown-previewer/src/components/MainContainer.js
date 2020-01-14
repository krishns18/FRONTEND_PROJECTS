import React,  { Component } from 'react';
const marked = require('marked');

marked.setOptions({
  breaks: true
});

const initialText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.github.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)`;

const EditorPane = (props) => {
  return (
    <textarea id="editor"
              className="form-control"
              rows="20"
              value={props.markdown}
              onChange={props.handleChange}
              type="text" />
  );
}

const PreviewPane = (props) => {
  return (
    <div className="card-text"
        id="preview"
        dangerouslySetInnerHTML={{__html: marked(props.markdown, {renderer : renderer})}}>
    </div>
  );
}

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}


class MainContainer extends Component {

  state = {
    content: ''
  }

  handleTextChange = (e) => {
    this.setState({content: e.target.value});
  }
  componentDidMount() {
    this.setState({
      content: initialText
    })
  }

  render() {
    return(
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div id="instruction-box" className="col-10">
            <h4 className="text-danger">
            Enter the Github flavored markdown in the left pane, to get the rendered HTML on the right.
            </h4>
          </div>
        </div>
        <div id="main-container" className="row">
          <div className="col-6">
            <div className="card border-primary mb-3">
              <div className="card-header"><h4>Markdown Editor</h4></div>
              <div className="card-body">
                <EditorPane markdown={this.state.content}
                            handleChange={this.handleTextChange}/>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card border-success mb-3 preview-pane">
              <div className="card-header"><h4>Rendered HTML</h4></div>
              <div className="card-body">
                <PreviewPane markdown={this.state.content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
