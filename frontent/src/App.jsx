import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login";
import Home from "./pages/home";
import Books from "./pages/Books";
import RegisterForm from "./components/utils/registerForm";
import ProtectedRoute from "./components/utils/protectedRoute";
import Unauthorize from "./components/utils/unauthorized";
import Dashboard from "./pages/Dashboard";
import BookForm from "./components/books/booksForms";
import Users from "./pages/users";
import UserForm from "./components/users/usersForms";
import BorrowedBooks from "./components/books/borrowedBooks";
import AboutUs from "./components/utils/about";
import ContactUs from "./components/utils/contact";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/unauthorized" element={<Unauthorize />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="books"
            element={
              <ProtectedRoute allowedRoles={["librarian", "borrower"]}>
                <Books />
              </ProtectedRoute>
            }
          />
          <Route
            path="borrowed-books"
            element={
              <ProtectedRoute allowedRoles={["librarian", "borrower"]}>
                <BorrowedBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-book"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <BookForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-user"
            element={
              <ProtectedRoute allowedRoles={["librarian"]}>
                <UserForm />
              </ProtectedRoute>
            }
          />
        </Route>
      
        <Route path="*" element={<div>404: Page Not Found <a href="/login">Go to login</a></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;