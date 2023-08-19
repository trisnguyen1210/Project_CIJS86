//Default
import { useContext, useEffect, useState } from "react";
import "./style.css";
//Framework
import { Input } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
////Database
import { DatabaseContext } from "../../App";

function User() {
  const { databaseUser, setDatabaseUser } = useContext(DatabaseContext);
  const checkedIdLogin = localStorage.getItem("login");
  const imageUrl = "../../src/assets/none_user.jpg"; // Thay bằng đường dẫn thực tế đến ảnh

  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    // Kiểm tra và gán giá trị cho dataUser dựa trên kiểu dữ liệu của databaseUser
    if (Object.keys(databaseUser).length > 0) {
      if (Array.isArray(databaseUser)) {
        const idUser = checkedIdLogin.split("_")[0];
        setDataUser(databaseUser[idUser]);
      } else {
        setDataUser(databaseUser);
      }
    }
  }, [databaseUser, checkedIdLogin, dataUser]);

  return (
    <>
      <div className="user_block">
        <h4> User</h4>
        <div className="user_block_body">
          <div className="user_block_image">
            <Image
              className="user_image"
              isZoomed
              width={240}
              alt="Zoom"
              src={imageUrl}
            />
            <div className="user_block_input_image">
              <input type="file" name="file" id="file" className="inputfile" />
              <label htmlFor="file">Choose a file</label>
            </div>
          </div>
          <div className="user_block_info">
            <h5>Thông tin cá nhân</h5>
            <Input
              isDisabled
              type="text"
              label="Username"
              value={dataUser.username}
              className="max-w-xs"
            />
            <form>
              <Input
                autoComplete="on"
                isDisabled
                type="password"
                label="Password"
                value={dataUser.password}
                className="max-w-xs"
              />
            </form>
            <Input
              isDisabled
              type="email"
              label="Email"
              value={dataUser.email}
              className="max-w-xs"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
