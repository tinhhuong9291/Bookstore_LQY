import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { getCart, updateCart } from "../api/cartApi";
import dayjs from "dayjs";

export interface Book {
  _id: string;
  title: string;
  price: number;
  image: string;
  author?: string;
  description?: string;
  category?: string;
  quantity?: number;
  isAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userId = localStorage.getItem("userId") || "user123";

const BookDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [cart, setCart] = useState<{ items: { bookId: string; quantity: number }[] }>({ items: [] });
  const [quantity, setQuantity] = useState(1);
  const defaultAddress = "Phường Bến Nghé, Quận 1, Hồ Chí Minh";
  const [shippingAddress, setShippingAddress] = useState(() => localStorage.getItem("shippingAddress") || defaultAddress);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết sách", err);
      }
    };
    fetchBook();
    getCart(userId).then(setCart).catch(() => setCart({ items: [] }));
  }, [id]);

  const handleAddToCart = () => {
    if (!book) return;
    const existing = cart.items.find((item) => item.bookId === book._id);
    let newItems;
    if (existing) {
      newItems = cart.items.map((item) =>
        item.bookId === book._id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      newItems = [...cart.items, { bookId: book._id, quantity }];
    }
    updateCart(userId, newItems).then(setCart).catch(console.error);
    alert("Đã thêm vào giỏ hàng!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleChangeAddress = () => {
    const newAddress = prompt("Nhập địa chỉ giao hàng mới:", shippingAddress);
    if (newAddress && newAddress.trim()) {
      setShippingAddress(newAddress.trim());
      localStorage.setItem("shippingAddress", newAddress.trim());
    }
  };

  const estimatedDate = dayjs().add(3, "day").format("dddd - DD/MM");

  if (!book) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <img
        src={book.image}
        alt={book.title}
        className="w-60 h-80 object-cover mb-4"
      />
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-lg italic mb-2">{book.author}</p>
      <p className="text-gray-600 mb-4">{book.description}</p>
      <p className="text-red-600 text-xl font-semibold">{book.price} đ</p>
      <div className="flex items-center gap-4 mt-4">
        <label htmlFor="quantity" className="font-medium">Số lượng:</label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={book.quantity || 99}
          value={quantity}
          onChange={e => setQuantity(Math.max(1, Math.min(Number(e.target.value), book.quantity || 99)))}
          className="w-20 px-2 py-1 border rounded"
          disabled={book.quantity === 0}
        />
        <span className="text-gray-500">Còn lại: <b>{book.quantity ?? 'Không rõ'}</b></span>
      </div>
      {book.quantity === 0 && (
        <div className="text-red-600 font-semibold mt-2">Sách đã hết hàng</div>
      )}
      <div className="flex gap-4 mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50" onClick={handleAddToCart} disabled={book.quantity === 0}>
          Thêm vào giỏ hàng
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50" onClick={handleBuyNow} disabled={book.quantity === 0}>
          Mua ngay
        </button>
      </div>
      {/* Thông tin vận chuyển */}
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h3 className="font-bold mb-2 text-blue-700">Thông tin vận chuyển</h3>
        <div className="flex items-center text-sm mb-2">
          Giao hàng đến <span className="font-semibold ml-1">{shippingAddress}</span>
          <button onClick={handleChangeAddress} className="ml-2 text-blue-600 hover:underline text-xs">Thay đổi</button>
        </div>
        <div className="flex items-center gap-2 text-green-700 font-medium mb-1">
          <span role="img" aria-label="truck">🚚</span> Giao hàng tiêu chuẩn
        </div>
        <div className="text-gray-700 text-xs">Dự kiến giao <span className="font-semibold">{estimatedDate}</span></div>
      </div>
    </div>
  );
};

export default BookDetail;
