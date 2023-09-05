import "./style.css";

function DinerMenu(props) {
  const { dinerMenu } = props;
  return (
    <>
      <div className="menu_items">
        <h3>Menu</h3>
        {dinerMenu ? (
          <>
            {Object.entries(dinerMenu).map(([key, value]) => (
              <div key={key} className="menu_list_item">
                <p>{key}</p>
                <p>{value.toLocaleString("en-US")}</p>
              </div>
            ))}
          </>
        ) : (
          <p>Updating menu</p>
        )}
      </div>
    </>
  );
}
export default DinerMenu;
