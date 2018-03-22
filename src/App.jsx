import React, {Component} from 'react';
import Chatbar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';
import NavBar from './components/NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.socket = '';
    this.onEnter = this.onEnter.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws:localhost:3001');

    this.socket.onmessage = (e) => {
      const msgs = this.state.messages.concat(JSON.parse(e.data));
      this.setState({messages: msgs})
    }
  }

  onEnter (username, content) {
    if (!username.trim()) {
      username = 'Anonymous';
    }
    const newMsg = {username, content};

    this.socket.send(JSON.stringify(newMsg));
  }

  render() {
    console.log('Rendering <App/>');
    return (
      <div>
        <NavBar/>
        <MessageList messages={this.state.messages}/>
        <Chatbar 
          username={this.state.currentUser.name}
          onEnter={this.onEnter}
          />
      </div>
    );
  }
}

export default App;
