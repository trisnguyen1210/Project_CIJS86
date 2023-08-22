//Default
import "./style.css";
import { useContext } from "react";
//Context
import { dataHomePage } from "../HomePage";
//Components
import PopoverUser from "../PopoverUser";
//Framework
import { Avatar, Dropdown, DropdownTrigger } from "@nextui-org/react";

function UserIcon() {
  const { dataIconUser, setButtonLogin } = useContext(dataHomePage);
  return (
    <>
      <div className="user_icon flex gap-4 items-center">
        <p>{dataIconUser.username}</p>
        <Dropdown>
          <DropdownTrigger>
            <Avatar isBordered color="default" src={dataIconUser.img} />
          </DropdownTrigger>
          <PopoverUser setButtonLogin={setButtonLogin} />
        </Dropdown>
      </div>
    </>
  );
}
export default UserIcon;
