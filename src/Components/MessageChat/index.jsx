import { Avatar, Typography } from "antd";
import "./style.css";

function MessageChat(props) {
  const { text, displayName, createAt, photoUrl } = props;
  return (
    <>
      <div className="message_chat">
        <div>
          <Avatar size="small" src={photoUrl}>
            A
          </Avatar>
          <Typography.Text className="message_chat_author">
            {displayName}
          </Typography.Text>
          <Typography.Text className="message_chat_date">
            {createAt}
          </Typography.Text>
        </div>
        <div>
          <Typography.Text className="message_chat_content">
            {text}
          </Typography.Text>
        </div>
      </div>
    </>
  );
}

export default MessageChat;
