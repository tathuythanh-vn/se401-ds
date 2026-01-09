import FileForm from '../components/FileForm';
import { PlusCircle, FileText } from 'lucide-react';

export default function CreateFilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
              <PlusCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Tạo Hồ sơ Mới
              </h1>
              <p className="text-gray-500 mt-1">
                Khởi tạo hồ sơ sinh viên bằng Builder Pattern
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-gray-800">
                Thông tin hồ sơ
              </h2>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Điền đầy đủ thông tin để tạo hồ sơ mới
            </p>
          </div>
          <div className="p-6">
            <FileForm />
          </div>
        </div>
      </div>
    </div>
  );
}
