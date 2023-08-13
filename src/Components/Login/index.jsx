import { Button } from "@nextui-org/react";
import { UserIcon, CameraIcon, HeartIcon } from "../../Framework/Button_login";
import { Input } from "@nextui-org/react";
import "./style.css";

function Login() {
  return (
    <>
      <div className="login">
        <div className="login_header">
          <h2>Đăng nhập</h2>
        </div>
        <div className="login_input">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input type="username" label="Username" />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input type="password" label="Password" />
          </div>
        </div>
        <div className="login_button">
          <div className="flex gap-4 items-center">
            <Button
              color="success"
              variant="bordered"
              startContent={<UserIcon />}
            >
              <p>Sign in</p>
            </Button>
            <Button
              color="primary"
              variant="bordered"
              startContent={<HeartIcon />}
            >
              <p>Sign up</p>
            </Button>
          </div>
          <div id="btn_try" className="flex gap-4 items-center justify-center">
            <Button
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
