import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export default function NavigationBar() {
  const [user, setUser] = useState<{ email: string; isAdmin: boolean } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = parseJwt(token);
        if (payload && payload.email) {
          setUser({ email: payload.email, isAdmin: !!payload.isAdmin });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    updateUser();
    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between">
      <Link to="/" className="font-bold text-xl">
        BookStore
      </Link>
      <div className="space-x-4 flex items-center">
        <Link to="/cart">Giỏ hàng</Link>
        {user && user.isAdmin && <Link to="/admin">Admin</Link>}
        {!user ? (
          <Link to="/login">Đăng nhập</Link>
        ) : (
          <>
            <span className="font-medium">{user.email}</span>
            <button
              onClick={handleLogout}
              className="ml-2 px-2 py-1 rounded bg-blue-500 hover:bg-blue-700 text-white text-sm"
            >
              Đăng xuất
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
