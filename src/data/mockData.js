// Dữ liệu giả lập cho Fitzy Admin Dashboard
// Sau này thay bằng API thật qua Dio/FastAPI (xem README roadmap)

export const summaryStats = [
  {
    id: 'users',
    label: 'Tổng người dùng',
    value: '12,450',
    delta: '+8.2%',
    trend: 'up',
  },
  {
    id: 'items',
    label: 'Trang phục đã số hóa',
    value: '84,200',
    delta: '+3.4%',
    trend: 'up',
  },
  {
    id: 'accuracy',
    label: 'Độ chính xác AI',
    value: '92.5%',
    delta: '+1.1%',
    trend: 'up',
  },
  {
    id: 'outfits',
    label: 'Outfit AI gợi ý / ngày',
    value: '3,180',
    delta: '-2.0%',
    trend: 'down',
  },
]

export const uploadsByDay = [
  { day: 'T2', uploads: 420 },
  { day: 'T3', uploads: 512 },
  { day: 'T4', uploads: 478 },
  { day: 'T5', uploads: 610 },
  { day: 'T6', uploads: 705 },
  { day: 'T7', uploads: 890 },
  { day: 'CN', uploads: 760 },
]

export const colorDistribution = [
  { name: 'Đen', value: 40, color: '#0F172A' },
  { name: 'Trắng', value: 30, color: '#CBD5E1' },
  { name: 'Be / Kem', value: 15, color: '#F5A623' },
  { name: 'Xanh Navy', value: 9, color: '#334155' },
  { name: 'Khác', value: 6, color: '#94A3B8' },
]

export const recentAiLogs = [
  {
    id: 'LOG-1042',
    thumbnail: '👕',
    yolo: 'Áo thun',
    kmeans: 'Đỏ đô',
    user: 'an.nguyen',
    status: 'success',
    time: '2 phút trước',
  },
  {
    id: 'LOG-1041',
    thumbnail: '🧥',
    yolo: 'Áo khoác',
    kmeans: 'Đen',
    user: 'minh.le',
    status: 'success',
    time: '6 phút trước',
  },
  {
    id: 'LOG-1040',
    thumbnail: '👖',
    yolo: 'Quần jean',
    kmeans: 'Xanh denim',
    user: 'thao.pham',
    status: 'failed',
    time: '11 phút trước',
  },
  {
    id: 'LOG-1039',
    thumbnail: '👟',
    yolo: 'Giày sneaker',
    kmeans: 'Trắng',
    user: 'duc.tran',
    status: 'success',
    time: '18 phút trước',
  },
  {
    id: 'LOG-1038',
    thumbnail: '👗',
    yolo: 'Váy',
    kmeans: 'Be',
    user: 'lan.vu',
    status: 'success',
    time: '25 phút trước',
  },
]

export const adminUser = {
  name: 'Đức Nguyễn',
  role: 'Super Admin',
  initials: 'ĐN',
}
