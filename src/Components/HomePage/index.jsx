//Default
import { useState, useEffect, useContext, createContext } from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import "./style.css";

//Components
import ButtonNavigation from "../ButtonNavigation";
import SearchBar from "../SearchBar";
import ModalAdd from "../ModalAdd";
import TotalDiner from "../TotalDiner";
import UserIcon from "../UserIcon";
//Database
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
//Context
import { DatabaseContext } from "../../App";

export const dataHomePage = createContext();

function HomePage() {
  //Khai báo để dùng navigate + useContext
  const navigate = useNavigate();
  const { data } = useContext(DatabaseContext);

  //Khai báo để truyền data vào component IconUser nếu chưa có thì hiện button Login
  const [dataIconUser, setDataIconUser] = useState(data);
  const [showButtonLogin, setButtonLogin] = useState(true);

  //*
  const [showModalAdd, setModalAdd] = useState(false);
  const [showModalDiner, setModalDiner] = useState({
    isOpen: false,
    index: null,
  });

  //Khai báo State để find và dùng SeachBar
  const [dataDinerOrginal, setDataDinerOriginal] = useState(data);
  const [dataDiner, setDataDiner] = useState([]);
  const [dataMenu, setDataMenu] = useState([]);

  //Khai báo hàm để dùng Searchbar
  const handleSearch = (searchQuery) => {
    const normalizedSearchQuery = searchQuery.toLowerCase();
    if (normalizedSearchQuery === "") {
      setDataDiner(dataDinerOrginal); // Hiển thị lại danh sách ban đầu
    } else {
      const matchingDinerSearch = dataDiner.filter((diner) =>
        diner.name.toLowerCase().includes(normalizedSearchQuery)
      );
      setDataDiner(matchingDinerSearch);
    }
  };

  const buttonOpenModalAdd = () => {
    setModalAdd(true);
  };
  const buttonCloseModalAdd = () => {
    setModalAdd(false);
  };

  //Khai báo hàm để lấy data user từ data context
  const dataUid = (userUid) => {
    const desiredData = data.users[userUid];
    setDataIconUser(desiredData);
  };

  useEffect(() => {
    if (data.diners) {
      setDataDiner(data.diners);
      setDataDinerOriginal(data.diners);
    }
    if (data.menu) {
      setDataMenu(data.menu);
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setButtonLogin(false);
        if (data.users) {
          dataUid(user.uid);
        }
      } else {
      }
    });
  }, [data, showButtonLogin]);

  return (
    <>
      <dataHomePage.Provider
        value={{
          dataIconUser,
          setButtonLogin,
          handleSearch,
          buttonOpenModalAdd,
          showModalAdd,
          buttonCloseModalAdd,
          dataDiner,
          setModalDiner,
          showModalDiner,
          dataMenu,
        }}
      >
        <div className="header_title">
          <h2>Review Diner</h2>
          {showButtonLogin ? (
            <Button
              radius="full"
              className="bg-gradient-to-tr text-black shadow-lg"
              style={{ margin: "50px" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          ) : (
            <UserIcon />
          )}
        </div>
        <div className="header_navigation">
          <SearchBar />
          <div>
            <ButtonNavigation />
            <ModalAdd />
          </div>
        </div>
        <TotalDiner />
      </dataHomePage.Provider>
    </>
  );
}

export default HomePage;
