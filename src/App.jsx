//Default
import { useState, useEffect, createContext, useCallback } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
//Database
import { ref, child, get } from "firebase/database";
import { firebase } from "./firebase";
//Component
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import User from "./Components/User";

//Khai báo context lưu Data để truyền
export const DatabaseContext = createContext();

function App() {
  //Khai báo data truyền xuống + url của API firebase
  const [data, setData] = useState({});
  const [dataPath, setDataPath] = useState("/");
  // Dùng useCallBack để getAPI lại sau khi thay đổi dataPath
  const fetchData = async () => {
    try {
      const dbRef = ref(firebase);
      const snapshot = await get(child(dbRef, dataPath));
      if (snapshot.exists()) {
        setData(snapshot.val());
        // console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
      // Implement error handling here
    }
  };

  useEffect(() => {
    // Gọi fetchData khi có biến giá trị thay đổi
    // Kiểm tra xem dataPath có thay đổi không
    fetchData();
  }, [dataPath]); // Đặt fetchData vào mảng dependencies để useEffect gọi lại khi biến giá trị thay đổi

  return (
    <BrowserRouter>
      <div className="background">
        <DatabaseContext.Provider value={{ data, setData, setDataPath }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </DatabaseContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
