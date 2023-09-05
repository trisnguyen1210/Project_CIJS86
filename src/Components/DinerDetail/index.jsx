//Deffault
import { useContext, useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
//Context
import { DatabaseContext } from "../../App";
import { useParams } from "react-router-dom";
//Framework
import { FiArrowLeft } from "react-icons/fi";
import { Button } from "@nextui-org/react";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/Bi";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Code } from "@nextui-org/react";
//Database
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseContext } from "../../firebase";
import { ref, child, set, remove } from "firebase/database";
//Components
import DinerMenu from "../DinerMenu";

function DinerDetail() {
  //Khai báo Context + navigate + id Diner dùng hook Params
  const { auth, firebase } = useContext(FirebaseContext);
  const {
    data: { menu, diners, users },
  } = useContext(DatabaseContext);
  const { id } = useParams();
  const navigate = useNavigate();

  //Khai báo các State
  const [dinerMenu, setDataMenu] = useState([]);
  const [dinerInfo, setDataInfo] = useState({});
  const [favorite, setFavorite] = useState(false);
  const [userUid, setUserUid] = useState(null);
  const [review, setReview] = useState(0);

  //Khai báo các hàm cho event Add-favorite
  function changeStateFavoriteFireBase(state, uid, id, dinerName) {
    const dbRef = ref(firebase);
    const userFavoriteRef = child(dbRef, `users/${uid}/favorite/${id}`);
    if (state === true) {
      set(userFavoriteRef, dinerName);
    } else {
      remove(userFavoriteRef);
    }
  }
  const handleFavoriteBtn = () => {
    setFavorite(!favorite);
    if (!favorite) {
      changeStateFavoriteFireBase(true, userUid, dinerInfo.id, dinerInfo.name);
    } else {
      changeStateFavoriteFireBase(false, userUid, dinerInfo.id, dinerInfo.name);
    }
  };

  //Khai báo các hàm cho event Vote
  function handleStateRevew(uid, id, vote) {
    let unReview = false;
    if (review === vote) {
      unReview = true;
      setReview(0);
    } else if (vote === 1) {
      setReview(1);
    } else if (vote === -1) {
      setReview(-1);
    }
    reviewDiner(uid, id, vote, unReview);
    fetchData("/");
  }
  function reviewDiner(uid, id, vote, unReview) {
    const dbRef = ref(firebase);
    const reviewVote = child(dbRef, `diners/${id}/reviewVote/${uid}`);

    if (unReview === true) {
      remove(reviewVote);
    } else {
      if (vote === 1) {
        set(reviewVote, 1);
      } else if (vote === -1) {
        set(reviewVote, -1);
      }
    }
  }

  //Dùng UseEffect check data firebase + setup trạng thái
  useEffect(() => {
    if (menu) {
      setDataMenu(menu[id]);
    }

    if (users) {
      const isFavorite = users[userUid]?.favorite?.hasOwnProperty(id);
      if (isFavorite) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }

    if (diners) {
      const isVoted = diners[id]?.reviewVote?.hasOwnProperty(userUid);
      if (isVoted) {
        const value = diners[id].reviewVote[userUid];
        setReview(value);
      }
      setDataInfo(diners[id]);
    }
    //Dùng authen của Firebase để check login và lấy user
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [menu, diners, id, users, userUid]);

  return (
    <>
      <div className="diner_detail">
        <div className="menu_title">
          <div className="menu_title_name">
            <h2>{dinerInfo.name}</h2>
          </div>
          <div className="menu_back">
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              <FiArrowLeft />
              Back
            </Button>
          </div>
        </div>
        <div className="menu_data">
          <div>
            <div className="menu_img">
              <img src={dinerInfo.img} />
              <p>{dinerInfo.position}</p>
            </div>
            <div className="vote">
              <Code
                color="success"
                onClick={() => {
                  handleStateRevew(userUid, id, 1);
                }}
              >
                {review === 1 ? <BiSolidLike /> : <BiLike />}
              </Code>

              {favorite === false ? (
                <div className="favorite" onClick={handleFavoriteBtn}>
                  <FaRegStar />
                </div>
              ) : (
                <div className="favorite" onClick={handleFavoriteBtn}>
                  <FaStar />
                </div>
              )}

              <Code
                color="danger"
                onClick={() => {
                  handleStateRevew(userUid, id, -1);
                }}
              >
                {review === -1 ? <BiSolidDislike /> : <BiDislike />}
              </Code>
            </div>
          </div>
          <DinerMenu dinerMenu={dinerMenu} />
        </div>
      </div>
    </>
  );
}
export default DinerDetail;
