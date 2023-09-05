//Default
import { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
//Database
import { ref, child, get, onValue } from "firebase/database";
// import FirebaseProvider, { firebase } from "./firebase";
import { FirebaseContext } from "./firebase";
//Component
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import User from "./Components/User";
import DinerDetail from "./Components/DinerDetail";
import PopoverChat from "./Components/PopoverChat";
import ChatRoom from "./Components/ChatRoom";

//Khai báo context lưu Data để truyền
export const DatabaseContext = createContext();

function App() {
  const { firebase } = useContext(FirebaseContext);
  //Khai báo data truyền xuống + url của API firebase
  const [data, setData] = useState({});
  // Dùng useCallBack để getAPI lại sau khi thay đổi dataPath
  const fetchData = async () => {
    try {
      const dbRef = ref(firebase, "/");
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        setData(data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Gọi fetchData khi có biến giá trị thay đổi
    // Kiểm tra xem dataPath có thay đổi không
    fetchData("/");
  }, []); // Đặt fetchData vào mảng dependencies để useEffect gọi lại khi biến giá trị thay đổi

  return (
    <BrowserRouter>
      <div className="background">
        <DatabaseContext.Provider value={{ data, setData, fetchData }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/diner/:id" element={<DinerDetail />} />
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
          <PopoverChat />
        </DatabaseContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
