//Default
import { useContext, useEffect, useState } from "react";
import "./style.css";
//Framework
import { Input } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
////Database
import { DatabaseContext } from "../../App";
import { auth, firebase } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { child, ref, update } from "firebase/database";

function User() {
  const { data } = useContext(DatabaseContext);
  const [dataUser, setDataUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const updateImgInDatabase = (base64Img) => {
    const dbRef = ref(firebase, `/users/${dataUser.uid}`);
    const dataUpdate = {
      username: `${dataUser.username}`,
      email: `${dataUser.email}`,
      img: `${base64Img}`,
      password: `${dataUser.password}`,
      uid: `${dataUser.uid}`,
    };
    update(dbRef, dataUpdate)
      .then(() => {
        console.log("Cập nhật ảnh thành công");
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật ảnh:", error);
      });
  };

  // Khai báo hàm xử lý khi người dùng chọn một tệp hình ảnh mới.
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Lấy tệp đầu tiên từ danh sách đã chọn.

    if (file) {
      const reader = new FileReader();

      // Đọc tệp hình ảnh và chuyển đổi thành định dạng base64 khi hoàn thành.
      reader.onload = (e) => {
        const base64Image = e.target.result;

        // Cập nhật trạng thái với định dạng base64 của ảnh đã chọn.
        setDataUser({ ...dataUser, img: base64Image });
        updateImgInDatabase(base64Image);
      };

      // Đọc tệp hình ảnh như một URL dạng data URL (base64).
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (data.users) {
          const showData = data.users[user.uid];
          setDataUser(showData);
        }
      } else {
        navigate("/login");
      }
    });
  }, [data]);

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
              src={dataUser.img}
            />
            <div className="user_block_input_image">
              <input
                type="file"
                name="file"
                id="file"
                className="inputfile"
                onChange={handleFileChange}
              />
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
