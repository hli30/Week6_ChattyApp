import React, {Component} from 'react';
import Chatbar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';
import NavBar from './components/NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [],
      onlineUserCount: ''
    }
    this.socket = '';
    this.onContentEnter = this.onContentEnter.bind(this);
    this.onNameEnter = this.onNameEnter.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws:localhost:3001');

    this.socket.onmessage = (e) => {
      const incMsg = JSON.parse(e.data);

      //Distinguishing the type of incoming message and process accordingly
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
          this.setState({onlineUserCount: incMsg.count})
          break;
        default:
          throw new Error('Unknown event type' + incMsg.type);
      }
    }
  }

  //Called when enter pressed in the message box
  onContentEnter (username, content) {
    if (!username.trim()) {
      username = 'Anonymous';
    }

    this.onNameEnter(username);
    const newMsg = {type: 'postMessage', username, content};

    this.socket.send(JSON.stringify(newMsg));
  }

  //Called when enter pressed in the name box
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
        <NavBar onlineUserCount={this.state.onlineUserCount.toString()}/>
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
