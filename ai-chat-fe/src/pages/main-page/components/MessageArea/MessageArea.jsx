import React, { useContext } from "react";
import "./MessageArea.css";
import ReactMarkdown from "react-markdown";
import { ChatContext } from "../../../../context/ContextProvider";
import { getUser } from "../../../../services/accessToken";

const chat = [
  {
    name: "Content calendar for tiktok",
    message: "Create a content calendar for a TikTok account on reviewing real estate listings.",
  },
  {
    name: "Explain superconstructors",
    message: "Explain superconstructors",
  },
  {
    name: "Text inviting friend to wedding",
    message: "Please, write, text inviting friend to wedding",
  },
];

const MessageArea = (props) => {
  const { chatData } = useContext(ChatContext);
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  };

  const handleCreateDefaultChat = async (chat) => {
    const id = await props.onAddChat(chat.name);
    await props.onSendMessage(id, chat.message);
  };

  return (
    <>
      {(!chatData || !chatData?.currentChat) && (
        <div>
          <h1 className="header" style={{ color: 'white' }}>Hey, {getUser()?.name}!</h1>
          <h3 className="header" style={{ color: 'white' }}>How can I help you today?</h3>
          <div className="initial-blocks">
            {chat.map((item, index) => (
              <div key={index} className="initial-block" onClick={async () => await handleCreateDefaultChat(item)}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="message-list">
        {props.messages.map((message) => (
          <div key={message._id} className={`message ${message.role}`}>
            <ReactMarkdown>{message.text}</ReactMarkdown>
            <div className="message-date">{formatDateTime(message.createdAt)}</div>
          </div>
        ))}
        {props.isLoading && (
          <div className="loader">
          <div className="message user loader-box">

          </div>
          <div className="message tool loader-box">

          </div>
        </div>
        )}
      </div>
    </>
  );
};

export default MessageArea;