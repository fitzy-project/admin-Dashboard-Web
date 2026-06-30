import React from 'react'

const COPY = {
  users: {
    title: 'Quản lý người dùng',
    desc: 'Danh sách tài khoản, thống kê tủ đồ theo từng người dùng sẽ hiển thị ở đây.',
  },
  wardrobe: {
    title: 'Kho tủ đồ (Wardrobe Database)',
    desc: 'Quản lý toàn bộ ảnh trang phục người dùng đã tải lên hệ thống.',
  },
  'ai-rules': {
    title: 'AI Rules & Training',
    desc: 'Theo dõi nhật ký nhận diện YOLOv8 và cập nhật luật phối màu cho Decision Tree.',
  },
  settings: {
    title: 'Cài đặt hệ thống',
    desc: 'Cấu hình chung cho Fitzy Admin.',
  },
}

export default function PlaceholderPage({ pageKey }) {
  const copy = COPY[pageKey] ?? { title: 'Đang phát triển', desc: '' }
  return (
    <div className="bg-white border border-line rounded-xl p-10 text-center shadow-card">
      <h2 className="font-display text-xl font-semibold text-ink mb-2">
        {copy.title}
      </h2>
      <p className="text-sm text-mute max-w-md mx-auto">{copy.desc}</p>
      <span className="inline-block mt-4 text-xs font-medium text-ember bg-ember/10 px-3 py-1 rounded-full">
        Sắp ra mắt
      </span>
    </div>
  )
}
