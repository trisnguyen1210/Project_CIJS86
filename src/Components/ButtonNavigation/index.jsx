import { Button } from "@nextui-org/react";
import "./style.css";

function ButtonNavigation(props) {
  const { buttonOpenModalAdd } = props;
  return (
    <>
      <Button
        id="AddDiner"
        onClick={buttonOpenModalAdd}
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-black shadow-lg"
      >
        Add Diner
      </Button>
      <Button
        id="Credit"
        radius="full"
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-black shadow-lg"
      >
        Credit
      </Button>
    </>
  );
}

export default ButtonNavigation;
