# BookStore Application

Ứng dụng web bán sách trực tuyến được xây dựng bằng MERN Stack (MongoDB, Express, React, Node.js) với TypeScript.

## Tính năng

### Người dùng thông thường

- Xem danh sách sách và thông tin chi tiết
- Tìm kiếm sách theo tên/tác giả
- Thêm sách vào giỏ hàng
- Quản lý giỏ hàng (thêm, sửa số lượng, xóa)
- Đặt hàng và thanh toán
- Đăng ký/Đăng nhập tài khoản
- Xem lịch sử đơn hàng

### Admin Dashboard

- Quản lý sách (thêm, sửa, xóa, cập nhật tồn kho)
- Quản lý đơn hàng (xem, cập nhật trạng thái)
- Quản lý người dùng (thêm, sửa, xóa, phân quyền)
- Xem báo cáo doanh thu
- Thống kê sách bán chạy

## Công nghệ sử dụng

### Frontend

- React với TypeScript
- React Router DOM
- Tailwind CSS
- Axios
- Dayjs

### Backend

- Node.js + Express
- TypeScript
- MongoDB với Mongoose
- JWT Authentication
- Bcrypt

## Cài đặt và Chạy dự án

### Yêu cầu hệ thống

- Node.js version 14 trở lên
- MongoDB
- Git

### Các bước cài đặt

1. Clone dự án

```bash
git clone https://github.com/yourusername/bookstore-apps.git
cd bookstore-apps
```

2. Cài đặt dependencies cho Backend

```bash
cd bookstore-api
npm install
```

3. Tạo file .env trong thư mục bookstore-api

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080
```

4. Cài đặt dependencies cho Frontend

```bash
cd ../client
npm install
```

5. Chạy dự án

Backend:

```bash
cd bookstore-api
npm run dev
```

Frontend:

```bash
cd client
npm start
```

Ứng dụng sẽ chạy tại:

- Frontend: http://localhost:3000
- Backend: http://localhost:8080

## Cấu trúc thư mục

```
bookstore-apps/
├── client/                 # Frontend React app
│   ├── public/
│   ├── src/
│   │   ├── api/           # API calls
│   │   ├── components/    # Shared components
│   │   ├── pages/        # Page components
│   │   ├── types/        # TypeScript types
│   │   └── App.tsx       # Main app component
│   └── package.json
│
├── bookstore-api/         # Backend Node.js app
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── index.ts      # Entry point
│   └── package.json
```

## API Endpoints

### Auth

- POST /api/auth/register - Đăng ký
- POST /api/auth/login - Đăng nhập

### Books

- GET /api/books - Lấy danh sách sách
- GET /api/books/:id - Lấy chi tiết sách
- POST /api/books - Thêm sách mới
- PUT /api/books/:id - Cập nhật sách
- DELETE /api/books/:id - Xóa sách

### Cart

- GET /api/cart/:userId - Lấy giỏ hàng
- POST /api/cart - Cập nhật giỏ hàng
- DELETE /api/cart/:userId - Xóa giỏ hàng

### Orders

- GET /api/orders - Lấy danh sách đơn hàng
- POST /api/orders - Tạo đơn hàng mới
- PUT /api/orders/:id - Cập nhật trạng thái đơn hàng

### Users

- GET /api/users - Lấy danh sách người dùng
- POST /api/users - Thêm người dùng mới
- PUT /api/users/:id - Cập nhật thông tin người dùng
- DELETE /api/users/:id - Xóa người dùng

## Đóng góp

Nếu bạn muốn đóng góp cho dự án, hãy:

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## License

MIT License. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.
