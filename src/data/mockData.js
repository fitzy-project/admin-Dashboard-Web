// Dữ liệu giả lập cho Hệ thống Quản trị Fitzy Admin (10 Modules chuyên biệt)

// 1. Dashboard Stats
export const summaryStats = [
  {
    id: 'processed_images',
    label: 'Tổng ảnh đã xử lý',
    value: '84,200',
    delta: '+3.4%',
    trend: 'up',
  },
  {
    id: 'system_items',
    label: 'Tổng item hệ thống',
    value: '76,500',
    delta: '+4.1%',
    trend: 'up',
  },
  {
    id: 'outfits_created',
    label: 'Tổng outfit được tạo',
    value: '31,800',
    delta: '+8.2%',
    trend: 'up',
  },
  {
    id: 'ai_scans',
    label: 'Số lượt AI phân tích',
    value: '124,500',
    delta: '+11.5%',
    trend: 'up',
  },
]

export const aiVersionInfo = {
  currentModel: 'YOLOv8n-Fitzy',
  version: 'v1.2',
  accuracy: '93.0%',
  latency: '12 ms',
  lastUpdated: '08/07/2026',
}

export const uploadsByDay = [
  { day: 'T2', uploads: 420 },
  { day: 'T3', uploads: 512 },
  { day: 'T4', uploads: 478 },
  { day: 'T5', uploads: 610 },
  { day: 'T6', uploads: 705 },
  { day: 'T7', uploads: 890 },
  { day: 'CN', uploads: 760 },
]

export const categoryDistribution = [
  { name: 'T-Shirt', value: 35, color: '#F59E0B' },
  { name: 'Jeans', value: 20, color: '#3B82F6' },
  { name: 'Jacket', value: 15, color: '#10B981' },
  { name: 'Dress', value: 12, color: '#EC4899' },
  { name: 'Shoes', value: 10, color: '#8B5CF6' },
  { name: 'Khác', value: 8, color: '#64748B' },
]

export const colorDistribution = [
  { name: 'Black', value: 30, color: '#000000' },
  { name: 'White', value: 25, color: '#E2E8F0' },
  { name: 'Beige', value: 15, color: '#F5F5DC' },
  { name: 'Navy', value: 12, color: '#000080' },
  { name: 'Grey', value: 10, color: '#808080' },
  { name: 'Khác', value: 8, color: '#94A3B8' },
]

// 2. Categories
export const categoriesList = [
  { id: 'CAT-01', name: 'T-Shirt', slug: 't-shirt', itemCount: 26800, description: 'Áo thun ngắn tay, dài tay các loại' },
  { id: 'CAT-02', name: 'Shirt', slug: 'shirt', itemCount: 12400, description: 'Áo sơ mi nam, nữ công sở và dạo phố' },
  { id: 'CAT-03', name: 'Hoodie', slug: 'hoodie', itemCount: 5100, description: 'Áo nỉ có mũ giữ ấm' },
  { id: 'CAT-04', name: 'Jacket', slug: 'jacket', itemCount: 8200, description: 'Áo khoác gió, khoác bò, blazer' },
  { id: 'CAT-05', name: 'Jeans', slug: 'jeans', itemCount: 14500, description: 'Quần jeans bò các kiểu dáng' },
  { id: 'CAT-06', name: 'Dress', slug: 'dress', itemCount: 4200, description: 'Váy liền, đầm dự tiệc' },
  { id: 'CAT-07', name: 'Shoes', slug: 'shoes', itemCount: 3800, description: 'Giày sneaker, giày tây, cao gót' },
  { id: 'CAT-08', name: 'Bag', slug: 'bag', itemCount: 1500, description: 'Túi xách, balo phụ kiện' },
]

// 3. Colors
export const colorsList = [
  { id: 'COL-01', name: 'Black', hex: '#000000', description: 'Màu đen tiêu chuẩn' },
  { id: 'COL-02', name: 'White', hex: '#FFFFFF', description: 'Màu trắng tinh khiết' },
  { id: 'COL-03', name: 'Beige', hex: '#F5F5DC', description: 'Màu kem/be nhạt ấm áp' },
  { id: 'COL-04', name: 'Navy', hex: '#000080', description: 'Màu xanh navy đậm' },
  { id: 'COL-05', name: 'Grey', hex: '#808080', description: 'Màu xám trung tính' },
  { id: 'COL-06', name: 'Red', hex: '#FF0000', description: 'Màu đỏ nổi bật' },
  { id: 'COL-07', name: 'Green', hex: '#008000', description: 'Màu xanh lá cây' },
  { id: 'COL-08', name: 'Blue', hex: '#0000FF', description: 'Màu xanh dương' },
]

// 4. Color Compatibility
export const colorCompatibilityRules = [
  { id: 'CC-01', color1: 'Black', color2: 'White', score: 10, note: 'Độ tương phản tuyệt đối, tối giản thanh lịch.', active: true },
  { id: 'CC-02', color1: 'Black', color2: 'Beige', score: 9, note: 'Tông màu ấm phối hợp hài hòa ấm áp.', active: true },
  { id: 'CC-03', color1: 'Blue', color2: 'White', score: 8, note: 'Mang lại cảm giác trẻ trung, năng động.', active: true },
  { id: 'CC-04', color1: 'Red', color2: 'Green', score: 2, note: 'Tương phản màu bổ sung cực mạnh, khó mặc phối.', active: true },
  { id: 'CC-05', color1: 'Navy', color2: 'Grey', score: 9, note: 'Phối màu công sở lịch lãm và trang nhã.', active: true },
  { id: 'CC-06', color1: 'Beige', color2: 'White', score: 9, note: 'Phong cách Tone-on-Tone dịu mát.', active: true },
]

// 5. Clothing Rules (Tri thức phối đồ)
export const clothingRules = [
  { id: 'CR-01', topCategory: 'Hoodie', bottomCategory: 'Jeans', occasion: 'Casual', score: 10, active: true, name: 'Casual Streetwear Classic' },
  { id: 'CR-02', topCategory: 'Shirt', bottomCategory: 'Jeans', occasion: 'Office', score: 9, active: true, name: 'Business Casual Smart' },
  { id: 'CR-03', topCategory: 'T-Shirt', bottomCategory: 'Jeans', occasion: 'Casual', score: 9, active: true, name: 'Simple Everyday Go' },
  { id: 'CR-04', topCategory: 'Jacket', bottomCategory: 'Jeans', occasion: 'Sporty', score: 8, active: true, name: 'Active Denim Vibe' },
  { id: 'CR-05', topCategory: 'Shirt', bottomCategory: 'Jeans', occasion: 'Party', score: 7, active: false, name: 'Fancy Denim Mix' },
]

// 6. AI Analysis Logs (YOLO & K-Means output - ANONYMIZED)
export const aiAnalysisLogs = [
  {
    id: 'ANA-9001',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    detectedType: 'T-Shirt',
    confidence: 0.96,
    colorName: 'Red',
    hexColor: '#FF0000',
    box: [0.15, 0.22, 0.85, 0.9],
    inferenceTimeMs: 11,
    modelName: 'YOLOv8n',
    version: 'v1.2',
    status: 'success',
    createdAt: '10/07/2026 10:45',
  },
  {
    id: 'ANA-9002',
    imageUrl: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80',
    detectedType: 'Jacket',
    confidence: 0.91,
    colorName: 'Blue',
    hexColor: '#0000FF',
    box: [0.08, 0.15, 0.92, 0.85],
    inferenceTimeMs: 13,
    modelName: 'YOLOv8n',
    version: 'v1.2',
    status: 'success',
    createdAt: '10/07/2026 10:32',
  },
  {
    id: 'ANA-9003',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80',
    detectedType: 'Jeans',
    confidence: 0.74,
    colorName: 'Navy',
    hexColor: '#000080',
    box: [0.2, 0.1, 0.8, 0.95],
    inferenceTimeMs: 14,
    modelName: 'YOLOv8n',
    version: 'v1.1',
    status: 'review',
    createdAt: '10/07/2026 09:15',
  },
  {
    id: 'ANA-9004',
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80',
    detectedType: 'Bag',
    confidence: 0.42,
    colorName: 'Black',
    hexColor: '#000000',
    box: [0.3, 0.3, 0.7, 0.7],
    inferenceTimeMs: 18,
    modelName: 'YOLOv8n',
    version: 'v1.2',
    status: 'failed',
    createdAt: '10/07/2026 08:04',
  },
]

// 7. Recommendations History (Lịch sử gợi ý phối đồ ẩn danh)
export const recommendationsList = [
  {
    id: 'REC-5001',
    outfitItems: ['T-Shirt (White)', 'Jeans (Blue)', 'Shoes (White)'],
    score: 9.2,
    rulesApplied: ['CR-03 (Simple Everyday Go)', 'CC-03 (Blue + White)'],
    createdAt: '10/07/2026 10:48',
  },
  {
    id: 'REC-5002',
    outfitItems: ['Shirt (Beige)', 'Jeans (Black)', 'Jacket (Black)'],
    score: 8.9,
    rulesApplied: ['CR-02 (Business Casual Smart)', 'CC-02 (Black + Beige)'],
    createdAt: '10/07/2026 10:20',
  },
  {
    id: 'REC-5003',
    outfitItems: ['Hoodie (Grey)', 'Jeans (Blue)', 'Shoes (White)'],
    score: 9.5,
    rulesApplied: ['CR-01 (Casual Streetwear Classic)', 'CC-03 (Blue + White)'],
    createdAt: '10/07/2026 09:55',
  },
]

// 8. AI Models
export const aiModelsList = [
  { id: 'MOD-01', name: 'YOLOv8n', version: 'v1.2', updateDate: '08/07/2026', accuracy: '93.0%', latency: '12 ms', active: true },
  { id: 'MOD-02', name: 'K-Means Color Extractor', version: 'v1.0', updateDate: '01/06/2026', accuracy: '95.0%', latency: '15 ms', active: true },
  { id: 'MOD-03', name: 'Decision Tree Recommender', version: 'v1.1', updateDate: '12/06/2026', accuracy: '89.0%', latency: '5 ms', active: true },
]

// 9. Dataset Manager
export const datasetList = [
  { id: 'DAT-01', name: 'Fitzy Train Dataset', type: 'train', imageCount: 62000, status: 'Active' },
  { id: 'DAT-02', name: 'Fitzy Validation Dataset', type: 'validation', imageCount: 12200, status: 'Active' },
  { id: 'DAT-03', name: 'Fitzy Test Dataset', type: 'test', imageCount: 10000, status: 'Active' },
]

// 10. System Settings (Admins, Roles, System Logs)
export const adminAccounts = [
  { username: 'duc.nguyen', name: 'Đức Nguyễn', role: 'Super Admin', email: 'duc.nguyen@fitzy.app', status: 'active', password: 'admin123', initials: 'ĐN' },
  { username: 'stylist.thao', name: 'Thảo Phạm (Stylist)', role: 'Stylist Lead', email: 'thao.stylist@fitzy.app', status: 'active', password: 'admin123', initials: 'TP' },
  { username: 'researcher.ai', name: 'Minh Lê (AI Specialist)', role: 'AI Researcher', email: 'minh.ai@fitzy.app', status: 'active', password: 'admin123', initials: 'ML' },
]

export const rolesList = [
  { role: 'Super Admin', permissions: 'Toàn quyền cấu hình, quản trị tài khoản, cập nhật AI models' },
  { role: 'Stylist Lead', permissions: 'Xem logs, CRUD danh mục, màu sắc, quy tắc phối màu, quy tắc phối đồ' },
  { role: 'AI Researcher', permissions: 'Quản trị AI models, Dataset, xem AI Analysis logs, cấu hình model version' },
]

export const systemLogs = [
  { id: 'LOG-7701', timestamp: '10/07/2026 10:52', type: 'Config Change', actor: 'duc.nguyen', message: 'Cập nhật trọng số model YOLOv8n v1.2' },
  { id: 'LOG-7702', timestamp: '10/07/2026 10:14', type: 'Rule Override', actor: 'stylist.thao', message: 'Ghi đè nhãn AI Analysis cho tệp ANA-9003' },
  { id: 'LOG-7703', timestamp: '10/07/2026 09:30', type: 'Model Deploy', actor: 'researcher.ai', message: 'Triển khai mô hình Decision Tree v1.1' },
]

export const systemConfig = {
  allowedFileTypes: '.jpg, .jpeg, .png, .webp',
  maxUploadSizeBytes: 5242880, // 5MB
  redisHost: '127.0.0.1',
  redisPort: 6379,
  minioEndpoint: 'minio.fitzy.app',
  sqlServerInstance: 'FITZY_SQL_2014',
}

export const adminUser = {
  name: 'Đức Nguyễn',
  initials: 'ĐN',
  role: 'Super Admin',
}

export const storageStats = {
  minio: {
    status: 'Online',
    usedSize: '1.2 TB',
    totalSize: '5.0 TB',
    bucketCount: 8,
    fileCount: 84200,
  },
  sqlServer: {
    status: 'Online',
    dbSize: '24 GB',
    logSize: '4.5 GB',
    dbName: 'Fitzy_Production',
    connectionCount: 142,
    tableCount: 28,
  },
}
