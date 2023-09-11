import { Avatar, Button, Typography } from "antd";
import { Row } from "antd";
import "./style.css";
import { useContext } from "react";
import { ChattingContext } from "../ChatRoom";
import { signOut } from "firebase/auth";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router-dom";

function ChatAvatar() {
  const { auth } = useContext(FirebaseContext);
  const { snapshotUser } = useContext(ChattingContext);
  const navigate = useNavigate();
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Đăng xuất thành công");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Lỗi đăng xuất:", error.message);
      });
  };
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
            <Button onClick={handleLogOut}>Đăng xuất</Button>
          </div>
        </Row>
      </div>
    </>
  );
}
export default ChatAvatar;
