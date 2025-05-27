// src/components/BookDetail.tsx
import React from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  imageUrl: string;
};

const mockBook: Book = {
  id: "1",
  title: "Lập Trình Web Toàn Tập",
  author: "Nguyễn Văn A",
  price: 189000,
  description:
    "Cuốn sách giúp bạn hiểu từ frontend đến backend để xây dựng một ứng dụng web hoàn chỉnh.",
  imageUrl: "https://via.placeholder.com/300x400.png?text=Book+Cover",
};

const BookDetail: React.FC = () => {
  const handleAddToCart = () => {
    alert(`Đã thêm "${mockBook.title}" vào giỏ hàng!`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      <img
        src={mockBook.imageUrl}
        alt={mockBook.title}
        className="w-full h-auto rounded-xl shadow"
      />
      <div>
        <h2 className="text-3xl font-semibold mb-2">{mockBook.title}</h2>
        <p className="text-gray-600 mb-1">Tác giả: {mockBook.author}</p>
        <p className="text-green-600 text-xl font-bold mb-4">
          {mockBook.price.toLocaleString()}₫
        </p>
        <p className="text-gray-700 mb-6">{mockBook.description}</p>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
