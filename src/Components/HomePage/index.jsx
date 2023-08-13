import { useState } from "react";
import ButtonNavigation from "../ButtonNavigation";
import SearchBar from "../SearchBar";
import ModalAdd from "../ModalAdd";
import "./style.css";
import TotalDiner from "../TotalDiner";

function HomePage() {
  const [showModal, setModalAdd] = useState(false);
  const buttonOpenModalAdd = () => {
    setModalAdd(true);
  };
  const buttonCloseModalAdd = () => {
    setModalAdd(false);
  };

  const data = [
    {
      id: 1,
      name: "Dung Sushi",
      position: "19/6 Nghĩa Phát,P.6,Q.TB",
      price: "giá TB",
      good: ["đồ ăn ngon", "máy lạnh", "free gửi xe"],
      bad: ["hay hết chỗ", "trong hẻm", "quán hơi hẹp"],
      img: "../../src/assets/Dung sushi.jpg",
    },
    {
      id: 2,
      name: "Lyn’s Chicken",
      position: "69 Tân Trang,P.9,Q.TB",
      price: "giá TB",
      good: ["đồ ăn ngon", "đa dạng sauce", "free giữ xe", "mở nhạc rap"],
      bad: ["để xe tại cổng(không chỗ giữ)", "bán ít nước", "quán nhỏ"],
      img: "../../src/assets/lo dat bbq.jpg",
    },
    {
      id: 3,
      name: "Lò đất BBQ",
      position: "36 Vườn Lài,P.Tân Thành,Q.Tân Phú",
      price: "giá TB-mắc",
      good: [
        "đồ ăn đa dạng",
        "xá xị miễn phí",
        "quán rộng",
        "free giữ xe",
        "đồ ăn ngon",
      ],
      bad: ["hay bị làm phiền", "tự nấu nướng"],
      img: "../../src/assets/lynschicken.jpg",
    },    {
      id: 4,
      name: "Lò đất BBQ",
      position: "36 Vườn Lài,P.Tân Thành,Q.Tân Phú",
      price: "giá TB-mắc",
      good: [
        "đồ ăn đa dạng",
        "xá xị miễn phí",
        "quán rộng",
        "free giữ xe",
        "đồ ăn ngon",
      ],
      bad: ["hay bị làm phiền", "tự nấu nướng"],
      img: "../../src/assets/lynschicken.jpg",
    },
  ];

  return (
    <>
      <h2>Review Diner</h2>
      <div className="header_navigation">
        <SearchBar />
        <div>
          <ButtonNavigation buttonOpenModalAdd={buttonOpenModalAdd} />
          <ModalAdd
            showModal={showModal}
            buttonCloseModalAdd={buttonCloseModalAdd}
          />
        </div>
      </div>
      <TotalDiner data={data} />
    </>
  );
}

export default HomePage;
