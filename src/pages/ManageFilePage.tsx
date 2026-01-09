import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fileService } from '../services/fileService';
import {
  FileText,
  Plus,
  Search,
  SlidersHorizontal,
  Clock,
  CheckCircle,
  XCircle,
  Archive,
  Send,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Folder,
} from 'lucide-react';

export default function ManageFilePage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadFiles();
  }, [filter]);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const response =
        filter === 'ALL'
          ? await fileService.getAllFiles()
          : await fileService.getFilesByState(filter);
      setFiles(response.data || []);
    } catch (error) {
      console.error('Error loading files:', error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStateAction = async (fileId, action) => {
    try {
      switch (action) {
        case 'submit':
          await fileService.submitFile(fileId);
          break;
        case 'review':
          const reviewer = prompt('Nhập tên người phê duyệt:');
          if (reviewer) await fileService.reviewFile(fileId, reviewer);
          else return;
          break;
        case 'approve':
          await fileService.approveFile(fileId);
          break;
        case 'reject':
          const reason = prompt('Nhập lý do từ chối:');
          if (reason) await fileService.rejectFile(fileId, reason);
          else return;
          break;
        case 'archive':
          await fileService.archiveFile(fileId);
          break;
      }
      loadFiles();
    } catch (error) {
      alert(error.response?.data?.message || 'Không thể thực hiện thao tác');
    }
  };

  const stateConfig = {
    CREATED: {
      color: 'from-gray-400 to-gray-500',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      icon: FileText,
      label: 'Đã tạo',
    },
    SUBMITTED: {
      color: 'from-blue-400 to-blue-500',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: Send,
      label: 'Đã nộp',
    },
    REVIEWING: {
      color: 'from-yellow-400 to-orange-500',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: Eye,
      label: 'Đang xét duyệt',
    },
    APPROVED: {
      color: 'from-green-400 to-emerald-500',
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: CheckCircle,
      label: 'Đã phê duyệt',
    },
    REJECTED: {
      color: 'from-red-400 to-rose-500',
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: XCircle,
      label: 'Đã từ chối',
    },
    ARCHIVED: {
      color: 'from-purple-400 to-purple-500',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: Archive,
      label: 'Đã lưu trữ',
    },
  };

  const getAvailableActions = (state) => {
    const actions = {
      CREATED: [
        {
          action: 'submit',
          label: 'Nộp hồ sơ',
          icon: Send,
          color: 'bg-blue-500 hover:bg-blue-600',
        },
      ],
      SUBMITTED: [
        {
          action: 'review',
          label: 'Xét duyệt',
          icon: Eye,
          color: 'bg-yellow-500 hover:bg-yellow-600',
        },
      ],
      REVIEWING: [
        {
          action: 'approve',
          label: 'Phê duyệt',
          icon: ThumbsUp,
          color: 'bg-green-500 hover:bg-green-600',
        },
        {
          action: 'reject',
          label: 'Từ chối',
          icon: ThumbsDown,
          color: 'bg-red-500 hover:bg-red-600',
        },
      ],
      APPROVED: [
        {
          action: 'archive',
          label: 'Lưu trữ',
          icon: Archive,
          color: 'bg-purple-500 hover:bg-purple-600',
        },
      ],
      REJECTED: [
        {
          action: 'archive',
          label: 'Lưu trữ',
          icon: Archive,
          color: 'bg-purple-500 hover:bg-purple-600',
        },
      ],
    };
    return actions[state] || [];
  };

  const filterButtons = [
    { value: 'ALL', label: 'Tất cả' },
    { value: 'CREATED', label: 'Đã tạo' },
    { value: 'SUBMITTED', label: 'Đã nộp' },
    { value: 'REVIEWING', label: 'Xét duyệt' },
    { value: 'APPROVED', label: 'Phê duyệt' },
    { value: 'REJECTED', label: 'Từ chối' },
    { value: 'ARCHIVED', label: 'Lưu trữ' },
  ];

  const filteredFiles = (files || []).filter((file) => {
    if (!searchQuery) return true;
    return (
      file.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.studentCode?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen w-full bg-[#fcfdff] font-sans relative overflow-x-hidden">
      {/* ===== BACKGROUND EFFECT ===== */}
      <div className="absolute top-0 left-1/4 w-[32rem] h-[32rem] bg-blue-100/40 blur-[140px] rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[32rem] h-[32rem] bg-indigo-100/30 blur-[140px] rounded-full translate-x-1/3 pointer-events-none" />

      {/* ===== FULL WIDTH CONTAINER ===== */}
      <div className="w-full min-h-screen px-8 py-10 relative z-10 flex flex-col">
        {/* ===== HEADER ===== */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10 mb-10">
          {/* Left */}
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm mb-6">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest">
                Module quản lý hồ sơ
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight text-slate-900 mb-4">
              Danh sách{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Hồ sơ sinh viên
              </span>
            </h1>

            <p className="text-base xl:text-lg text-slate-500 leading-relaxed">
              Quản lý, theo dõi tiến độ và trạng thái xử lý hồ sơ sinh viên trên
              toàn bộ hệ thống một cách tập trung.
            </p>
          </div>

          {/* ===== TOOLBAR ===== */}
          <div className="flex flex-wrap items-center gap-4 self-start xl:self-auto">
            {/* Search */}
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Tìm kiếm hồ sơ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-72 pl-11 pr-4
                                           bg-white border-2 border-slate-100 rounded-xl
                                           text-sm font-medium
                                           focus:outline-none focus:border-blue-200
                                           focus:ring-4 focus:ring-blue-50
                                           transition-all shadow-sm"
              />
            </div>

            {/* Filter */}
            <button
              className="h-12 w-12 flex items-center justify-center
                                       bg-white border-2 border-slate-100
                                       text-slate-600 rounded-xl
                                       hover:bg-slate-50 hover:border-slate-200
                                       transition-all shadow-sm
                                       active:scale-95"
              title="Bộ lọc"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            {/* Create */}
            <Link
              to="/create-file"
              className="h-12 px-6
                                       flex items-center justify-center gap-2
                                       bg-gradient-to-r from-blue-600 to-indigo-600
                                       rounded-xl font-bold text-white text-sm
                                       transition-all duration-300
                                       hover:scale-[1.03]
                                       active:scale-95
                                       shadow-[0_10px_25px_rgba(37,99,235,0.3)]
                                       hover:shadow-[0_15px_35px_rgba(37,99,235,0.4)]"
            >
              <Plus className="w-5 h-5" />
              <span>Tạo hồ sơ</span>
            </Link>
          </div>
        </div>

        {/* ===== CONTENT (FULL HEIGHT) ===== */}
        <div
          className="flex-1 bg-white rounded-[1rem]
                                border border-slate-100/80
                                shadow-[0_20px_40px_rgba(0,0,0,0.04)]
                                overflow-hidden relative backdrop-blur-xl flex flex-col"
        >
          <div className="h-full rounded-[1rem] overflow-auto bg-white/60 px-8 py-10 flex-1 flex flex-col">
            {loading ? (
              <div className="flex items-center justify-center py-16 flex-1">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">
                    Đang tải dữ liệu...
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 flex-1 flex flex-col">
                {/* Filter Tabs */}
                <div className="bg-white rounded-2xl shadow-lg p-2 border border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {filterButtons.map((btn) => (
                      <button
                        key={btn.value}
                        onClick={() => setFilter(btn.value)}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                          filter === btn.value
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Files Grid */}
                {filteredFiles.length === 0 ? (
                  <div className="h-full bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100 flex-1">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Folder className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Không có hồ sơ nào
                    </h3>
                    <p className="text-gray-500">
                      {searchQuery
                        ? 'Không tìm thấy hồ sơ phù hợp'
                        : filter === 'ALL'
                        ? 'Chưa có hồ sơ nào trong hệ thống'
                        : `Không có hồ sơ nào ở trạng thái ${
                            filterButtons.find((b) => b.value === filter)?.label
                          }`}
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filteredFiles.map((file) => {
                      const config = stateConfig[file.currentState];
                      const StateIcon = config.icon;

                      return (
                        <div
                          key={file.id}
                          className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                        >
                          {/* Gradient Header Section */}
                          <div
                            className={`bg-gradient-to-r ${config.color} px-8 py-6 relative overflow-hidden`}
                          >
                            {/* Decorative circles */}
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>
                            <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full"></div>

                            <div className="relative flex items-start justify-between gap-6">
                              {/* Left: Icon + Info */}
                              <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                  <StateIcon className="w-8 h-8 text-white" />
                                </div>

                                {/* Student Info */}
                                <div>
                                  <h3 className="text-2xl font-bold text-white mb-2">
                                    {file.studentName}
                                  </h3>
                                  <div className="flex items-center gap-2 text-white/90">
                                    <FileText className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                      Mã SV: {file.studentCode}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Right: Action Buttons */}
                              {getAvailableActions(file.currentState).length >
                                0 && (
                                <div className="flex flex-wrap gap-2 items-start">
                                  {getAvailableActions(file.currentState).map(
                                    ({ action, label, icon: Icon, color }) => (
                                      <button
                                        key={action}
                                        onClick={() =>
                                          handleStateAction(file.id, action)
                                        }
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white/95 hover:bg-white text-gray-800 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap"
                                      >
                                        <Icon className="w-4 h-4" />
                                        <span>{label}</span>
                                      </button>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-8 space-y-6">
                            {/* Info Grid */}
                            <div className="space-y-4">
                              {/* File Type */}
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}
                                >
                                  <FileText className="w-5 h-5 text-gray-700" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-xs text-gray-500 font-medium mb-0.5">
                                    Loại hồ sơ
                                  </div>
                                  <div className="font-bold text-gray-900">
                                    {file.fileType}
                                  </div>
                                </div>
                              </div>

                              {/* Status */}
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}
                                >
                                  <StateIcon className="w-5 h-5 text-gray-700" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-xs text-gray-500 font-medium mb-0.5">
                                    Trạng thái
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${config.color} text-white`}
                                    >
                                      {config.label}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Submit Date */}
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                  <Clock className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="text-xs text-gray-500 font-medium mb-0.5">
                                    Ngày nộp
                                  </div>
                                  <div className="font-bold text-gray-900">
                                    {new Date(
                                      file.submitDate
                                    ).toLocaleDateString('vi-VN')}
                                  </div>
                                </div>
                              </div>

                              {/* Reviewer */}
                              {file.reviewer && (
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                                    <Eye className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-xs text-gray-500 font-medium mb-0.5">
                                      Người duyệt
                                    </div>
                                    <div className="font-bold text-gray-900">
                                      {file.reviewer}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Review Date */}
                              {file.reviewDate && (
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-xs text-gray-500 font-medium mb-0.5">
                                      Ngày duyệt
                                    </div>
                                    <div className="font-bold text-gray-900">
                                      {new Date(
                                        file.reviewDate
                                      ).toLocaleDateString('vi-VN')}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Documents */}
                            {file.documents?.length > 0 && (
                              <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2 mb-3">
                                  <FileText className="w-4 h-4 text-gray-600" />
                                  <span className="text-sm font-bold text-gray-700">
                                    Tài liệu đính kèm:
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {file.documents.map((doc, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-sm font-semibold text-blue-900 transition-all cursor-pointer group/doc"
                                    >
                                      <FileText className="w-4 h-4 text-blue-600 group-hover/doc:scale-110 transition-transform" />
                                      <span>{doc}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Note */}
                            {file.note && (
                              <div className="pt-4 border-t border-gray-100">
                                <div className="text-sm font-bold text-gray-700 mb-2">
                                  Ghi chú
                                </div>
                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                  <p className="text-sm text-amber-900 leading-relaxed">
                                    {file.note}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Result */}
                            {file.result && (
                              <div className="pt-4 border-t border-gray-100">
                                <div className="text-sm font-bold text-gray-700 mb-2">
                                  Kết quả
                                </div>
                                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
                                  <p className="text-sm text-rose-900 leading-relaxed">
                                    {file.result}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Info Footer */}
                            <div className="flex items-start gap-2 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                              <span className="text-lg">💡</span>
                              <div className="flex-1">
                                <span className="text-sm font-bold text-blue-900 mr-1">
                                  Lưu ý:
                                </span>
                                <span className="text-sm text-blue-800">
                                  Vui lòng kiểm tra kỹ thông tin trước khi nộp
                                  hồ sơ. Sau khi nộp, bạn không thể chỉnh sửa.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Shine border */}
          <div
            className="absolute inset-0 border-2 border-white/40
                                   rounded-[2rem] pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
