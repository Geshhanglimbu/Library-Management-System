import { useEffect, useState } from "react";
import {
  FaUserFriends,
  FaUserCheck,
  FaUserMinus,
  FaFile,
} from "react-icons/fa";
import axios from "axios";

export default function Stats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(" https://library-management-system-67n4.onrender.com/stats");
        const data = res.data;

        setStats([
          {
            title: "Total books",
            count: data.totalBooks,
            icon: FaUserFriends,
            color: "text-blue-600",
          },
          {
            title: "Available books",
            count: data.availableBooks,
            icon: FaUserCheck,
            color: "text-blue-600",
          },
          {
            title: "Borrowed books",
            count: data.borrowedBooks,
            icon: FaUserMinus,
            color: "text-blue-600",
          },
          {
            title: "Total users",
            count: data.totalUsers,
            icon: FaFile,
            color: "text-blue-600",
          },
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="p-4 bg-white shadow rounded-xl flex items-center space-x-4"
        >
          <item.icon className={`text-2xl ${item.color}`} />
          <div>
            <h3 className="text-gray-500 text-sm">{item.title}</h3>
            <p className="text-xl font-bold">{item.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
