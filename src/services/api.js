const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  // Set default headers
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Inject token if stored
  const token = localStorage.getItem('admin_token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || `HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  get: (endpoint, options) => request(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) => request(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),
  postMultipart: (endpoint, formData, options) => request(endpoint, { method: 'POST', body: formData, ...options }),
  put: (endpoint, body, options) => request(endpoint, { method: 'PUT', body: JSON.stringify(body), ...options }),
  patch: (endpoint, body, options) => request(endpoint, { method: 'PATCH', body: JSON.stringify(body), ...options }),
  delete: (endpoint, options) => request(endpoint, { method: 'DELETE', ...options }),

  // --- Auth Service ---
  login: async (username, password) => {
    // FastAPI OAuth2 password flow expects form data (x-www-form-urlencoded)
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    
    const res = await request('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });
    
    if (res.access_token) {
      localStorage.setItem('admin_token', res.access_token);
    }
    return res;
  },

  getCurrentUser: () => request('/auth/me'),
  logout: () => {
    localStorage.removeItem('admin_token');
  },

  // --- Admin Dashboard Stats ---
  getDashboardStats: () => request('/admin/dashboard-stats'),

  // --- Users Management ---
  getUsers: (role) => {
    const query = role && role !== 'all' ? `?role=${role}` : '';
    return request(`/admin/users${query}`);
  },
  toggleUserStatus: (userId, isActive) => 
    request(`/admin/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ is_active: isActive })
    }),

  // --- Sample Catalog (CRUD) ---
  getSampleItems: (categoryId) => {
    const query = categoryId ? `?category_id=${categoryId}` : '';
    return request(`/admin/sample-items${query}`);
  },
  createSampleItem: (itemData) => 
    request('/admin/sample-items', {
      method: 'POST',
      body: JSON.stringify(itemData)
    }),
  updateSampleItem: (itemId, itemData) => 
    request(`/admin/sample-items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(itemData)
    }),
  deleteSampleItem: (itemId) => 
    request(`/admin/sample-items/${itemId}`, {
      method: 'DELETE'
    }),
  uploadImage: (formData) => 
    request('/items/upload-image', {
      method: 'POST',
      body: formData // Form data with 'file' key
    }),

  // --- Catalog / Attributes (CRUD) ---
  // Categories
  getCategories: () => request('/catalog/categories'),
  createCategory: (data) => request('/catalog/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id, data) => request(`/catalog/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id) => request(`/catalog/categories/${id}`, { method: 'DELETE' }),

  // Brands
  getBrands: () => request('/catalog/brands'),
  createBrand: (data) => request('/catalog/brands', { method: 'POST', body: JSON.stringify(data) }),
  updateBrand: (id, data) => request(`/catalog/brands/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBrand: (id) => request(`/catalog/brands/${id}`, { method: 'DELETE' }),

  // Colors
  getColors: () => request('/catalog/colors'),
  createColor: (data) => request('/catalog/colors', { method: 'POST', body: JSON.stringify(data) }),
  updateColor: (id, data) => request(`/catalog/colors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteColor: (id) => request(`/catalog/colors/${id}`, { method: 'DELETE' }),

  // Materials
  getMaterials: () => request('/catalog/materials'),
  createMaterial: (data) => request('/catalog/materials', { method: 'POST', body: JSON.stringify(data) }),
  updateMaterial: (id, data) => request(`/catalog/materials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMaterial: (id) => request(`/catalog/materials/${id}`, { method: 'DELETE' }),

  // --- AI Rules (CRUD) ---
  // Color Compatibility Matrix
  getColorMatrix: () => request('/ai-rules/color-compatibility'),
  createColorMatrix: (data) => request('/ai-rules/color-compatibility', { method: 'POST', body: JSON.stringify(data) }),
  updateColorMatrix: (id, data) => request(`/ai-rules/color-compatibility/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteColorMatrix: (id) => request(`/ai-rules/color-compatibility/${id}`, { method: 'DELETE' }),

  // Incompatible Combinations
  getIncompatibleCombos: () => request('/ai-rules/incompatible-combos'),
  createIncompatibleCombo: (data) => request('/ai-rules/incompatible-combos', { method: 'POST', body: JSON.stringify(data) }),
  updateIncompatibleCombo: (id, data) => request(`/ai-rules/incompatible-combos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteIncompatibleCombo: (id) => request(`/ai-rules/incompatible-combos/${id}`, { method: 'DELETE' }),

  // Stylist Notes
  getStylistNotes: () => request('/ai-rules/stylist-notes'),
  createStylistNote: (data) => request('/ai-rules/stylist-notes', { method: 'POST', body: JSON.stringify(data) }),
  updateStylistNote: (id, data) => request(`/ai-rules/stylist-notes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteStylistNote: (id) => request(`/ai-rules/stylist-notes/${id}`, { method: 'DELETE' }),

  // --- AI Logs (Moderation) ---
  getScanLogs: (status) => {
    const query = status && status !== 'all' ? `?status=${status}` : '';
    return request(`/ai-logs/scan-history${query}`);
  },
  overrideScanLog: (logId, overrideClass) => 
    request(`/ai-logs/scan-history/${logId}/override`, {
      method: 'PUT',
      body: JSON.stringify({ override_class: overrideClass })
    }),
  getFeedbackReports: (status) => {
    const query = status && status !== 'all' ? `?status=${status}` : '';
    return request(`/ai-logs/feedback-reports${query}`);
  },
  resolveFeedbackReport: (reportId) => 
    request(`/ai-logs/feedback-reports/${reportId}/resolve`, {
      method: 'PUT'
    }),
};

export default api;
