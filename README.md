<div align="center">

<img src="https://img.shields.io/badge/Fitzy-Admin%20Dashboard-F59E0B?style=for-the-badge&logo=react&logoColor=white" alt="Fitzy Admin" />

# Fitzy — AI Smart Closet · Web Admin Dashboard

**Trung tâm điều phối tri thức thời trang và giám sát hiệu năng AI**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📖 Giới thiệu

**Fitzy Admin Dashboard** là phân hệ quản trị nội bộ cốt lõi của hệ sinh thái **Fitzy – AI Smart Closet** (nền tảng quản lý tủ đồ và phối đồ AI cá nhân hóa). Giao diện Web Admin dành cho Ban quản trị (Admin) và Chuyên gia thời trang (Stylist) để điều phối toàn bộ tri thức thời trang hệ thống, kiểm duyệt chất lượng nhận diện AI và quản lý dữ liệu người dùng.

Trang Web Admin được kết nối trực tiếp với **FastAPI Backend** và **Cơ sở dữ liệu SQLite/SQL Server**, hỗ trợ quản lý thời gian thực thay vì sử dụng mock data.

---

## 🧩 Danh sách 6 phân hệ chính (6 Modules)

| # | Phân hệ (Module) | Chức năng chi tiết |
|---|--------|--------|
| 1 | **Thống kê & Tổng quan (Dashboard)** | Biểu đồ trực quan hóa dữ liệu người dùng mới, cơ cấu danh mục trang phục, top thương hiệu và màu sắc thịnh hành sử dụng biểu đồ động Recharts từ API `/admin/dashboard-stats`. |
| 2 | **Quần áo mẫu (Sample Catalog)** | CRUD kho quần áo chuẩn hóa của hệ thống. Hỗ trợ upload ảnh thật lên máy chủ lưu trữ (MinIO/Local Storage) phục vụ dữ liệu gợi ý dùng chung. |
| 3 | **Quản lý Người dùng (User Management)** | Quản lý danh sách tài khoản, hồ sơ hình thể (chiều cao, cân nặng, size áo/quần), gu thời trang ưa thích và hỗ trợ khóa/kích hoạt tài khoản. |
| 4 | **Quy tắc AI & Stylist (AI Rules)** | Cấu hình ma trận phối màu (Color Compatibility), danh sách các cặp đồ kỵ phối (Incompatible Combos) và lưu trữ triết lý phối đồ từ Stylist. |
| 5 | **Danh mục & Thuộc tính (Attributes)** | Quản lý cây phân cấp danh mục quần áo (Category Tree), danh sách các thương hiệu (Brands), bảng màu chuẩn (Colors với Color Picker) và chất liệu vải (Materials). |
| 6 | **Nhật ký AI & Kiểm duyệt (AI Logs)** | Theo dõi lịch sử quét ảnh nhận diện của AI (YOLOv8 & K-Means), cơ chế ghi đè (Override) nhãn sai của Admin và quản lý báo lỗi phản hồi từ người dùng. |

---

## 🛠️ Kiến trúc kỹ thuật & Tech Stack

### Frontend Web Admin
* **React 18 & Vite 5:** Xây dựng ứng dụng đơn trang (SPA) tốc độ phản hồi cực nhanh.
* **Tailwind CSS 3:** Hệ thống CSS tiện ích giúp tùy chỉnh giao diện Premium, hỗ trợ Dark Mode.
* **Lucide React:** Bộ icons trực quan và hiện đại.
* **API Client (services/api.js):** Đồng bộ hóa token JWT tự động gắn vào Header `Authorization`, hỗ trợ auto-login và xử lý đa luồng dữ liệu.

### Mối liên kết hệ thống (tham khảo)
* **Backend:** FastAPI (Python) cung cấp REST API tài liệu hóa qua Swagger UI (`/docs`).
* **Database:** SQLite (chạy dev) và Microsoft SQL Server 2014 (chạy production).
* **Storage:** MinIO (lưu trữ ảnh đám mây) và Local Static File Server.

---

## 📁 Cấu trúc thư mục dự án thực tế

```text
fitzy-admin/
├── .env                             # Cấu hình biến môi trường kết nối API
├── index.html                       # Entry HTML chính
├── package.json                     # Quản lý thư viện phụ thuộc
├── tailwind.config.js               # Cấu hình Tailwind CSS
├── vite.config.js                   # Cấu hình dev-server Vite
├── src/
│   ├── App.jsx                      # Quản lý định tuyến và JWT Auto-login
│   ├── main.jsx                     # Entry JavaScript
│   ├── index.css                    # Định nghĩa Token Design System & Utility
│   ├── components/
│   │   ├── Sidebar.jsx              # Thanh điều hướng trái phân quyền (RBAC)
│   │   └── Topbar.jsx               # Header hiển thị thông tin admin đăng nhập
│   ├── data/
│   │   └── mockData.js              # Dữ liệu fallback
│   ├── services/
│   │   └── api.js                   # API Client kết nối Backend (JWT, CRUD, Upload)
│   ├── pages/
│   │   ├── LoginPage.jsx            # Giao diện Đăng nhập kính mờ (Glassmorphism)
│   │   ├── DashboardPage.jsx        # Phân hệ 1: Thống kê & Tổng quan
│   │   ├── SampleCatalogPage.jsx    # Phân hệ 2: Quần áo mẫu
│   │   ├── UserManagementPage.jsx   # Phân hệ 3: Quản lý người dùng
│   │   ├── AiRulesPage.jsx          # Phân hệ 4: Quản lý quy tắc AI
│   │   ├── AttributesPage.jsx       # Phân hệ 5: Danh mục & Thuộc tính
│   │   └── AiLogsPage.jsx           # Phân hệ 6: Nhật ký AI & Kiểm duyệt
```

---

## 🚀 Hướng dẫn khởi chạy dự án

### Yêu cầu môi trường
* **Node.js** >= 18
* **npm** >= 9
* **Fitzy Backend (FastAPI)** đang chạy tại cổng `8000`.

### Các bước cài đặt và khởi chạy
1. **Tạo file cấu hình kết nối API:**
   Tạo file `.env` tại thư mục gốc của frontend:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

2. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

3. **Khởi chạy Development Server:**
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5173`.

4. **Biên dịch Production:**
   ```bash
   npm run build
   ```
   Tệp tin tối ưu hóa sẽ nằm trong thư mục `dist/`.

---

## 🔑 Tài khoản đăng nhập kiểm thử (Seeded trong DB)

| Tài khoản (Username) | Mật khẩu | Vai trò (Role) | Ghi chú |
|-----------|----------|---------|---------|
| `duc.nguyen` | `admin123` | **Admin** | Quyền quản trị tối cao |
| `stylist.thao` | `admin123` | **Stylist** | Quyền stylist kiểm duyệt quy tắc phối đồ |

---

## 📊 Công thức gợi ý phối đồ của AI (Rule Engine v12)

Hệ thống gợi ý sử dụng thuật toán **Hybrid Cold-Start Recommender** kết hợp 8 bộ chấm điểm (Scorers) với cơ chế normalize trọng số động để đảm bảo tổng điểm luôn là 100%:

$$\text{Điểm kết quả} = \sum_{i \in \text{scorers}} w_i^{\text{norm}} \times S_i \quad (S_i \in [0, 10])$$

* **Trọng số phân bổ mặc định:**
  * 0.35: Tương thích phân nhóm (Category Scorer)
  * 0.35: Phối hợp màu sắc (Color Scorer)
  * 0.20: Lịch sử người dùng (User History Scorer)
  * 0.15: Tương thích chất liệu (Material Scorer)
  * 0.15: Xu hướng thời trang (Trend Scorer)
  * 0.10: Dịp mặc đồ (Occasion Scorer)
  * 0.10: Hình thể cá nhân (Body Shape Scorer)
  * 0.10: Điều kiện thời tiết (Weather Scorer)

* **Cơ chế Fallback:** Bất kỳ bộ chấm điểm nào bị thiếu dữ liệu cục bộ sẽ được gán điểm trung lập **5/10** để không làm sai lệch kết quả tổng thể.

---

<div align="center">
Made with ❤️ for the <strong>Fitzy – AI Smart Closet</strong> project
</div>
