import { Book } from "../types/Book";
import { Link } from "react-router-dom";

const books: Book[] = [
  {
    _id: "1",
    title: "Book A",
    price: 100,
    image: "https://via.placeholder.com/150",
  },
  {
    _id: "2",
    title: "Book B",
    price: 200,
    image: "https://via.placeholder.com/150",
  },
];

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {books.map((book) => (
        <div
          key={book._id}
          className="border p-4 rounded shadow hover:shadow-lg"
        >
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-40 object-cover"
          />
          <h2 className="text-lg font-bold">{book.title}</h2>
          <p>{book.price} VNĐ</p>
          <Link to={`/book/${book._id}`} className="text-blue-500 underline">
            Xem chi tiết
          </Link>
        </div>
      ))}
    </div>
  );
}
