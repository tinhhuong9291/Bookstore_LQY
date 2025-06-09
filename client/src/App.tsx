import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavigationBar from './components/NavigationBar';
import DashboardPage from './pages/admin/DashboardPage';
import BooksPage from './pages/admin/BooksPage';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
