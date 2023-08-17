import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonNavigation from "../ButtonNavigation";
import SearchBar from "../SearchBar";
import ModalAdd from "../ModalAdd";
import TotalDiner from "../TotalDiner";
import UserIcon from "../UserIcon";
import "./style.css";

function HomePage() {
  const [showModal, setModalAdd] = useState(false);
  const buttonOpenModalAdd = () => {
    setModalAdd(true);
  };
  const buttonCloseModalAdd = () => {
    setModalAdd(false);
  };
  console.log("hello");

  const data = [
    {
      id: 1,
      name: "Dung Sushi",
      position: "19/6 Nghĩa Phát,P.6,Q.TB",
      price: "giá TB",
      like: 1000,
      dislike: 5,
      // good: ["đồ ăn ngon", "máy lạnh", "free gửi xe"],
      // bad: ["hay hết chỗ", "trong hẻm", "quán hơi hẹp"],
      img: "../../src/assets/Dung sushi.jpg",
    },
    {
      id: 2,
      name: "Lyn’s Chicken",
      position: "69 Tân Trang,P.9,Q.TB",
      price: "giá TB",
      like: 1000,
      dislike: 12,
      // good: ["đồ ăn ngon", "đa dạng sauce", "free giữ xe", "mở nhạc rap"],
      // bad: ["để xe tại cổng(không chỗ giữ)", "bán ít nước", "quán nhỏ"],
      img: "../../src/assets/lo dat bbq.jpg",
    },
    {
      id: 3,
      name: "Lò đất BBQ",
      position: "36 Vườn Lài,P.Tân Thành,Q.Tân Phú",
      price: "giá TB-mắc",
      like: 1000,
      dislike: 35,
      // good: [
      //   "đồ ăn đa dạng",
      //   "xá xị miễn phí",
      //   "quán rộng",
      //   "free giữ xe",
      //   "đồ ăn ngon",
      // ],
      // bad: ["hay bị làm phiền", "tự nấu nướng"],
      img: "../../src/assets/lynschicken.jpg",
    },
    {
      id: 4,
      name: "Lò đất BBQ",
      position: "36 Vườn Lài,P.Tân Thành,Q.Tân Phú",
      price: "giá TB-mắc",
      like: 1000,
      dislike: 100,
      // good: [
      //   "đồ ăn đa dạng",
      //   "xá xị miễn phí",
      //   "quán rộng",
      //   "free giữ xe",
      //   "đồ ăn ngon",
      // ],
      // bad: ["hay bị làm phiền", "tự nấu nướng"],
      img: "../../src/assets/lynschicken.jpg",
    },
  ];

  const navigate = useNavigate();
  useEffect(() => {
    const logged = localStorage.getItem("login");
    if (!logged) {       
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="header_title">
        <h2>Review Diner</h2>
        <UserIcon />
      </div>
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
