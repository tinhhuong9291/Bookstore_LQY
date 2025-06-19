import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

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

const BookDetail: React.FC = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

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
  }, [id]);

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
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};

export default BookDetail;
