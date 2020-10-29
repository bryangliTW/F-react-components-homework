import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
  }

  recordMessage = (event) => {
    this.setState({ message: event.target.value });
  };

  sendMessage = (message) => {
    if (message) {
      this.props.sendMessage(message);
      this.setState({ message: '' });
    }
  };

  keyPress = (event) => {
    if (event.which === 13) {
      this.sendMessage(this.state.message);
    }
  };

  render() {
    const { message } = this.state;
    return (
      <footer className="ChatInput">
        <input
          type="text"
          onChange={this.recordMessage}
          value={this.state.message}
          onKeyPress={this.keyPress}
        />
        <button type="submit" onClick={this.sendMessage.bind(this, message)}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
