import { Avatar, Button, Form, Input, Tooltip } from "antd";
import "./style.css";
import MessageChat from "../MessageChat";
import { useContext, useState } from "react";
import { ChattingContext } from "../ChatRoom";
import { useForm } from "antd/es/form/Form";
import { DatabaseContext } from "../../App";
import { FirebaseContext } from "../../firebase";
import { ref, serverTimestamp, child, push } from "firebase/database";

function ChatWindow() {
  const { snapshotChatting } = useContext(ChattingContext);
  const { data } = useContext(DatabaseContext);
  const { auth, firebase } = useContext(FirebaseContext);

  const messageChating = Object.values(snapshotChatting);
  const [inputValue, setInputValue] = useState("");
  const [form] = useForm();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = () => {
    const uidUsername = auth.currentUser.uid;
    push(child(ref(firebase), `chatting/`), {
      username: data.users[uidUsername].username,
      photoUrl: data.users[uidUsername].img,
      uid: uidUsername,
      createAt: serverTimestamp(),
      message: inputValue,
    });
    form.resetFields(["message"]);
  };

  return (
    <>
      <div className="chat_window">
        <div className="chat_window_header">
          <div className="chat_window_header_info">
            <p className="chat_window_header_title">Room 1</p>
            <span className="chat_window_header_description">
              Day la room 1
            </span>
          </div>
          <Avatar.Group size="small">
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
          </Avatar.Group>
        </div>
        <div className="chat_window_content">
          <div className="message_list">
            {messageChating.map((mess, index) => (
              <MessageChat
                key={index}
                text={mess.message}
                photoUrl={mess.photoUrl}
                displayName={mess.username}
                createAt={mess.createAt}
              />
            ))}
            <Form form={form} className="chat_window_content_form">
              <Form.Item name="message">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder="Input your text"
                  bordered={false}
                  autoComplete="off"
                ></Input>
              </Form.Item>
              <Button type="primary" onClick={handleOnSubmit}>
                Send
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatWindow;
