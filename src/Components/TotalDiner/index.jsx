import { User as Diner } from "@nextui-org/react";
import { Code } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Framework
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "@nextui-org/react";
import { CheckIcon } from "../../Framework/CheckIcon";
import { Chip } from "@nextui-org/react";
//Default
import "./style.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
//Context
import { dataHomePage } from "../HomePage";

function TotalDiner() {
  const { dataDiner } = useContext(dataHomePage);
  const navigate = useNavigate();

  function calculatorLiked(id) {
    let variableLike = 0;
    if (dataDiner[id]?.reviewVote) {
      variableLike = Object.values(dataDiner[id].reviewVote).filter(
        (foo) => foo === 1
      ).length;
    }
    return variableLike;
  }
  function calculatorDisliked(id) {
    let variableDislike = 0;
    if (dataDiner[id]?.reviewVote) {
      variableDislike = Object.values(dataDiner[id].reviewVote).filter(
        (foo) => foo === -1
      ).length;
    }
    return variableDislike;
  }

  return dataDiner.length > 0 ? (
    <>
      <div className="diner_total">
        {dataDiner.map((item, index) => (
          <div
            className="diner_item"
            key={item.id}
            onClick={() => {
              navigate(`/diner/${item.id}`);
            }}
          >
            <Diner
              name={item.name}
              description={item.position}
              avatarProps={{
                src: item.img,
              }}
            />
            <Divider className="my-4" />
            <div className="diner_footer">
              <div className="hashtag">
                <Chip
                  startContent={<CheckIcon size={18} />}
                  variant="faded"
                  color="success"
                >
                  {item.type}
                </Chip>
              </div>
              <div className="status">
                <div className="flex flex-wrap gap-4">
                  <Code color="success">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    {item.like + calculatorLiked(index)}
                  </Code>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Code color="danger">
                    <FontAwesomeIcon icon={faThumbsDown} />
                    {item.dislike + calculatorDisliked(index)}
                  </Code>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <></>
  );
}
export default TotalDiner;
