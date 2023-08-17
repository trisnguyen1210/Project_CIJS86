import { DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function PopoverUser() {
  function handleLogout() {
    localStorage.removeItem("login");
    window.location.href = "/";
  }
  const navigate = useNavigate();
  const handleMyUser = () => {
    navigate("/user");
  };

  return (
    <>
      <div className="user_popover_content">
        <div className="user_dropdown">
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="My info" onClick={handleMyUser}>
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
