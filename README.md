# AI Learning Platform

Một nền tảng học tập AI hiện đại được xây dựng với React.js và Node.js, cung cấp trải nghiệm học tập tương tác với quản lý khóa học, bài học và theo dõi tiến độ.

## 🚀 Tính năng chính

- **Xác thực Google OAuth2**: Đăng nhập an toàn với tài khoản Google
- **Quản lý khóa học**: Tạo, chỉnh sửa và quản lý khóa học
- **Hệ thống bài học**: Tổ chức nội dung theo modules và lessons
- **Theo dõi tiến độ**: Theo dõi tiến độ học tập của người dùng
- **Phân quyền người dùng**: Admin, Instructor và Student roles
- **Giao diện responsive**: Thiết kế hiện đại với Material-UI
- **API RESTful**: Backend mạnh mẽ với Express.js

## 🛠️ Công nghệ sử dụng

### Frontend
- React.js 18
- Material-UI (MUI)
- React Router DOM
- Axios
- TypeScript

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Google OAuth2
- TypeScript

### DevOps
- Docker & Docker Compose
- Git
- ESLint & Prettier

## 📋 Yêu cầu hệ thống

- Node.js 18+
- PostgreSQL 14+
- npm hoặc yarn
- Git

## 🚀 Hướng dẫn cài đặt

### 1. Clone repository

```bash
git clone https://github.com/DuTi2201/ai-learning-platform.git
cd ai-learning-platform
```

### 2. Cài đặt Backend

```bash
cd backend
npm install
```

### 3. Cấu hình môi trường Backend

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Cập nhật các biến môi trường trong `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ai_learning_platform"
JWT_SECRET="your-jwt-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
PORT=3001
NODE_ENV=development
```

### 4. Thiết lập Database

```bash
# Chạy migration
npx prisma migrate dev

# Seed dữ liệu mẫu (tùy chọn)
node seed.js
```

### 5. Khởi động Backend

```bash
npm run dev
```

Backend sẽ chạy tại: http://localhost:3001

### 6. Cài đặt Frontend

Mở terminal mới:

```bash
cd frontend
npm install
```

### 7. Cấu hình môi trường Frontend

Tạo file `.env` trong thư mục frontend:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

### 8. Khởi động Frontend

```bash
npm start
```

Frontend sẽ chạy tại: http://localhost:3000

## 📚 API Endpoints chính

### Authentication
- `POST /api/auth/google` - Xác thực Google OAuth2
- `POST /api/auth/refresh` - Làm mới token
- `POST /api/auth/logout` - Đăng xuất

### Users
- `GET /api/users` - Lấy danh sách người dùng (Admin)
- `GET /api/users/me` - Lấy thông tin người dùng hiện tại
- `PUT /api/users/me` - Cập nhật thông tin cá nhân
- `GET /api/users/instructors/list` - Lấy danh sách giảng viên (Admin)

### Courses
- `GET /api/courses` - Lấy danh sách khóa học
- `POST /api/courses` - Tạo khóa học mới (Admin/Instructor)
- `GET /api/courses/:id` - Lấy chi tiết khóa học
- `PUT /api/courses/:id` - Cập nhật khóa học
- `DELETE /api/courses/:id` - Xóa khóa học

### Modules & Lessons
- `GET /api/modules/course/:courseId` - Lấy modules của khóa học
- `POST /api/modules` - Tạo module mới
- `GET /api/lessons/module/:moduleId` - Lấy lessons của module
- `POST /api/lessons` - Tạo lesson mới

## 🐳 Docker Deployment

### Sử dụng Docker Compose

```bash
# Build và khởi động tất cả services
docker-compose up --build

# Chạy ở background
docker-compose up -d

# Dừng services
docker-compose down
```

## 🔧 Development

### Chạy tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Linting và Formatting

```bash
# Backend
cd backend
npm run lint
npm run format

# Frontend
cd frontend
npm run lint
npm run format
```

## 📁 Cấu trúc dự án

```
ai-learning-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   └── types/
│   ├── prisma/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

## 👥 Tác giả

- **DuTi2201** - *Initial work* - [DuTi2201](https://github.com/DuTi2201)

## 🙏 Acknowledgments

- Material-UI team cho component library tuyệt vời
- Prisma team cho ORM mạnh mẽ
- React và Node.js communities
