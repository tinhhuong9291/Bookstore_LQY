import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add routes later: BookDetail, Cart, Admin */}
        </Routes>
      </div>
    </Router>
  );
}
