import { child, ref, set } from "firebase/database";
import "./style.css";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";

function DinerMenu(props) {
  const { dinerMenu, id } = props;
  const { firebase } = useContext(FirebaseContext);
  const [menuData, setMenuData] = useState(dinerMenu);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const parsedMenu = JSON.parse(event.target.result);
          setMenuData(parsedMenu);
          pushMenu(parsedMenu);
        } catch (error) {
          console.error("Error parsing JSON file: ", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const pushMenu = (dataPush) => {
    const dbRef = ref(firebase);
    set(child(dbRef, `/menu/${id}/`), dataPush);
  };

  useEffect(() => {
    if (dinerMenu) {
      setMenuData(dinerMenu);
    }
  }, [dinerMenu]);

  return (
    <>
      <div className="menu_items">
        <h3>Menu</h3>
        {menuData ? (
          <>
            {Object.entries(menuData).map(([key, value]) => (
              <div key={key} className="menu_list_item">
                <p>{key}</p>
                <p>{value.toLocaleString("en-US")}</p>
              </div>
            ))}
            <div className="menu_items_update">
              <label htmlFor="fileInput">Updating menu...</label>
              <input
                type="file"
                id="fileInput"
                accept=".json"
                onChange={handleFileChange}
              />
            </div>
          </>
        ) : (
          <div className="menu_items_update">
            <label htmlFor="fileInput">Updating menu...</label>
            <input
              type="file"
              id="fileInput"
              accept=".json"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
    </>
  );
}
export default DinerMenu;
