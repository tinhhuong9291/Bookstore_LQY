import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BookDetail from "./pages/BookDetail";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
