import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavigationBar from "./components/NavigationBar";
import DashboardPage from "./pages/admin/DashboardPage";
import BooksPage from "./pages/admin/BooksPage";
import CartPage from "./pages/CartPage";
import BookDetail from "./pages/BookDetail";
import OrdersPage from "./pages/admin/OrdersPage";
import RevenueReport from "./pages/admin/RevenueReport";
import UsersPage from "./pages/admin/UsersPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/admin/books" element={<BooksPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/admin/books/:id" element={<BooksPage />} />
          <Route path="/admin/books/create" element={<BooksPage />} />
          <Route path="/admin/books/edit/:id" element={<BooksPage />} />
          <Route path="/admin/books/delete/:id" element={<BooksPage />} />
          <Route path="/orders" element={<BooksPage />} />
          <Route path="/orders/:id" element={<BooksPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<BooksPage />} />
          <Route path="/profile" element={<BooksPage />} />
          <Route path="/wishlist" element={<BooksPage />} />
          <Route path="/contact" element={<BooksPage />} />
          <Route path="/about" element={<BooksPage />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
          <Route path="/admin/revenue" element={<RevenueReport />} />
          <Route path="/admin/users" element={<UsersPage />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
