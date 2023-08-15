import PopoverUser from "../PopoverUser";
import { useState } from "react";
import { Avatar, Dropdown, DropdownTrigger } from "@nextui-org/react";
import "./style.css";
function User() {
  const nameUser = localStorage.getItem("login");
  const [avatarImage, setAvatarImage] = useState("../../src/assets/User.png");
  const [fileUrl, setFileUrl] = useState("../../src/assets/User.png");

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
        <div>
          <h1>Upload a File</h1>
          <input type="file" onChange={handleFileChange} />
          <p>Uploaded File URL: {fileUrl || "No file selected."}</p>
        </div>
      </div>
    </>
  );
}
export default User;
