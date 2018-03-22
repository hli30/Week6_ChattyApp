import React from 'react';
import PropTypes from 'prop-types';

export default function Message ({username, content}) {
  return (
    <div>
      <div className="message">
        <span className="message-username">{username}</span>
        <span className="message-content">{content}</span>
      </div>
      <div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>
    </div>
  );
}

Message.propTypes = {
  username: PropTypes.string,
  content: PropTypes.string
}