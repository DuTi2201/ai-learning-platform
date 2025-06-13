# AI Learning Platform

Một ứng dụng web học tập AI hiện đại được xây dựng với React.js và Node.js, cung cấp trải nghiệm học tập tương tác với xác thực Google OAuth2.

## Tech Stack

### Frontend
- **React.js** - Thư viện UI chính
- **Material-UI** - Framework UI components
- **React Router** - Điều hướng client-side
- **Axios** - HTTP client cho API calls
- **React Context** - Quản lý state toàn cục

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Ngôn ngữ lập trình
- **Prisma** - ORM và database toolkit
- **PostgreSQL** - Cơ sở dữ liệu chính
- **JWT** - Xác thực và phân quyền
- **Google OAuth2** - Đăng nhập qua Google
- **Express Session** - Quản lý session
- **CORS** - Cross-origin resource sharing

## Tính năng chính

- 🔐 **Xác thực Google OAuth2** - Đăng nhập an toàn qua tài khoản Google
- 👥 **Phân quyền người dùng** - Student, Instructor, Admin roles
- 📚 **Quản lý khóa học** - Tạo, chỉnh sửa và quản lý courses
- 📖 **Hệ thống module và bài học** - Cấu trúc nội dung có tổ chức
- 📁 **Quản lý tài nguyên** - Upload và quản lý files, videos, documents
- 📊 **Theo dõi tiến độ** - Tracking học tập của students
- 💬 **Hệ thống thảo luận** - Forums và comments
- 📈 **Dashboard analytics** - Thống kê và báo cáo

## Cài đặt và Chạy dự án

### Yêu cầu hệ thống
- Node.js (v16 hoặc cao hơn)
- PostgreSQL (v12 hoặc cao hơn)
- npm hoặc yarn

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

### 3. Cấu hình Environment Variables
Tạo file `.env` trong thư mục `backend` với nội dung:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ai_learning_platform"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Google OAuth2
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3001/api/auth/google/callback"

# Session
SESSION_SECRET="your-session-secret-key"

# Server
PORT=3001
NODE_ENV=development

# Frontend URL
FRONTEND_URL="http://localhost:3000"
```

### 4. Thiết lập Database
```bash
# Chạy migrations để tạo tables
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# (Tùy chọn) Seed dữ liệu mẫu
npx prisma db seed
```

### 5. Khởi động Backend
```bash
npm run dev
```
Backend sẽ chạy tại: http://localhost:3001

### 6. Cài đặt và chạy Frontend
Mở terminal mới:
```bash
cd frontend
npm install
npm start
```
Frontend sẽ chạy tại: http://localhost:3000

## API Endpoints chính

### Authentication
- `GET /api/auth/google` - Khởi tạo Google OAuth
- `GET /api/auth/google/callback` - Callback sau khi xác thực
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `POST /api/auth/logout` - Đăng xuất

### Users
- `GET /api/users` - Lấy danh sách users (Admin only)
- `GET /api/users/:id` - Lấy thông tin user theo ID
- `PUT /api/users/:id` - Cập nhật thông tin user
- `DELETE /api/users/:id` - Xóa user (Admin only)

### Courses
- `GET /api/courses` - Lấy danh sách courses
- `POST /api/courses` - Tạo course mới (Instructor/Admin)
- `GET /api/courses/:id` - Lấy chi tiết course
- `PUT /api/courses/:id` - Cập nhật course
- `DELETE /api/courses/:id` - Xóa course

### Modules
- `GET /api/courses/:courseId/modules` - Lấy modules của course
- `POST /api/courses/:courseId/modules` - Tạo module mới
- `PUT /api/modules/:id` - Cập nhật module
- `DELETE /api/modules/:id` - Xóa module

### Lessons
- `GET /api/modules/:moduleId/lessons` - Lấy lessons của module
- `POST /api/modules/:moduleId/lessons` - Tạo lesson mới
- `PUT /api/lessons/:id` - Cập nhật lesson
- `DELETE /api/lessons/:id` - Xóa lesson

## Cấu trúc Database

Dự án sử dụng PostgreSQL với các bảng chính:
- `users` - Thông tin người dùng
- `courses` - Khóa học
- `modules` - Module trong khóa học
- `lessons` - Bài học trong module
- `resources` - Tài nguyên học tập
- `enrollments` - Đăng ký khóa học
- `progress` - Tiến độ học tập
- `discussions` - Thảo luận
- `sessions` - Quản lý session

## Development

### Chạy tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Build production
```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

## Deployment

Dự án có thể được deploy lên các platform như:
- **Frontend**: Vercel, Netlify
- **Backend**: Heroku, Railway, Render
- **Database**: PostgreSQL trên AWS RDS, Google Cloud SQL

## Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## License

Dự án này được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

## Support

Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng tạo issue trên GitHub repository.