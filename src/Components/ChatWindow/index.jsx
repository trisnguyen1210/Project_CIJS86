import { Avatar, Button, Form, Input, Tooltip } from "antd";
import "./style.css";
import MessageChat from "../MessageChat";
import { useContext, useEffect, useMemo } from "react";
import { ChattingContext } from "../ChatRoom";
import { useForm } from "antd/es/form/Form";
import { DatabaseContext } from "../../App";
import { FirebaseContext } from "../../firebase";
import { ref, serverTimestamp, child, push } from "firebase/database";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Navigate, useNavigate } from "react-router-dom";

function ChatWindow() {
  const { snapshotChatting } = useContext(ChattingContext);
  const { data } = useContext(DatabaseContext);
  const { auth, firebase } = useContext(FirebaseContext);

  const navigate = useNavigate();

  const messageChating = useMemo(() => {
    return Object.values(snapshotChatting);
  }, [snapshotChatting]);

  const [form] = useForm();

  let inputValue = "";

  const handleInputChange = (e) => {
    inputValue = e.target.value;
  };

  const messageListRef = useRef(null);

  const handleOnSubmit = () => {
    if (inputValue !== "") {
      const uidUsername = auth.currentUser.uid;
      push(child(ref(firebase), `chatting/`), {
        username: data.users[uidUsername].username,
        photoUrl: data.users[uidUsername].img,
        uid: uidUsername,
        createAt: serverTimestamp(),
        message: inputValue,
      });
      form.resetFields(["message"]);
    }
  };

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messageChating]);

  return (
    <>
      <div className="chat_window">
        <div className="chat_window_header">
          <div className="chat_window_header_info">
            <p className="chat_window_header_title">Review room</p>
            <span className="chat_window_header_description">
              You can say anything
            </span>
          </div>
          <div className="chatroom_menu_back">
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              <FiArrowRight />
            </Button>
          </div>
        </div>
        <div className="chat_window_content">
          <div className="message_list" ref={messageListRef}>
            {messageChating.map((mess, index) => (
              <MessageChat
                sender={data.users[auth.currentUser.uid].username}
                key={index}
                text={mess.message}
                photoUrl={mess.photoUrl}
                displayName={mess.username}
                createAt={mess.createAt}
              />
            ))}
          </div>
          <div className="send_message">
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
