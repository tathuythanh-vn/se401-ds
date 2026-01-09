import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fileService } from '../services/fileService';
import { studentService } from '../services/studentService';
import {
  User,
  FileType,
  FileText,
  MessageSquare,
  CheckCircle,
  X,
} from 'lucide-react';

export default function FileForm() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    fileType: 'INTERNSHIP',
    documents: '',
    note: '',
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await studentService.getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...formData,
        studentId: parseInt(formData.studentId),
        documents: formData.documents
          .split(',')
          .map((d) => d.trim())
          .filter(Boolean),
      };
      await fileService.createFile(data);

      // Success feedback
      const successMessage = document.createElement('div');
      successMessage.className =
        'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce z-50';
      successMessage.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="font-semibold">Tạo hồ sơ thành công!</span>
            `;
      document.body.appendChild(successMessage);
      setTimeout(() => {
        successMessage.remove();
        navigate('/manage-file');
      }, 1500);
    } catch (error) {
      alert('Lỗi: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const fileTypes = [
    { value: 'INTERNSHIP', label: 'Thực tập', icon: '💼' },
    { value: 'SCHOLARSHIP', label: 'Học bổng', icon: '🎓' },
    {
      value: 'ACADEMIC_SUSPENSION',
      label: 'Bảo lưu kết quả học tập',
      icon: '📚',
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Student Selection */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <User className="w-4 h-4 text-gray-500" />
          Sinh viên
          <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.studentId}
          onChange={(e) =>
            setFormData({ ...formData, studentId: e.target.value })
          }
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          required
        >
          <option value="">Chọn sinh viên</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.studentCode} - {student.fullName}
            </option>
          ))}
        </select>
      </div>

      {/* File Type Selection */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <FileType className="w-4 h-4 text-gray-500" />
          Loại hồ sơ
          <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {fileTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setFormData({ ...formData, fileType: type.value })}
              className={`p-3 rounded-lg border transition-all text-center ${
                formData.fileType === type.value
                  ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                  : 'border-gray-300 bg-white hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-2xl mb-1">{type.icon}</div>
              <div className="font-medium text-xs text-gray-700">
                {type.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <FileText className="w-4 h-4 text-gray-500" />
          Tài liệu đính kèm
        </label>
        <input
          type="text"
          value={formData.documents}
          onChange={(e) =>
            setFormData({ ...formData, documents: e.target.value })
          }
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="CV, Bảng điểm, Giấy xác nhận (phân cách bằng dấu phẩy)"
        />
        <p className="text-xs text-gray-500 mt-1">
          Nhập các tài liệu và phân cách bằng dấu phẩy
        </p>
      </div>

      {/* Note */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <MessageSquare className="w-4 h-4 text-gray-500" />
          Ghi chú
        </label>
        <textarea
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
          rows={3}
          placeholder="Thêm ghi chú về hồ sơ..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Đang xử lý...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Tạo hồ sơ</span>
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => navigate('/manage-file')}
          className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          <span>Hủy</span>
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          <strong>Lưu ý:</strong> Các trường có dấu{' '}
          <span className="text-red-500">*</span> là bắt buộc phải điền. Hồ sơ
          sau khi tạo sẽ ở trạng thái CREATED.
        </p>
      </div>
    </form>
  );
}
