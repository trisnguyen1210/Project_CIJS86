import PopoverUser from "../PopoverUser";
import { useState } from "react";
import { Avatar, Dropdown, DropdownTrigger } from "@nextui-org/react";
import "./style.css";
function UserIcon() {
  const nameUser = localStorage.getItem("login");
  const [fileUrl, setFileUrl] = useState("../../src/assets/none_user.jpg");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        console.log(event.target.result);
        setFileUrl(event.target.result);
      };

      reader.readAsDataURL(file); // Đọc tệp dưới dạng URL base64
    } else {
      setFileUrl("");
    }
  };

  return (
    <>
      <div className="user_icon flex gap-4 items-center">
        <p>{nameUser}</p>
        <Dropdown>
          <DropdownTrigger>
            <Avatar isBordered color="default" src={fileUrl} />
          </DropdownTrigger>
          <PopoverUser handleFileChange={handleFileChange} />
        </Dropdown>
      </div>
    </>
  );
}
export default UserIcon;
