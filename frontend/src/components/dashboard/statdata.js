import {
  FaUserFriends,
  FaUserCheck,
  FaUserMinus,
  FaFile ,
} from "react-icons/fa";  
const stats = [
    {
      title: "Total books",
      count: 222,
      icon: FaUserFriends,
      color: "text-blue-600",
    },
    {
      title: "Available books",
      count: 200,
      icon: FaUserCheck ,
      color: " text-blue-600",
    },
    {
      title: "borrowed books",
      count: 22,
      icon: FaUserMinus,
      color: "text-blue-600",
    },
    {
      title: "Total users",
      count: 222,
      icon: FaFile,
      color: " text-blue-600",
    },
];
export default stats;