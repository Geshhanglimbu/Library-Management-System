import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Library Management</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>

      {/* Navigation */}
      <nav className="bg-white p-4">
        <div className="flex gap-4 flex-wrap">
          <NavLink
            to="/home/dashboard"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-blue-500 hover:bg-blue-100"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/home/books"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-blue-500 hover:bg-blue-100"}`
            }
          >
            Books
          </NavLink>
          {user?.role === "librarian" ? (
            <NavLink
              to="/home/users"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-blue-500 hover:bg-blue-100"}`
              }
            >
              Users
            </NavLink>
          ) : (
            <NavLink
              to="/home/borrowed-books"
              className={({ isActive }) =>
                `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-blue-500 hover:bg-blue-100"}`
              }
            >
              Borrowed Books
            </NavLink>
          )}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-blue-500 hover:bg-blue-100"}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-2 py-1 rounded ${isActive ? "bg-blue-500 text-white" : "text-blue-500 hover:bg-blue-100"}`
            }
          >
            Contact Us
          </NavLink>
        </div>
      </nav>

      {/* Content */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}