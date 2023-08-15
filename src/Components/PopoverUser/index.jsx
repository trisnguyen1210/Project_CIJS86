import React from "react";
import { DropdownMenu, DropdownItem } from "@nextui-org/react";
import "./style.css";
function PopoverUser(props) {
  const { setFileUrl } = props;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const newFileUrl = event.target.result;
        console.log(newFileUrl);
        setFileUrl(newFileUrl);
      };

      reader.readAsDataURL(file); // Đọc tệp dưới dạng URL base64
    } else {
      setFileUrl("");
    }
  };
  return (
    <>
      <div className="user_popover_content">
        <div className="user_dropdown">
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="My info">My info</DropdownItem>
            <DropdownItem
              key="Change image"
              textValue="Change image"
              className="change-image-dropdown"
            >
              Change image
              <input type="file" onChange={handleFileChange} className="input_file"></input>
            </DropdownItem>
            <DropdownItem key="Logout" className="text-danger" color="danger">
              Logout
            </DropdownItem>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}

export default PopoverUser;
