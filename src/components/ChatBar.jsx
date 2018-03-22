import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.username,
      content: ''
    }
    this.handleDetectEnter = this.handleDetectEnter.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({currentUser: e.target.value});
  }

  handleContentChange(e) {
    this.setState({content: e.target.value});
  }

  handleDetectEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.onEnter(this.state.currentUser, this.state.content);
      this.setState({content: ''});
    }
  }

  render() {
    console.log('Rendering <Chatbar/>');
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.currentUser} onChange={this.handleUsernameChange}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.handleContentChange} onKeyUp={this.handleDetectEnter}/>
      </footer>
    );
  }
}

Chatbar.propTypes = {
  username: PropTypes.string,
  onEnter: PropTypes.func
}


