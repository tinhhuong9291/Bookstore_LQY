import React, { useEffect, useState } from "react";
import API from "../api/axios";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  image: string;
}

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách sách", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {books.map((book) => (
        <div key={book._id} className="p-4 border rounded">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
          <h2 className="text-lg font-semibold">{book.title}</h2>
          <p className="text-sm">{book.author}</p>
          <p className="text-red-500 font-bold">{book.price} đ</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
