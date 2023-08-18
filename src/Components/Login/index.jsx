//Default
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
//Database
import { DatabaseContext } from "../../App";
//FrameWork
import { EyeSlashFilledIcon } from "../../Framework/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../Framework/EyeFilledIcon";
import { UserIcon, CameraIcon, HeartIcon } from "../../Framework/Button_login";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

function Login() {
  //Khai báo Context sử dụng + navigate
  const database = useContext(DatabaseContext);
  const navigate = useNavigate();

  //Khai báo icon + function show password
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  //Khai báo value input
  let username = "";
  let password = "";

  //Khai báo Function để getDatabases khi click và so sánh: Đúng --> HomePage / Sai --> Login lại + show warning
  const [failLogin, setFailLogin] = useState(false);
  const handleSignIn = () => {
    let found = false;
    if (Object.keys(database).length > 0) {
      database.map((element) => {
        if (element.username === username && element.password === password) {
          localStorage.setItem("login", username);
          found = true;
          setFailLogin(false);
          navigate("/homepage");
        }
      });
    }
    if (!found) {
      console.log(database);
      setFailLogin(true);
    }
  };

  //Lưu login vào Storage + Check đã login chưa
  useEffect(() => {
    const logged = localStorage.getItem("login");
    if (logged) {
      navigate("/homepage");
    }
  }, [failLogin, database, navigate]);

  return (
    <>
      <div className="login">
        <div className="login_header">
          <h2>Đăng nhập</h2>
        </div>
        <div className="login_input">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input
              type="text"
              label="Username"
              onChange={(e) => {
                username = e.target.value;
              }}
            />
          </div>
        </div>
        <div className="login_input">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <form>
              <Input
                label="Password"
                onChange={(e) => {
                  password = e.target.value;
                }}
                autoComplete="on"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-xs"
              />
            </form>
          </div>
        </div>
        {failLogin ? (
          <>
            <div id="user_login_fail">Wrong username or password</div>
          </>
        ) : (
          <></>
        )}
        <div className="login_button">
          <div className="flex gap-4 items-center">
            <Button
              onClick={handleSignIn}
              color="success"
              variant="bordered"
              startContent={<UserIcon />}
            >
              <p>Sign in</p>
            </Button>
            <Button
              onClick={handleSignIn}
              color="primary"
              variant="bordered"
              startContent={<HeartIcon />}
            >
              <p>Sign up</p>
            </Button>
          </div>
          <div id="btn_try" className="flex gap-4 items-center justify-center">
            <Button
              onClick={handleSignIn}
              color="warning"
              variant="bordered"
              startContent={<CameraIcon />}
            >
              <p>Try me free</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
