import React, {Component} from 'react';
import Chatbar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';
import NavBar from './components/NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: []
    }
    this.socket = '';
    this.onContentEnter = this.onContentEnter.bind(this);
    this.onNameEnter = this.onNameEnter.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws:localhost:3001');

    this.socket.onmessage = (e) => {
      const incMsg = JSON.parse(e.data);

      switch (incMsg.type) {
        case 'incomingMessage':
          this.setState({messages: this.state.messages.concat(incMsg)});
          break;
        case 'incomingNotification':
          this.setState({
            messages: this.state.messages.concat(incMsg)
          });
          break;
        case 'connectedUsers':
          console.log('users', incMsg.count);
          break;
        default:
          throw new Error('Unknown event type' + incMsg.type);
      }
    }
  }

  onContentEnter (username, content) {
    if (!username.trim()) {
      username = 'Anonymous';
    }

    this.onNameEnter(username);
    const newMsg = {type: 'postMessage', username, content};

    this.socket.send(JSON.stringify(newMsg));
  }

  onNameEnter (username) {
    if (username !== this.state.currentUser.name) {
      const notification = {
        type: 'postNotification', 
        oldName: this.state.currentUser.name, 
        newName: username
      }
      this.setState({currentUser:{name: username}});
      this.socket.send(JSON.stringify(notification))
    }
  }

  render() {
    console.log('Rendering <App/>');
    return (
      <div>
        <NavBar/>
        <MessageList messages={this.state.messages}/>
        <Chatbar 
          username={this.state.currentUser.name}
          onContentEnter={this.onContentEnter}
          onNameEnter={this.onNameEnter}
          />
      </div>
    );
  }
}

export default App;
