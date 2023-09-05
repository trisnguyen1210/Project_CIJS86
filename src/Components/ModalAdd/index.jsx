//Default
import { useContext } from "react";
import "./style.css";
//Framework
import {
  Input,
  Button,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
} from "@nextui-org/react";
//Context
import { dataHomePage } from "../HomePage";
//Database
import { ref, set, child } from "firebase/database";
import { FirebaseContext } from "../../firebase";

function ModalAdd() {
  const { showModalAdd, buttonCloseModalAdd, dataDiner } =
    useContext(dataHomePage);
  const { firebase } = useContext(FirebaseContext);

  let inputName = "";
  let inputPosition = "";
  let inputType = "";
  let inputImage = "";
  let inputPrice = "";

  const levelPrice = [
    { label: "low", value: "low", description: "low" },
    { label: "low-normal", value: "low-normal", description: "low-normal" },
    { label: "normal", value: "normal", description: "normal" },
    { label: "normal-high", value: "normal-high", description: "normal-high" },
    { label: "high", value: "high", description: "high" },
  ];

  async function addDataDinerFirebase() {
    const dbRef = ref(firebase);
    await set(child(dbRef, `diners/${dataDiner.length}`), {
      name: inputName,
      position: inputPosition,
      type: inputType,
      img: inputImage,
      id: dataDiner.length,
      like: 0,
      dislike: 0,
      price: inputPrice,
    });
    await set(child(dbRef, `menu/${dataDiner.length}`), "No Menu");
    buttonCloseModalAdd();
  }

  const handleFileImg = (event) => {
    const file = event.target.files[0]; // Lấy tệp đầu tiên từ danh sách đã chọn.
    if (file) {
      const reader = new FileReader();
      // Đọc tệp hình ảnh và chuyển đổi thành định dạng base64 khi hoàn thành.
      reader.onload = (e) => {
        const base64Image = e.target.result;
        // Cập nhật trạng thái với định dạng base64 của ảnh đã chọn.
        inputImage = base64Image;
      };

      // Đọc tệp hình ảnh như một URL dạng data URL (base64).
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {showModalAdd ? (
        <>
          <div>
            <div className="overlay"></div>
            <div className="modal_add">
              <div className="modal_add_header">
                <h2>Add more restaurant</h2>
                <button onClick={buttonCloseModalAdd}>X</button>
              </div>
              <div className="modal_add_input flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="Enter restaurant's name"
                  onChange={(e) => (inputName = e.target.value)}
                />
                <Input
                  type="text"
                  name="position"
                  label="Address"
                  placeholder="Enter restaurant's address"
                  onChange={(e) => (inputPosition = e.target.value)}
                />
                <form id="input_image">
                  <label htmlFor="file">Image diner:</label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={handleFileImg}
                  ></input>
                </form>
                <RadioGroup
                  className="modal_add_type"
                  label="Select your type diner:"
                  orientation="horizontal"
                  onChange={(e) => (inputType = e.target.value)}
                >
                  <Radio value="Bistro">Bistro</Radio>
                  <Radio value="Coffee/Dessert"> Coffee/Dessert</Radio>
                  <Radio value="Bakery"> Bakery</Radio>
                  <Radio value="Shop Online"> Shop Online</Radio>
                  <Radio value="Street food"> Street food</Radio>
                  <Radio value="Restaurant"> Restaurant</Radio>
                </RadioGroup>
                <form id="input_price">
                  <p>Level price:</p>
                  <Select
                    label="Level Price"
                    placeholder="Select a level"
                    className="max-w-xs"
                  >
                    {levelPrice.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </Select>
                </form>
              </div>
              <div className="btn-submit flex flex-wrap gap-4 items-center">
                <Button color="success" onClick={addDataDinerFirebase}>
                  Submit
                </Button>
                <Button color="warning" onClick={buttonCloseModalAdd}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
export default ModalAdd;
