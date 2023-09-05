import { Row, Col } from "antd";
import ChatAvatar from "../ChatAvatar";
import ChatWindow from "../ChatWindow";
import "./style.css";
import { useContext, useEffect, createContext, useState } from "react";
import { FirebaseContext } from "../../firebase";
import { DatabaseContext } from "../../App";

export const ChattingContext = createContext();

function ChatRoom() {
  const { auth } = useContext(FirebaseContext);
  const { data } = useContext(DatabaseContext);
  const [snapshotUser, setSnapshotUser] = useState({});
  const [snapshotChatting, setSnapshotChatting] = useState([]);

  useEffect(() => {
    if (data.users) {
      setSnapshotUser(data.users[auth.currentUser.uid]);
    }
    if (data.chatting) {
      setSnapshotChatting(Object.values(data.chatting));
    }
  }, [data, auth]);

  return (
    <>
      <div className="chat_room">
        <ChattingContext.Provider value={{ snapshotUser, snapshotChatting }}>
          <Row>
            <Col span={8}>
              <ChatAvatar />
            </Col>
            <Col span={16}>
              <ChatWindow />
            </Col>
          </Row>
        </ChattingContext.Provider>
      </div>
    </>
  );
}

export default ChatRoom;
