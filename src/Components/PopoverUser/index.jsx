//Framework
import { DropdownMenu, DropdownItem } from "@nextui-org/react";
//Default
import { useNavigate } from "react-router-dom";
import "./style.css";
//Database
import { FirebaseContext } from "../../firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";

function PopoverUser(props) {
  const { auth } = useContext(FirebaseContext);
  const { setButtonLogin } = props;
  const navigate = useNavigate();

  // Đăng xuất người dùng
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Đăng xuất thành công
        setButtonLogin(true);
        console.log("Đăng xuất thành công");
      })
      .catch((error) => {
        // Xử lý lỗi ở đây
        console.error("Lỗi đăng xuất:", error.message);
      });
  };

  return (
    <>
      <div className="user_popover_content">
        <div className="user_dropdown">
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              key="My info"
              onClick={() => {
                navigate("/user");
              }}
            >
              My info
            </DropdownItem>
            <DropdownItem
              key="Logout"
              className="text-danger"
              color="danger"
              onClick={handleLogout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}

export default PopoverUser;
