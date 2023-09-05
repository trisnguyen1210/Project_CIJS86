//Framework
import { Button } from "@nextui-org/react";
//Default
import "./style.css";
import { useContext } from "react";
//Context
import { dataHomePage } from "../HomePage";

function ButtonNavigation() {
  const { buttonOpenModalAdd, handleFavoriteSearch, dataIconUser } =
    useContext(dataHomePage);
  const userUid = dataIconUser.uid;

  return (
    <>
      <Button
        id="AddDiner"
        onClick={buttonOpenModalAdd}
        radius="full"
        className="bg-gradient-toF-tr from-pink-500 to-yellow-500 text-black shadow-lg"
      >
        Add Diner
      </Button>
      <Button
        id="Credit"
        onClick={() => {
          handleFavoriteSearch(userUid);
        }}
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-black shadow-lg"
      >
        My Favorite
      </Button>
    </>
  );
}

export default ButtonNavigation;
