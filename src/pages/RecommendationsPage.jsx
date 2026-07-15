import React, { useState } from 'react'
import { Sparkles, Calendar, Heart, Trash2, Shield, Search } from 'lucide-react'
import { recommendationsList } from '../data/mockData.js'

export default function RecommendationsPage() {
  const [recs, setRecs] = useState(recommendationsList)
  const [query, setQuery] = useState('')

  function handleDelete(id) {
    if (confirm('Bạn chắc chắn muốn xóa bản ghi lịch sử gợi ý này?')) {
      setRecs(recs.filter((r) => r.id !== id))
    }
  }

  const filteredRecs = recs.filter((r) =>
    r.outfitItems.join(' ').toLowerCase().includes(query.toLowerCase()) ||
    r.rulesApplied.join(' ').toLowerCase().includes(query.toLowerCase()) ||
    r.id.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Lịch sử Gợi ý phối đồ (Recommendations)
          </h1>
          <p className="text-sm text-mute mt-1">
            Theo dõi hiệu quả gợi ý phối đồ của thuật toán AI Decision Tree. Bảo mật quyền riêng tư: <strong>không thu thập danh tính người dùng</strong>.
          </p>
        </div>
      </div>

      {/* Privacy Notice Alert */}
      <div className="bg-slate-900 text-white rounded-2xl p-4.5 shadow-card flex items-center gap-3">
        <div className="p-2 bg-white/10 rounded-xl">
          <Shield className="w-5 h-5 text-amber-500 animate-pulse" />
        </div>
        <div className="text-xs font-semibold leading-relaxed">
          <p className="font-bold text-sm text-white mb-0.5">Tiêu chuẩn bảo vệ quyền riêng tư</p>
          Toàn bộ lịch sử dưới đây chỉ lưu trữ kết quả đầu ra của bộ quy tắc phối đồ (Outfit Items) và điểm đánh giá tương ứng. Không có bất cứ liên kết nào tới thông tin cá nhân hoặc tủ đồ cụ thể của người dùng cuối.
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-line rounded-2xl p-4 shadow-card flex items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-mute w-4 h-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo mã gợi ý, trang phục trong outfit, quy tắc áp dụng..."
            className="w-full rounded-xl border border-line bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 font-semibold"
          />
        </div>
      </div>

      {/* Grid of Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredRecs.map((rec) => (
          <div key={rec.id} className="bg-white border border-line rounded-2xl p-5 shadow-card space-y-4 flex flex-col justify-between hover:border-amber-300 transition-all">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-600">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs text-mute font-bold bg-slate-50 px-2 py-0.5 rounded border border-line">
                    {rec.id}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-mute font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  {rec.createdAt}
                </div>
              </div>

              {/* Suggested Outfit items */}
              <div className="space-y-1">
                <p className="text-[10px] text-mute font-bold uppercase tracking-wider">Bộ trang phục gợi ý</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {rec.outfitItems.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 border border-line rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rules Applied */}
              <div className="space-y-1">
                <p className="text-[10px] text-mute font-bold uppercase tracking-wider">Quy tắc thời trang kích hoạt</p>
                <div className="flex flex-col gap-1.5 pt-1">
                  {rec.rulesApplied.map((rule, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] text-amber-800 font-bold bg-amber-50 border border-amber-200/50 rounded-lg px-2 py-1 truncate"
                    >
                      {rule}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Score & Delete Footer */}
            <div className="border-t border-slate-50 pt-3.5 flex items-center justify-between mt-2">
              <div>
                <p className="text-[10px] text-mute font-bold uppercase tracking-wider">Điểm gợi ý</p>
                <p className="font-display font-bold text-amber-600 text-base mt-0.5 flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-amber-500 text-amber-500" />
                  {rec.score} / 10
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(rec.id)}
                className="p-2 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors"
                aria-label="Xóa"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
