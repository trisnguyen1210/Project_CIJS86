//Deffault
import { useContext } from "react";
import "./style.css";
//Context
import { dataHomePage } from "../HomePage";
import { DatabaseContext } from "../../App";

function ModalDiner() {
  const { dataMenu, dataDiner, setModalDiner, showModalDiner } =
    useContext(dataHomePage);

  const dinerInfo = dataDiner[showModalDiner.index];
  const dinerMenu = dataMenu[showModalDiner.index];

  let dd = [];
  if (dinerMenu) {
    dd = Object.entries(dinerMenu);
  }
  // const dinerMenu = data.menu[showModalDiner.index];
  const closeModal = () => {
    setModalDiner({ isOpen: false, index: null });
  };

  return showModalDiner.isOpen ? (
    <>
      <div>
        <div className="overlay"></div>
        <div className="modal_add">
          <div className="modal_add_header">
            <h2>{dinerInfo.name}</h2>
            <button onClick={closeModal}>X</button>
          </div>
          <img src={dinerInfo.img} />
          <p>{dinerInfo.position}</p>
          {dd.map((item) => console.log(item))}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
export default ModalDiner;
