import { Avatar, Button, Typography } from "antd";
import { Row } from "antd";
import "./style.css";
import { useContext } from "react";
import { ChattingContext } from "../ChatRoom";
function ChatAvatar() {
  const { snapshotUser } = useContext(ChattingContext);

  return (
    <>
      <div className="chat_avatar">
        <Row>
          <div className="chat_avatar_form">
            <div>
              <Avatar src={snapshotUser.img}></Avatar>
              <Typography.Text className="chat_avatar_name">
                {snapshotUser.username}
              </Typography.Text>
            </div>
            <Button>Đăng xuất</Button>
          </div>
        </Row>
      </div>
    </>
  );
}
export default ChatAvatar;
