import { Component } from "react";
import { Editor } from '@tinymce/tinymce-react';

export class PostUpdate extends Component {
  state = {
    update: '',
    toggleEditor: false,
  };

  handleModelChange = (e) => {
    this.setState({
      update: e.target.getContent(),
    });
  };
  onPost = () => {
    this.props.onPost(this.state.update);
    this.setState((prevState) => ({ ...prevState, update: '' }));
  };
  toggleEditor = (value) => {
    this.setState((prevState) => ({ ...prevState, toggleEditor: value }));
  };
  
  render() {
    return (
      <div>
        <div>
          {this.state.toggleEditor ? (
            <Editor
              apiKey="loqhc1n2dhurh3n81a0m5k8fte3ecv2jmgl152b25c1joc6a"
              init={{
                max_height: 160,
                resize: false,
                menubar: false,
              }}
              onChange={this.handleModelChange}/>
          ) : (
            <div
              className="update-input btn"
              onClick={() => this.toggleEditor(true)}
            >
              Write an update...
            </div>
          )}
        </div>
        {this.state.toggleEditor && (
          <div className="side-panel-actions flex align-center space-between">
            <div className="left-side-actions flex">
              {/* <div className="add-files">Add files</div>
                <div className="gif">GIF</div>
                <div className="emoji">Emoji</div>
                <div className="mention">Mention</div> */}
            </div>
            <button
              className="update-btn"
              onClick={(ev) => {
                ev.preventDefault();
                this.onPost();
                this.toggleEditor(false);
              }}>
              Update
            </button>
          </div>
        )}
      </div>
    );
  }
}