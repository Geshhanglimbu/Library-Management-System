import {
  FaUserFriends,
  FaUserCheck,
  FaUserMinus,
  FaFile ,
} from "react-icons/fa";  
const stats = [
    {
      title: "Total books",
      count: 3,
      icon: FaUserFriends,
      color: "text-blue-600",
    },
    {
      title: "Available books",
      count: 20,
      icon: FaUserCheck ,
      color: " text-blue-600",
    },
    {
      title: "borrowed books",
      count: 3,
      icon: FaUserMinus,
      color: "text-blue-600",
    },
    {
      title: "Total users",
      count: 2,
      icon: FaFile,
      color: " text-blue-600",
    },
];
export default stats;