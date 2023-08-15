import { User as Diner } from "@nextui-org/react";
import { Code } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
import "./style.css";
// import ModalDiner from "../ModalDiner";

function TotalDiner(props) {
  const { data } = props;
  return (
    <>
      <div className="diner_total">
        {data.map((item) => (
          <div className="diner_item" key={item.id}>
            <Diner
              name={item.name}
              description={item.position}
              avatarProps={{
                src: item.img,
              }}
            />
            <div className="status">
              <div className="flex flex-wrap gap-4">
                <Code color="success">
                  <FontAwesomeIcon icon={faThumbsUp} />
                  {item.like}
                </Code>
              </div>
              <div className="flex flex-wrap gap-4">
                <Code color="danger">
                  <FontAwesomeIcon icon={faThumbsDown} />
                  {item.dislike}
                </Code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default TotalDiner;
