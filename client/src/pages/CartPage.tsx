import { useEffect, useState } from "react";
import { getCart, clearCart } from "../api/cartApi";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const userId = localStorage.getItem("userId") || "user123";

interface CartItem {
  bookId: string;
  quantity: number;
  price: number;
  title: string; // Thêm title
}

interface Cart {
  items: CartItem[];
  total: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const cartData = await getCart(userId);
      setCart(cartData);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await API.post("/orders", {
        userId,
        items: cart.items,
      });

      if (response.status === 201) {
        await clearCart(userId);
        setCart({ items: [], total: 0 });
        alert("Đặt hàng thành công!");
        navigate("/");
      }
    } catch (error: any) {
      alert(error.response?.data?.error || "Có lỗi khi đặt hàng!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h2>
      {cart.items.length === 0 ? (
        <div>Giỏ hàng trống</div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.items.map((item) => (
              <li key={item.bookId} className="py-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-600">Số lượng: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {item.price?.toLocaleString("vi-VN")}đ
                    </p>
                    <p className="text-gray-600">
                      Tổng:{" "}
                      {((item.price || 0) * item.quantity).toLocaleString(
                        "vi-VN"
                      )}
                      đ
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Tổng cộng:</span>
              <span>{cart.total?.toLocaleString("vi-VN")}đ</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
}
