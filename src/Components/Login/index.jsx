import { Button } from "@nextui-org/react";
import { UserIcon, CameraIcon, HeartIcon } from "../../Framework/Button_login";
import { Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../../Framework/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../Framework/EyeFilledIcon";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

function Login() {
  let username = "";
  const navigate = useNavigate();
  const handleSignIn = () => {
    localStorage.setItem("login", username);
    navigate("/homepage");
  };

  useEffect(() => {
    const logged = localStorage.getItem("login");
    if (logged) {
      navigate("/homepage");
    }
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
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
