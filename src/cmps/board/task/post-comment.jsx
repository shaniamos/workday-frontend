import { Component } from "react";
import { Editor } from '@tinymce/tinymce-react';

export class PostComment extends Component {
  state = {
    comment: '',
    toggleEditor: false,
  };

  handleModelChange = (e) => {
    this.setState({
      comment: e.target.getContent(),
    });
  };
  onAddComment = () => {
    this.props.onAddComment(this.state.comment);
    this.setState((prevState) => ({ ...prevState, comment: '' }))
  };
  toggleEditor = (value) => {
    this.setState((prevState) => ({ ...prevState, toggleEditor: value }))
  };

  render() {
    return (
      <section className="post-comment">
        <div>
          {this.state.toggleEditor ? (
            <Editor
              apiKey="loqhc1n2dhurh3n81a0m5k8fte3ecv2jmgl152b25c1joc6a"
              initialValue=""
              init={{
                max_height: 160,
                resize: false,
                menubar: false,
              }}
              onChange={this.handleModelChange} />
          ) : (
            <div
              className="comment-input btn"
              onClick={() => this.toggleEditor(true)}
            >
              Write an update...
            </div>
          )}
        </div>
        {this.state.toggleEditor && (
          <div className="side-panel-actions flex align-center space-between">
            <button
              className="comment-btn"
              onClick={(ev) => {
                ev.preventDefault();
                this.onAddComment();
                this.toggleEditor(false);
              }}>
              update
            </button>
          </div>
        )}
      </section>
    )
  }
}