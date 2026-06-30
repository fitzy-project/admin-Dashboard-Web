# Fitzy Admin — Web Dashboard

Web Admin Dashboard (ReactJS + Vite + TailwindCSS) cho hệ thống Fitzy, đồng bộ theme
**Slate & Amber** với app mobile Flutter.

## Cài đặt & chạy

```bash
npm install
npm run dev
```

Mở `http://localhost:5173`.

## Cấu trúc

```
src/
├── components/
│   ├── Sidebar.jsx       # Menu điều hướng (Dashboard, Users, Wardrobe, AI Rules, Settings)
│   ├── Topbar.jsx        # Search + notification + admin avatar
│   ├── StatCard.jsx      # Thẻ thống kê (Users, Items, AI Accuracy...)
│   ├── UploadsChart.jsx  # Line chart: trang phục tải lên mỗi ngày
│   ├── ColorPieChart.jsx # Pie chart: phân bố màu sắc K-Means
│   └── AiLogsTable.jsx   # Bảng nhật ký AI gần đây
├── pages/
│   ├── DashboardPage.jsx
│   └── PlaceholderPage.jsx  # Users / Wardrobe / AI Rules / Settings (chưa code)
├── data/
│   └── mockData.js       # Toàn bộ mock data — thay bằng API thật ở đây
└── App.jsx                # Layout gốc, điều hướng giữa các trang
```

## Theme tokens (tailwind.config.js)

| Token    | Hex       | Vai trò                 |
| -------- | --------- | ------------------------ |
| `ink`    | `#0F172A` | Sidebar, heading chính    |
| `ember`  | `#F59E0B` | Accent chính (CTA, active)|
| `canvas` | `#F8FAFC` | Nền trang                 |
| `line`   | `#E2E8F0` | Border                    |
| `mute`   | `#64748B` | Text phụ                  |

Font: **Playfair Display** (heading) + **Inter** (body) — đồng bộ với app Flutter.

## Tiếp theo (Roadmap)

- Thay `src/data/mockData.js` bằng API call thật (axios/fetch tới backend FastAPI/Django,
  cùng nguồn SQL Server với app Flutter).
- Code các trang Users / Wardrobe / AI Rules / Settings (hiện là Placeholder).
- Thêm React Router thực sự nếu cần URL riêng cho từng trang (`react-router-dom` đã có
  sẵn trong package.json).
- Thêm xác thực JWT cho admin (đồng bộ với roadmap JWT của app mobile).
