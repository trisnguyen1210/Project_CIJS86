import { Row, Col } from "antd";
import ChatAvatar from "../ChatAvatar";
import ChatWindow from "../ChatWindow";
import "./style.css";
import { useContext, useEffect, createContext, useState } from "react";
import { FirebaseContext } from "../../firebase";
import { DatabaseContext } from "../../App";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

export const ChattingContext = createContext();

function ChatRoom() {
  const { auth } = useContext(FirebaseContext);
  const { data } = useContext(DatabaseContext);
  const [snapshotUser, setSnapshotUser] = useState({});
  const [snapshotChatting, setSnapshotChatting] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (data.users) {
      setSnapshotUser(data.users[auth.currentUser.uid]);
    }
    if (data.chatting) {
      setSnapshotChatting(Object.values(data.chatting));
    }
    if (data.users && data.chatting) {
      setIsLoaded(false);
    }
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, [data]);

  if (isLoaded) {
    return <Loading />;
  }
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
