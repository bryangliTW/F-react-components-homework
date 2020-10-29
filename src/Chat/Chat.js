import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  sendMessage = (message) => {
    let { messages } = this.state;
    const userMsg = {
      text: message,
      role: ROLE.CUSTOMER,
    };
    const autoResponse = answersData.find((answer) =>
      answer.tags.find((tag) => message.includes(tag))
    );
    messages = autoResponse ? messages.concat(userMsg, autoResponse) : messages.concat(userMsg);
    this.setState({ messages });
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput sendMessage={this.sendMessage} />
      </main>
    );
  }
}

export default Chat;
