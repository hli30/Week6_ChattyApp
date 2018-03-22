import React from 'react';
import PropTypes from 'prop-types';

export default function Message ({username, content, type}) {
  if (type === 'incomingMessage') {
    return (
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
    )
  } else if (type === 'incomingNotification') {
    return (
      <div className="message system">
        {content}
      </div>
    )
  }
}

Message.propTypes = {
  username: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.string
}