import { Avatar, Typography } from "antd";
import "./style.css";
import { formatRelative } from "date-fns/esm";

function formatDate(seconds) {
  let formattedDate = "";
  if (seconds) {
    formattedDate = formatRelative(new Date(seconds), new Date());
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
}

function MessageChat(props) {
  const { sender, text, displayName, createAt, photoUrl } = props;
  if (sender !== displayName) {
    return (
      <>
        <div className="message_chat receiver">
          <div className="info_title">
            <Avatar size="small" src={photoUrl}>
              A
            </Avatar>
            <Typography.Text className="message_chat_author">
              {displayName}
            </Typography.Text>
            <Typography.Text className="message_chat_date">
              {formatDate(createAt)}
            </Typography.Text>
          </div>
          <div>
            <Typography.Text className="message_chat_content receiver_text">
              {text}
            </Typography.Text>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="message_chat sender">
          <div className="info_title">
            <Typography.Text className="message_chat_date">
              {formatDate(createAt)}
            </Typography.Text>
            <Avatar size="small" src={photoUrl}>
              A
            </Avatar>
          </div>
          <div>
            <Typography.Text className="message_chat_content sender_text">
              {text}
            </Typography.Text>
          </div>
        </div>
      </>
    );
  }
}

export default MessageChat;
