import "./style.css";
import { Tooltip, Button } from "@nextui-org/react";
import img from "../../assets/test.png";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseContext } from "../../firebase";

function PopoverChat() {
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
  let goToRoom = false;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      goToRoom = true;
    }
  });

  const navigateRoom = () => {
    if (goToRoom === false) {
      alert("You aren't login");
      navigate("/login");
    } else {
      navigate("/chatroom");
    }
  };

  return (
    <>
      <div className="popover_chat">
        <div className="flex flex-wrap md:inline-grid md:grid-cols-3 gap-4">
          <Tooltip
            className="popover_chat_hovered"
            key={"left-start"}
            placement={"left-start"}
            content={"contact with me"}
            color="secondary"
          >
            <Button
              onClick={navigateRoom}
              variant="flat"
              color="secondary"
              className="capitalize popover_chat_img"
            >
              <img src={img} alt="Button Image" />
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default PopoverChat;
