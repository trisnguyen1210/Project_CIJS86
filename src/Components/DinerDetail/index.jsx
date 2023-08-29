//Deffault
import { useContext, useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
//Context
import { DatabaseContext } from "../../App";
import { useParams } from "react-router-dom";
//Framework
import { FiArrowLeft } from "react-icons/fi";
import { Button } from "@nextui-org/react";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Code } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DinerDetail() {
  const { data } = useContext(DatabaseContext);
  const { id } = useParams();
  const [dinerMenu, setDataMenu] = useState([]);
  const [dinerInfo, setDataInfo] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (data.menu) {
      setDataMenu(data.menu[id]);
    }
    if (data.diners) {
      setDataInfo(data.diners[id]);
    }
  });

  return (
    <>
      <div className="diner_detail">
        <div className="menu_title">
          <div className="menu_title_name">
            <h2>{dinerInfo.name}</h2>
          </div>
          <div className="menu_back">
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              <FiArrowLeft />
              Back
            </Button>
          </div>
        </div>

        <div className="menu_data">
          <div>
            <div className="menu_img">
              <img src={dinerInfo.img} />
              <p>{dinerInfo.position}</p>
            </div>
            <div>
              <Code color="success">
                <FontAwesomeIcon icon={faThumbsUp} />
                {dinerInfo.like}
              </Code>
              <Code color="danger">
                <FontAwesomeIcon icon={faThumbsDown} />
                {dinerInfo.dislike}
              </Code>
            </div>
          </div>
          <div className="menu_items">
            <h3>Menu</h3>
            {Object.entries(dinerMenu).map(([key, value], index) => (
              <div key={index} className="menu_list_item">
                <p>{key}</p>  
                <p>{value.toLocaleString("en-US")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default DinerDetail;
