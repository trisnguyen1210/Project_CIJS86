import { User as Diner } from "@nextui-org/react";

import "./style.css";
function TotalDiner(props) {
  const { data } = props;
  console.log(data);
  return (
    <>
      <div className="diner_total">
        {data.map((item) => (
          <div className="diner_item">
            <Diner
              key={item.id}
              name={item.name}
              description={item.position}
              avatarProps={{
                src: item.img,
              }}
            />
            <p>Like</p>
            <p>Dislike</p>
          </div>
        ))}
      </div>
    </>
  );
}
export default TotalDiner;
