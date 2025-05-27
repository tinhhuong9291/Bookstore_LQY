import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between">
      <Link to="/" className="font-bold text-xl">
        BookStore
      </Link>
      <div className="space-x-4">
        <Link to="/cart">Giỏ hàng</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Đăng nhập</Link>
      </div>
    </nav>
  );
}
