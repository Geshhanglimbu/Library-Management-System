import React, { useState, useEffect } from "react";
import Button from "../components/books/buttons";
import { FaPlus } from "react-icons/fa";
import UserCard from "../components/users/usersCards";
import UserForm from "../components/users/usersForms";
import SearchUsers from "../components/users/selectSearch";
import axios from "axios";

export default function Users() {
  const [modalForm, setModalForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("https://library-management-system-67n4.onrender.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this user?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://library-management-system-67n4.onrender.com/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((user) => user._id !== id));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Something went wrong while deleting");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user?.username?.toLowerCase()?.includes(search.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center pl-2 pr-2 text-gray-500">
        <div className="flex flex-col gap-1">
          <h3 className="text-black text-md">Library User Management</h3>
          <p className="text-black text-xs">
            Manage your library user accounts
          </p>
        </div>
        {user?.role === "librarian" && (
          <Button
            onClick={() => {
              setModalForm(true);
              setEditUser(null);
            }}
            icon={<FaPlus />}
            type="button"
          >
            Add User
          </Button>
        )}
      </div>
      <SearchUsers search={search} setSearch={setSearch} />
      <p>Users fetched: {filteredUsers.length}</p>
      <UserCard
        users={filteredUsers}
        setEditUser={setEditUser}
        setModalForm={setModalForm}
        handleDelete={handleDeleteUser}
        userRole={user?.role}
      />
      {modalForm && (
        <div className="fixed inset-0 bg-transparent bg-opacity-10 backdrop-brightness-30 flex items-center justify-center">
          <div className="bg-white rounded-md shadow-xl w-full max-w-md relative">
            <Button
              onClick={() => setModalForm(false)}
              className="absolute top-2 right-2 text-xs bg-gray-200 px-2 py-1 rounded cursor-pointer"
            >
              ✕
            </Button>
            <UserForm
              setUsers={setUsers}
              setModalForm={setModalForm}
              editUser={editUser}
              setEditUser={setEditUser}
            />
          </div>
        </div>
      )}
    </>
  );
}