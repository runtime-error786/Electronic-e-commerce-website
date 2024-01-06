import { useState, useEffect } from 'react';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { Se } from '../Action';
import { useDispatch,useSelector } from 'react-redux';

const API_KEY = "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";

const Mainaa = () => {
  let di = useDispatch();
  di(Se("n"));
  const [messages, setMessages] = useState([
    {
      message: "Hello,  Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
    <div className="App">
      <div className='kil09'>
        <MainContainer>
          <ChatContainer
            style={{
              backgroundColor: '#2d3436',
              
            }}
          >
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator style={{backgroundColor:'#2d3436'}} content="Typing..." /> : null}
              style={{
                backgroundColor: '#2d3436',
              }}
            >
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput
              placeholder="Send a Message"
              onSend={handleSendRequest}
              style={{
                backgroundColor: '#2d3436',
                borderColor:"#2d3436"
              }}
              
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export { Mainaa };
