import "./style.css";
import { Input } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

function User() {
  const userName = localStorage.getItem("login"); // Thay bằng tên người dùng thực tế
  const imageUrl = "../../src/assets/none_user.jpg"; // Thay bằng đường dẫn thực tế đến ảnh

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
              <input type="file" name="file" id="file" class="inputfile" />
              <label for="file">Choose a file</label>
            </div>
          </div>
          <div className="user_block_info">
            <h5>Thông tin cá nhân</h5>
            <Input
              isDisabled
              type="text"
              label="Username"
              defaultValue={userName}
              className="max-w-xs"
            />
            <Input
              isDisabled
              type="password"
              label="password"
              defaultValue="xxxxxxxxxxxxxxx"
              className="max-w-xs"
            />
            <Input
              isDisabled
              type="email"
              label="Email"
              defaultValue="junior@nextui.org"
              className="max-w-xs"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
