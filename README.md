<div align="center">

<img src="https://img.shields.io/badge/Fitzy-Admin%20Dashboard-F59E0B?style=for-the-badge&logo=react&logoColor=white" alt="Fitzy Admin" />

# Fitzy — AI Smart Closet · Admin Dashboard

**Trung tâm điều phối tri thức thời trang và giám sát hiệu năng AI**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2-8884D8?logo=chart.js&logoColor=white)](https://recharts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📖 Giới thiệu

**Fitzy Admin Dashboard** là ứng dụng quản trị nội bộ của hệ thống **Fitzy – AI Smart Closet**, một nền tảng tủ đồ thông minh sử dụng trí tuệ nhân tạo (AI) để nhận diện quần áo và gợi ý phối đồ cá nhân hóa.

Trang Admin **không phải** để quản lý người dùng cuối. Thay vào đó, nó đóng vai trò là **trung tâm điều phối tri thức thời trang** và **bảng điều khiển giám sát vận hành AI**, bao gồm:

- Quản lý toàn bộ **cơ sở tri thức thời trang** (danh mục, màu sắc, quy tắc phối)
- Giám sát và hiệu chỉnh **kết quả phân tích AI** từ mô hình YOLOv8n và K-Means
- Theo dõi hiệu năng mô hình và quản lý **dataset huấn luyện**
- Đảm bảo **tuyệt đối bảo mật quyền riêng tư** — Admin không được phép truy cập bất kỳ thông tin cá nhân nào của người dùng

---

## 🧩 Các module chức năng (10 Modules)

| # | Module | Mô tả |
|---|--------|--------|
| 1 | **Dashboard** | Tổng quan hệ thống: tổng ảnh, items, outfits, lượt AI phân tích, thông tin mô hình hiện tại |
| 2 | **Categories** | CRUD danh mục trang phục chuẩn (T-Shirt, Jeans, Jacket, Dress, Bag...) |
| 3 | **Colors** | Quản lý bảng màu hệ thống với mã HEX và Color Picker trực quan |
| 4 | **Color Compatibility** | Ma trận điểm tương thích màu sắc — dữ liệu nền tảng cho AI Decision Tree |
| 5 | **Clothing Rules** | Quy tắc phối đồ theo dịp sử dụng — "kiến thức thời trang" của hệ thống |
| 6 | **AI Analysis** | Nhật ký nhận diện YOLOv8n & K-Means, xem Bounding Box, ghi đè nhãn sai |
| 7 | **Recommendations** | Lịch sử gợi ý phối đồ ẩn danh, điểm đánh giá và quy tắc đã áp dụng |
| 8 | **AI Models** | Quản lý phiên bản mô hình AI (Accuracy, Latency, đồng bộ trọng số) |
| 9 | **Dataset Manager** | Theo dõi các tập dữ liệu train/val/test phục vụ học máy |
| 10 | **System Settings** | Cấu hình hệ thống, RBAC phân quyền Admin, nhật ký tác vụ (System Logs) |

---

## 🔐 Chính sách bảo mật & Quyền riêng tư

> **Admin không được phép truy cập:**
> - Thông tin cá nhân người dùng (email, số điện thoại, họ tên, mật khẩu)
> - Tủ đồ cá nhân và lịch sử sử dụng cụ thể
> - Ảnh gốc có thể nhận diện danh tính

Mọi dữ liệu thống kê chỉ được hiển thị dưới dạng **tổng hợp ẩn danh (anonymized aggregated data)**.

---

## 🛠️ Kiến trúc kỹ thuật

### Tech Stack

| Công nghệ | Vai trò |
|-----------|---------|
| **React 18** | UI Framework chính |
| **Vite 5** | Build tool và Dev server siêu nhanh |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **Lucide React** | Bộ icon vector nhẹ và thẩm mỹ |
| **Recharts** | Thư viện biểu đồ dữ liệu (LineChart, PieChart) |

### Cơ sở hạ tầng AI (Backend - tham khảo)

| Thành phần | Công nghệ |
|-----------|-----------|
| **Nhận diện trang phục** | YOLOv8n (PyTorch) |
| **Phân tích màu sắc** | K-Means Clustering |
| **Gợi ý phối đồ** | Decision Tree Algorithm |
| **Lưu trữ ảnh** | MinIO (S3-compatible) |
| **Cơ sở dữ liệu** | Microsoft SQL Server 2014 |
| **Bộ nhớ cache** | Redis |

---

## 📁 Cấu trúc thư mục

```text
fitzy-admin/
├── public/
│   └── fitzy.svg                    # Favicon
├── src/
│   ├── components/
│   │   ├── AiLogsTable.jsx          # Bảng nhật ký AI logs
│   │   ├── ColorPieChart.jsx        # Biểu đồ tròn phân bố màu
│   │   ├── Sidebar.jsx              # Thanh điều hướng trái
│   │   ├── StatCard.jsx             # Card thống kê nhanh
│   │   ├── Topbar.jsx               # Thanh tiêu đề & avatar admin
│   │   └── UploadsChart.jsx         # Biểu đồ cột lượt tải ảnh
│   ├── data/
│   │   └── mockData.js              # Dữ liệu giả lập toàn hệ thống
│   ├── pages/
│   │   ├── LoginPage.jsx            # Trang đăng nhập bảo mật
│   │   ├── DashboardPage.jsx        # Module 1: Dashboard tổng quan
│   │   ├── CategoriesPage.jsx       # Module 2: Quản lý danh mục
│   │   ├── ColorsPage.jsx           # Module 3: Quản lý màu sắc
│   │   ├── ColorCompatPage.jsx      # Module 4: Quy tắc phối màu
│   │   ├── ClothingRulesPage.jsx    # Module 5: Quy tắc phối đồ
│   │   ├── AiAnalysisPage.jsx       # Module 6: AI Analysis logs
│   │   ├── RecommendationsPage.jsx  # Module 7: Gợi ý phối đồ
│   │   ├── AiModelsPage.jsx         # Module 8: Mô hình AI
│   │   ├── DatasetPage.jsx          # Module 9: Dataset Manager
│   │   └── SettingsPage.jsx         # Module 10: Cài đặt hệ thống
│   ├── App.jsx                      # Root component & routing logic
│   ├── index.css                    # Global styles & Tailwind directives
│   └── main.jsx                     # Entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Khởi động dự án

### Yêu cầu môi trường

- **Node.js** >= 18
- **npm** >= 9

### Các bước cài đặt

```bash
# 1. Clone repo
git clone https://github.com/fitzy-project/admin-Dashboard-Web.git
cd admin-Dashboard-Web

# 2. Cài đặt dependencies
npm install

# 3. Khởi động dev server
npm run dev
```

Dev server sẽ khởi động tại `http://localhost:5173`.

### Build Production

```bash
npm run build
```

Kết quả build sẽ nằm trong thư mục `dist/`.

---

## 🔑 Tài khoản đăng nhập Demo

| Tài khoản | Mật khẩu | Vai trò |
|-----------|----------|---------|
| `duc.nguyen` | `admin123` | Super Admin |
| `stylist.thao` | `admin123` | Stylist Lead |
| `researcher.ai` | `admin123` | AI Researcher |

> **Lưu ý bảo mật:** Đây là thông tin tài khoản Demo phục vụ phát triển và kiểm thử. Không sử dụng các thông tin này trong môi trường Production.

---

## 📊 Công thức tính điểm gợi ý phối đồ

Hệ thống sử dụng công thức tổng hợp đa tiêu chí để đánh giá bộ trang phục:

$$Score = w_1 \cdot f_{fit} + w_2 \cdot f_{aesthetic} + w_3 \cdot f_{personal} + w_4 \cdot f_{trend}$$

Trong đó:
- **$f_{fit}$** — Điểm phối đồ theo dáng người (FitMatrix 5 body shapes)
- **$f_{aesthetic}$** — Điểm hài hòa màu sắc (HSL Color Rules)
- **$f_{personal}$** — Điểm cá nhân hóa theo lịch sử người dùng
- **$f_{trend}$** — Điểm xu hướng thời trang (dữ liệu cào từ TikTok/Instagram)

Admin có thể hiệu chỉnh trọng số $w_1, w_2, w_3, w_4$ thông qua các module quản lý.

---

## 🎨 Design System

Giao diện được thiết kế theo phong cách **Premium Admin** kết hợp:
- **Bảng màu Amber + Slate** — ấm áp, chuyên nghiệp và dễ đọc
- **Glassmorphism** — trang Đăng nhập với hiệu ứng kính mờ sang trọng
- **Micro-animations** — hover, transition và loading states mượt mà
- **Responsive layout** — tương thích mọi kích thước màn hình

---

## 👥 Đội ngũ phát triển

| Thành viên | Vai trò |
|------------|---------|
| Đức Nguyễn | Full-stack Developer, AI/ML Integration |

---

## 📄 Giấy phép

Dự án được phân phối theo giấy phép [MIT License](LICENSE).

---

<div align="center">
Made with ❤️ for the <strong>Fitzy – AI Smart Closet</strong> project
</div>
