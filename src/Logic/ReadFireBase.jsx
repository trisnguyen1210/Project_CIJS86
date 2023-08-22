// import { firebase } from "../firebase";
// import { ref, child, get } from "firebase/database";
// import useCallback from "react";

// export const fetchData = useCallback(
//   (dataPath) => {
//     const dbRef = ref(firebase);
//     get(child(dbRef, `/${dataPath}`))
//       .then((snapshot) => {
//         if (snapshot.exists()) {
//           setData(snapshot.val());
//         } else {
//           console.log("No data available");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   },
//   [firebase, dataPath]
// ); // Đặt biến giá trị thay đổi vào mảng dependencies
