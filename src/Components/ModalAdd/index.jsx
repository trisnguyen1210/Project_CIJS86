//Default
import { useContext } from "react";
import "./style.css";
//Context
import { dataHomePage } from "../HomePage";
function ModalAdd() {
  const { showModalAdd, buttonCloseModalAdd } = useContext(dataHomePage);
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
              <p>
                Add more restauranAd qui in elit amet duis incididunt sunt ipsum
                deserunt ullamco incididunt irure duis. Sit dolor adipisicing
                consectetur minim aute esse enim ea duis nisi. Ex id ad in
                veniam minim sunt dolore culpa esse qui sunt. Elit ex cupidatat
                pariatur cillum cupidatat commodo labore do officia tempor nisi
                nulla. Ad sit laborum irure eiusmod esse laborum dolor nostrud
                ad nisi duis commodo do aliquip. Consectetur consequat deserunt
                excepteur quis cillum labore id ipsum mollit dolor officia do
                adipisicing adipisicing. Nulla aute veniam dolor do laboris
                nulla Lorem fugiat Lorem irure sit fugiat commodo. Ea cillum
                nisi sint tempor adipisicing enim elit laboris ad proident in
                veniam dolor ullamco. Velit ipsum eu sunt velit aute consectetur
                consectetur nisi excepteur cupidatat aliquip id magna eu.
                Adipisicing ullamco nostrud pariatur dolor ad mollit nostrud id
                adipisicing cillum cupidatat ex in eu. Culpa minim enim minim
                sit dolor sint dolor sit dolore consequat tempor sint. Culpa qui
                ad excepteur duis consequat Lorem esse reprehenderit nostrud.
                Sunt cillum anim consequat dolore non. Occaecat sint sit dolore
                sit proident amet. Eu do magna deserunt Lorem magna dolor
                reprehenderit. Esse consectetur nisi incididunt excepteur id do.
                Eu consectetur proident velit quis ex proident. Enim culpa
                fugiat est laborum ad aliqua elit exercitation fugiat cupidatat
                enim qui dolore. Ut pariatur labore ex incididunt do. Fugiat
                ullamco quis laborum excepteur occaecat duis et cillum sint quis
                Lorem. Qui Lorem commodo deserunt qui proident pariatur est ex
                duis eiusmod elit minim tempor. Labore irure est sint aliqua.
                Dolore adipisicing fugiat id in veniam consectetur. Dolor minim
                sit labore enim ea sit elit sunt sit non ut ullamco. Est ad
                commodo ad ut dolor qui qui irure. Dolor ipsum et sint nostrud
                Lorem dolore deserunt eiusmod aliquip. Elit ut nisi dolore ipsum
                Lorem ut ipsum exercitation officia incididunt qui culpa mollit
                minim. Labore dolor magna deserunt eiusmod et ad nulla
              </p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {/* End Modal */}
    </>
  );
}
export default ModalAdd;
