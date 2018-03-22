import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.username,
      content: ''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleContentChangeEnter = this.handleContentChangeEnter.bind(this);
    this.handleUsernameChangeEnter = this.handleUsernameChangeEnter.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({currentUser: e.target.value});
  }

  handleContentChange(e) {
    this.setState({content: e.target.value});
  }

  handleContentChangeEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.onContentEnter(this.state.currentUser, this.state.content);
      this.setState({content: ''});
    }
  }

  handleUsernameChangeEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.onNameEnter(this.state.currentUser);
    }
  }

  render() {
    console.log('Rendering <Chatbar/>');
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.currentUser} onChange={this.handleUsernameChange} onKeyUp={this.handleUsernameChangeEnter}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.handleContentChange} onKeyUp={this.handleContentChangeEnter}/>
      </footer>
    );
  }
}

Chatbar.propTypes = {
  username: PropTypes.string,
  onContentEnter: PropTypes.func,
  onNameEnter: PropTypes.func
}


