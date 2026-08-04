// Dữ liệu giả lập cho Hệ thống Quản trị Fitzy Admin (6 Phân hệ Core mới)

// 1. Dashboard & Analytics Stats
export const dashboardStats = {
  totalUsers: '14,250',
  activeToday: '1,840',
  totalSampleItems: '32',
  outfitsCreatedDaily: '4,510',
  aiScansCount: '89,420',
};

export const userGrowthData = [
  { name: 'Tuần 1', users: 1200 },
  { name: 'Tuần 2', users: 1800 },
  { name: 'Tuần 3', users: 2400 },
  { name: 'Tuần 4', users: 3100 },
  { name: 'Tuần 5', users: 4500 },
  { name: 'Tuần 6', users: 6200 },
  { name: 'Tuần 7', users: 8900 },
  { name: 'Tuần 8', users: 14250 },
];

export const mainCategoryDistribution = [
  { name: 'Áo', value: 45, color: '#6366F1' },     // Indigo
  { name: 'Quần', value: 35, color: '#3B82F6' },    // Blue
  { name: 'Đồ bộ', value: 20, color: '#10B981' },   // Green
];

export const topBrands = [
  { name: 'Coolmate', count: 4800, percentage: 34 },
  { name: 'Uniqlo', count: 3200, percentage: 22 },
  { name: 'Routine', count: 2500, percentage: 17 },
  { name: 'Canifa', count: 1800, percentage: 12 },
  { name: 'Zara', count: 1200, percentage: 8 },
];

export const topColors = [
  { name: 'Black', count: 5200, hex: '#000000' },
  { name: 'White', count: 4300, hex: '#FFFFFF' },
  { name: 'Navy', count: 2800, hex: '#1E3A8A' },
  { name: 'Beige', count: 2400, hex: '#F5F5DC' },
  { name: 'Grey', count: 1900, hex: '#6B7280' },
];

// 2. Sample Clothing Catalog (30+ món đồ mẫu chuẩn)
export const sampleCatalogItems = [
  {
    id: 'SMP-001',
    name: 'Áo thun Basic Cotton cổ tròn',
    category: 'Áo',
    subcategory: 't-shirts',
    brand: 'Coolmate',
    colorName: 'Trắng',
    colorHex: '#FFFFFF',
    material: 'Cotton',
    season: 'Xuân/Hè',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80',
    tags: 'Casual, Basic',
  },
  {
    id: 'SMP-002',
    name: 'Áo sơ mi Oxford dài tay',
    category: 'Áo',
    subcategory: 'shirts',
    brand: 'Uniqlo',
    colorName: 'Xanh nhạt',
    colorHex: '#BFDBFE',
    material: 'Oxford Cotton',
    season: 'Tất cả',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=200&q=80',
    tags: 'Office, Elegant',
  },
  {
    id: 'SMP-003',
    name: 'Áo khoác gió bomber gió cản nước',
    category: 'Áo',
    subcategory: 'jackets',
    brand: 'Routine',
    colorName: 'Đen',
    colorHex: '#000000',
    material: 'Polyester',
    season: 'Thu/Đông',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=200&q=80',
    tags: 'Casual, Sporty',
  },
  {
    id: 'SMP-004',
    name: 'Quần jeans ống đứng classic',
    category: 'Quần',
    subcategory: 'straight-leg_pants',
    brand: 'Coolmate',
    colorName: 'Xanh Navy',
    colorHex: '#1E3A8A',
    material: 'Denim',
    season: 'Tất cả',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=200&q=80',
    tags: 'Casual, Classic',
  },
  {
    id: 'SMP-005',
    name: 'Quần tây nam xếp ly công sở',
    category: 'Quần',
    subcategory: 'full_length_pants',
    brand: 'Routine',
    colorName: 'Xám đậm',
    colorHex: '#374151',
    material: 'Wool Blend',
    season: 'Tất cả',
    imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=200&q=80',
    tags: 'Office, Formal',
  },
  {
    id: 'SMP-006',
    name: 'Bộ nỉ mặc nhà Cozy Set',
    category: 'Đồ bộ',
    subcategory: 'lounge_sets',
    brand: 'Canifa',
    colorName: 'Beige',
    colorHex: '#F5F5DC',
    material: 'Nỉ bông',
    season: 'Thu/Đông',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    tags: 'Home, Casual',
  },
  {
    id: 'SMP-007',
    name: 'Bộ thể thao Active Pro',
    category: 'Đồ bộ',
    subcategory: 'sport_sets',
    brand: 'Coolmate',
    colorName: 'Xanh rêu',
    colorHex: '#3F6212',
    material: 'Spandex Polyester',
    season: 'Xuân/Hè',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80',
    tags: 'Sporty, Active',
  },
  {
    id: 'SMP-008',
    name: 'Áo kiểu Blouse nữ tay phồng',
    category: 'Áo',
    subcategory: 'blouses',
    brand: 'Zara',
    colorName: 'Kem',
    colorHex: '#FFFDF0',
    material: 'Vải suông Chiffon',
    season: 'Xuân/Hè',
    imageUrl: 'https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&w=200&q=80',
    tags: 'Elegant, Basic',
  },
  {
    id: 'SMP-009',
    name: 'Quần tây ống rộng palazzo nữ',
    category: 'Quần',
    subcategory: 'wide-leg_and_palazzo_pants',
    brand: 'Zara',
    colorName: 'Đen',
    colorHex: '#000000',
    material: 'Tuyết mưa',
    season: 'Tất cả',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=200&q=80',
    tags: 'Office, Modern',
  },
  {
    id: 'SMP-010',
    name: 'Áo thun dài tay giữ nhiệt Heattech',
    category: 'Áo',
    subcategory: 'long_sleeved_tops',
    brand: 'Uniqlo',
    colorName: 'Trắng xám',
    colorHex: '#F3F4F6',
    material: 'Heattech Polyester',
    season: 'Thu/Đông',
    imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=200&q=80',
    tags: 'Basic, KeepWarm',
  },
  {
    id: 'SMP-011',
    name: 'Áo croptop thun gân ôm sát',
    category: 'Áo',
    subcategory: 'short_sleeve_tops',
    brand: 'Zara',
    colorName: 'Nâu nhạt',
    colorHex: '#A16207',
    material: 'Ribbed Cotton',
    season: 'Xuân/Hè',
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=200&q=80',
    tags: 'Streetwear, Youthful',
  },
  {
    id: 'SMP-012',
    name: 'Áo ba lỗ nam thể thao sát nách',
    category: 'Áo',
    subcategory: 'sleeveless_and_tank_tops',
    brand: 'Coolmate',
    colorName: 'Đen',
    colorHex: '#000000',
    material: 'Polyester Mesh',
    season: 'Xuân/Hè',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    tags: 'Gym, Sporty',
  },
  {
    id: 'SMP-013',
    name: 'Quần lửng kaki túi hộp năng động',
    category: 'Quần',
    subcategory: 'cropped_pants',
    brand: 'Canifa',
    colorName: 'Vàng Kaki',
    colorHex: '#D97706',
    material: 'Kaki Cotton',
    season: 'Xuân/Hè',
    imageUrl: 'https://images.unsplash.com/photo-1565084888279-aca607ecad0c?auto=format&fit=crop&w=200&q=80',
    tags: 'Casual, Streetwear',
  },
  {
    id: 'SMP-014',
    name: 'Quần jeans nữ skinny co giãn',
    category: 'Quần',
    subcategory: 'skinny_pants',
    brand: 'Zara',
    colorName: 'Xanh bò nhạt',
    colorHex: '#93C5FD',
    material: 'Stretch Denim',
    season: 'Tất cả',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=200&q=80',
    tags: 'Casual, Basic',
  },
  {
    id: 'SMP-015',
    name: 'Quần dài túi hộp Cargo nam',
    category: 'Quần',
    subcategory: 'cargo_pants',
    brand: 'Routine',
    colorName: 'Xanh ô liu',
    colorHex: '#1E293B',
    material: 'Ripstop Cotton',
    season: 'Tất cả',
    imageUrl: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=200&q=80',
    tags: 'Military, Streetwear',
  }
];

// 3. User Management (Danh sách người dùng đăng ký)
export const mockUsers = [
  {
    id: 'USR-001',
    email: 'hoang.nam@gmail.com',
    displayName: 'Hoàng Nam',
    role: 'User',
    status: 'active',
    registerDate: '12/04/2026',
    itemCount: 42,
    bodyShape: 'Hình chữ nhật (Rectangle)',
    stylePref: 'Minimalist, Sporty',
    colorProfile: 'Deep Autumn (Mùa thu trầm)',
  },
  {
    id: 'USR-002',
    email: 'thuy.trang@gmail.com',
    displayName: 'Thùy Trang',
    role: 'User',
    status: 'active',
    registerDate: '08/05/2026',
    itemCount: 85,
    bodyShape: 'Đồng cát (Hourglass)',
    stylePref: 'Elegant, Vintage',
    colorProfile: 'Light Spring (Mùa xuân sáng)',
  },
  {
    id: 'USR-003',
    email: 'quoc.bao@gmail.com',
    displayName: 'Quốc Bảo',
    role: 'Stylist',
    status: 'active',
    registerDate: '24/02/2026',
    itemCount: 15,
    bodyShape: 'Tam giác ngược (Inverted)',
    stylePref: 'Smart Casual, Classic',
    colorProfile: 'Cool Winter (Mùa đông lạnh)',
  },
  {
    id: 'USR-004',
    email: 'ngoc.anh@hotmail.com',
    displayName: 'Ngọc Anh',
    role: 'User',
    status: 'banned',
    registerDate: '19/06/2026',
    itemCount: 56,
    bodyShape: 'Quả lê (Pear)',
    stylePref: 'Cute, Casual',
    colorProfile: 'Soft Summer (Mùa hè dịu)',
  },
  {
    id: 'USR-005',
    email: 'admin.minh@fitzy.app',
    displayName: 'Minh Hoàng',
    role: 'Admin',
    status: 'active',
    registerDate: '01/01/2026',
    itemCount: 0,
    bodyShape: 'Chưa cập nhật',
    stylePref: 'Chưa cập nhật',
    colorProfile: 'Chưa cập nhật',
  }
];

// 4. AI Rules & Compatibility (Phối màu & phối chất liệu)
export const initialColorMatrix = [
  { id: 'CM-001', color1: 'Trắng', color2: 'Đen', compatibility: 'excellent', score: 10, notes: 'Tương phản kinh điển, phong cách tối giản thanh lịch' },
  { id: 'CM-002', color1: 'Xanh Navy', color2: 'Beige', compatibility: 'excellent', score: 9, notes: 'Hài hòa, sang trọng lịch lãm' },
  { id: 'CM-003', color1: 'Xám đậm', color2: 'Trắng', compatibility: 'good', score: 8, notes: 'Màu trung tính rất dễ phối đồ hằng ngày' },
  { id: 'CM-004', color1: 'Đỏ tươi', color2: 'Xanh lá cây', compatibility: 'avoid', score: 2, notes: 'Bị cấm - Hai màu bổ sung độ tương phản quá gắt' },
  { id: 'CM-005', color1: 'Đen', color2: 'Đỏ', compatibility: 'good', score: 8, notes: 'Tương phản mạnh mẽ cá tính' },
  { id: 'CM-006', color1: 'Xanh ô liu', color2: 'Nâu', compatibility: 'good', score: 7, notes: 'Tone màu đất tự nhiên' },
];

export const initialIncompatibleCombos = [
  { id: 'IC-001', item1: 'Áo thun thể thao', item2: 'Quần tây công sở', reason: 'Hai phong cách Sporty và Formal chọi nhau gay gắt', severity: 'High' },
  { id: 'IC-002', item1: 'Áo hoodie nỉ dày', item2: 'Váy công sở xếp ly', reason: 'Tỷ lệ form dáng cồng kềnh mất cân đối', severity: 'Medium' },
  { id: 'IC-003', item1: 'Áo phông ba lỗ', item2: 'Quần tây công sở', reason: 'Thiếu lịch sự, chênh lệch ngữ cảnh sử dụng', severity: 'High' },
];

export const initialStylistNotes = [
  { id: 'SN-001', name: 'Quy tắc 3 màu tối đa', ruleText: 'Hệ thống gợi ý không được vượt quá 3 tông màu khác nhau trên cùng một outfit để tránh rối mắt.', active: true },
  { id: 'SN-002', name: 'Nguyên tắc tôn dáng quả lê', ruleText: 'Đối với dáng người quả lê, ưu tiên áo sáng màu, có họa tiết đi kèm quần tối màu ống suông rộng.', active: true },
  { id: 'SN-003', name: 'Monochromatic Tonal Shift', ruleText: 'Khi phối đồ một màu (monochromatic), ưu tiên dùng các sắc độ sáng tối khác nhau của cùng màu gốc.', active: true },
];

// 5. Attributes lists
export const masterBrandsList = [
  { id: 'BR-01', name: 'Coolmate', country: 'Việt Nam' },
  { id: 'BR-02', name: 'Uniqlo', country: 'Nhật Bản' },
  { id: 'BR-03', name: 'Routine', country: 'Việt Nam' },
  { id: 'BR-04', name: 'Canifa', country: 'Việt Nam' },
  { id: 'BR-05', name: 'Zara', country: 'Tây Ban Nha' },
];

export const masterMaterialsList = [
  { id: 'MAT-01', name: 'Cotton', description: 'Vải cotton thoáng mát hút mồ hôi' },
  { id: 'MAT-02', name: 'Denim', description: 'Vải bò bền bỉ, dày dặn cá tính' },
  { id: 'MAT-03', name: 'Kaki', description: 'Vải dệt chéo dẻo dai đứng dáng' },
  { id: 'MAT-04', name: 'Nỉ bông', description: 'Giữ ấm tốt, chất vải bông mềm' },
  { id: 'MAT-05', name: 'Vải suông Chiffon', description: 'Mềm mại rủ nhẹ thanh lịch' },
];

export const masterColorsList = [
  { id: 'COL-01', name: 'Trắng', hex: '#FFFFFF' },
  { id: 'COL-02', name: 'Đen', hex: '#000000' },
  { id: 'COL-03', name: 'Xanh Navy', hex: '#1E3A8A' },
  { id: 'COL-04', name: 'Beige', hex: '#F5F5DC' },
  { id: 'COL-05', name: 'Xám đậm', hex: '#374151' },
];

// 6. AI Scan History & Moderation Logs
export const mockAiLogs = [
  {
    id: 'LOG-9101',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80',
    detectedClass: 't-shirts',
    colorHex: '#FFFFFF',
    colorName: 'Trắng',
    confidence: '96.2%',
    status: 'success',
    scanDate: '31/07/2026 14:22',
  },
  {
    id: 'LOG-9102',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80',
    detectedClass: 'straight-leg_pants',
    colorHex: '#1E3A8A',
    colorName: 'Xanh Navy',
    confidence: '78.5%',
    status: 'review',
    scanDate: '31/07/2026 13:05',
  },
  {
    id: 'LOG-9103',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80',
    detectedClass: 'shirts',
    colorHex: '#BFDBFE',
    colorName: 'Xanh nhạt',
    confidence: '92.1%',
    status: 'success',
    scanDate: '30/07/2026 18:41',
  },
  {
    id: 'LOG-9104',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&q=80',
    detectedClass: 'jackets',
    colorHex: '#000000',
    colorName: 'Đen',
    confidence: '45.8%',
    status: 'failed',
    scanDate: '29/07/2026 09:12',
  }
];

export const mockFalseDetectionReports = [
  {
    id: 'REP-001',
    logId: 'LOG-9104',
    userName: 'Hoàng Nam',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=300&q=80',
    aiPrediction: 'Đồ bộ (lounge_sets)',
    userCorrection: 'Áo khoác (jackets)',
    notes: 'Đây là áo khoác da bomber chứ không phải đồ bộ mặc nhà.',
    reportDate: '29/07/2026 10:15',
    status: 'pending',
  },
  {
    id: 'REP-002',
    logId: 'LOG-9102',
    userName: 'Thùy Trang',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&q=80',
    aiPrediction: 'Quần lửng (cropped_pants)',
    userCorrection: 'Quần ống đứng (straight-leg_pants)',
    notes: 'Quần dài bò mặc đứng chân chứ không phải quần lửng chín tấc.',
    reportDate: '31/07/2026 14:00',
    status: 'resolved',
  }
];

// Accounts for testing
export const adminAccounts = [
  { username: 'duc.nguyen', name: 'Đức Nguyễn', role: 'Super Admin', email: 'duc.nguyen@fitzy.app', status: 'active', password: 'admin123', initials: 'ĐN' },
  { username: 'stylist.thao', name: 'Thảo Phạm (Stylist)', role: 'Stylist Lead', email: 'thao.stylist@fitzy.app', status: 'active', password: 'admin123', initials: 'TP' },
  { username: 'researcher.ai', name: 'Minh Lê (AI Specialist)', role: 'AI Researcher', email: 'minh.ai@fitzy.app', status: 'active', password: 'admin123', initials: 'ML' },
];
