import { useState } from 'react';
import { studentService } from '../services/studentService';
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  CheckCircle,
} from 'lucide-react';

export default function StudentForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    studentCode: '',
    fullName: '',
    email: '',
    phone: '',
    major: '',
    year: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...formData,
        year: formData.year ? parseInt(formData.year) : null,
      };
      await studentService.createStudent(data);

      // Success feedback
      const successMessage = document.createElement('div');
      successMessage.className =
        'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce z-50';
      successMessage.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="font-semibold">Thêm sinh viên thành công!</span>
            `;
      document.body.appendChild(successMessage);
      setTimeout(() => successMessage.remove(), 3000);

      setFormData({
        studentCode: '',
        fullName: '',
        email: '',
        phone: '',
        major: '',
        year: '',
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      alert('Lỗi: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    {
      name: 'studentCode',
      label: 'Mã sinh viên',
      type: 'text',
      icon: User,
      required: true,
      placeholder: 'Ví dụ: SV001',
      color: 'indigo',
    },
    {
      name: 'fullName',
      label: 'Họ và tên',
      type: 'text',
      icon: User,
      required: true,
      placeholder: 'Nguyễn Văn A',
      color: 'purple',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      icon: Mail,
      required: false,
      placeholder: 'student@example.com',
      color: 'blue',
    },
    {
      name: 'phone',
      label: 'Số điện thoại',
      type: 'tel',
      icon: Phone,
      required: false,
      placeholder: '0912345678',
      color: 'green',
    },
    {
      name: 'major',
      label: 'Ngành học',
      type: 'text',
      icon: BookOpen,
      required: false,
      placeholder: 'Công nghệ Thông tin',
      color: 'orange',
    },
    {
      name: 'year',
      label: 'Năm học',
      type: 'number',
      icon: Calendar,
      required: false,
      placeholder: '1-6',
      color: 'pink',
      min: 1,
      max: 6,
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inputFields.map((field) => {
          const Icon = field.icon;
          const colorClasses = {
            indigo:
              'bg-indigo-50 text-indigo-600 border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500',
            purple:
              'bg-purple-50 text-purple-600 border-purple-200 focus:border-purple-500 focus:ring-purple-500',
            blue: 'bg-blue-50 text-blue-600 border-blue-200 focus:border-blue-500 focus:ring-blue-500',
            green:
              'bg-green-50 text-green-600 border-green-200 focus:border-green-500 focus:ring-green-500',
            orange:
              'bg-orange-50 text-orange-600 border-orange-200 focus:border-orange-500 focus:ring-orange-500',
            pink: 'bg-pink-50 text-pink-600 border-pink-200 focus:border-pink-500 focus:ring-pink-500',
          };

          return (
            <div
              key={field.name}
              className={
                field.name === 'fullName' || field.name === 'studentCode'
                  ? 'md:col-span-1'
                  : ''
              }
            >
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                <Icon
                  className={`w-5 h-5 ${
                    colorClasses[field.color]?.split(' ')[1]
                  }`}
                />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <div
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-lg ${
                    colorClasses[field.color]?.split(' ')[0]
                  } flex items-center justify-center`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      colorClasses[field.color]?.split(' ')[1]
                    }`}
                  />
                </div>
                <input
                  type={field.type}
                  value={formData[field.name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  className={`w-full pl-20 pr-4 py-4 border-2 rounded-xl transition focus:outline-none focus:ring-2 ${
                    colorClasses[field.color]
                  }`}
                  placeholder={field.placeholder}
                  required={field.required}
                  min={field.min}
                  max={field.max}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Đang xử lý...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Thêm sinh viên</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800">
          <strong>Lưu ý:</strong> Các trường có dấu{' '}
          <span className="text-red-500">*</span> là bắt buộc phải điền
        </p>
      </div>
    </form>
  );
}
