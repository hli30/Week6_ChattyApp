import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
    console.log('Rendering <MessageList/>');
    const msgs = this.props.messages.map(msg => 
    (<Message 
        key={msg.id} 
        content={msg.content} 
        username={msg.username}
      />));
    return (
      <main className="messages">
        {msgs}
      </main>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.array
}
