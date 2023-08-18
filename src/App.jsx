//Default
import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
//Database
import { firebase } from "./firebase";
import { ref, child, get } from "firebase/database";
//Component
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import User from "./Components/User";

//Khai báo context lưu Data để truyền
export const DatabaseContext = createContext();

function App() {
  const [database, setDatabase] = useState({});
  useEffect(() => {
    const dbRef = ref(firebase);
    get(child(dbRef, `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDatabase(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="background">
        <DatabaseContext.Provider value={database}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </DatabaseContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
