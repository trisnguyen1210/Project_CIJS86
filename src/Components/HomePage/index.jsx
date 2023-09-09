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
import Loading from "../Loading";
//Database
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseContext } from "../../firebase";
//Context
import { DatabaseContext } from "../../App";

export const dataHomePage = createContext();

function HomePage() {
  //Khai báo để dùng navigate + useContext
  const navigate = useNavigate();
  const { auth } = useContext(FirebaseContext);
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
  const [isLoading, setIsLoading] = useState(true);
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

  const handleFavoriteSearch = (userUid) => {
    if (data.users[userUid].favorite) {
      const searchQuery = Object.values(data.users[userUid].favorite);
      const matchingDinerSearch = dataDiner.filter((diner) =>
        searchQuery.some((query) => diner.name.includes(query))
      );
      setDataDiner(matchingDinerSearch);
    } else {
      alert("You haven't added a favorite yet");
    }
  };

  //Khai báo nút add thêm Diner
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

  //Dùng useEffect để lấy data firebase, user và setup nút login
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
    if (data.diners && data.menu) {
      setIsLoading(false);
    }
  }, [data, showButtonLogin, isLoading]);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  
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
          handleFavoriteSearch,
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
