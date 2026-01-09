import { Link } from 'react-router-dom';
import {
  FileText,
  Users,
  PlusCircle,
  ArrowRight,
  Layers,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const lifecycle = [
    { name: 'CREATED', color: 'bg-blue-500' },
    { name: 'SUBMITTED', color: 'bg-indigo-500' },
    { name: 'REVIEWING', color: 'bg-amber-500' },
    { name: 'APPROVED', color: 'bg-emerald-500' },
    { name: 'ARCHIVED', color: 'bg-slate-500' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#fcfdff] flex flex-col font-sans">
      {/* ===== HERO SECTION ===== */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-20 items-center">
          {/* ===== LEFT CONTENT ===== */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                  SE401 – Design Pattern Project
                </span>
              </div>

              <h1 className="text-6xl xl:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Quản lý
                </span>
                <br />
                Quy trình Hồ sơ
              </h1>

              <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
                Trải nghiệm quy trình phê duyệt hồ sơ sinh viên chuyên nghiệp,
                áp dụng sức mạnh của
                <span className="text-indigo-600 font-semibold">
                  {' '}
                  Builder, State{' '}
                </span>{' '}
                và
                <span className="text-indigo-600 font-semibold">
                  {' '}
                  Singleton Pattern
                </span>
                .
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/create-file"
                className="group relative p-6 bg-indigo-600 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.5)] flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 group-hover:opacity-90 transition-opacity" />
                <span className="relative z-10">Tạo hồ sơ mới</span>
                <PlusCircle className="relative z-10 w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </Link>

              <Link
                to="/manage-file"
                className="p-6 bg-white rounded-2xl font-bold text-slate-700 border-2 border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>Xem danh sách</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* ===== RIGHT CONTENT (FEATURE CARDS) ===== */}
          {/* Đã đổi grid-cols thành 2 và nút Builder thành card đơn để đồng bộ */}
          <div className="grid sm:grid-cols-2 gap-6 relative">
            <div className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-indigo-200/30 blur-[100px] rounded-full" />

            {/* Card 1: Hồ sơ */}
            <Link
              to="/manage-file"
              className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hồ sơ</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Theo dõi trạng thái thời gian thực với State Pattern.
              </p>
            </Link>

            {/* Card 2: Sinh viên */}
            <Link
              to="/students"
              className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Sinh viên
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Cơ sở dữ liệu tập trung, truy xuất nhanh chóng.
              </p>
            </Link>

            {/* Card 3: Builder Pattern Engine */}
            <Link
              to="/create-file"
              className="group bg-white rounded-[2rem] p-7 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 sm:col-span-2 hover:-translate-y-1.5 flex items-center gap-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                <Layers className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Builder Pattern Engine
                  </h3>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Khởi tạo hồ sơ phức tạp từng bước một cách chuẩn xác.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== STATE LIFECYCLE SECTION ===== */}
      <section className="bg-slate-50/50 py-16 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              Vòng đời hồ sơ
            </h2>
            <div className="h-px flex-1 bg-slate-200 hidden md:block mx-8" />
            <span className="text-slate-400 font-medium text-sm">
              State Pattern Implementation
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {lifecycle.map((state, index) => (
              <div key={state.name} className="flex items-center gap-4">
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors group">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${state.color} shadow-sm group-hover:scale-125 transition-transform`}
                  />
                  <span className="text-sm font-bold text-slate-700 tracking-wide">
                    {state.name}
                  </span>
                </div>
                {index < lifecycle.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 px-6 text-center">
        <p className="text-slate-400 text-xs font-semibold tracking-[0.2em] uppercase">
          © 2026 EduManager • Designed with SE401 Principles
        </p>
      </footer>
    </div>
  );
}
