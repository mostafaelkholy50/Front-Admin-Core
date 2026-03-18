import React, { useContext, useState } from "react";
import { TenantContext } from "../../contexts/TenantContext";
import Loading from "../../components/admin/Loading";

const Tenant = () => {
  const {
    tenant,
    message,
    Store,
    isLoadingTenants,
    isCreatingTenant,
    fetchError,
  } = useContext(TenantContext);
  console.log("Tenant data from context:", tenant);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    domain: "",
  });
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id.trim() || !formData.name.trim() || !formData.domain.trim()) {
      setFormError("جميع الحقول مطلوبة (المعرف، الاسم، النطاق)");
      return;
    }

    try {
      await Store(formData.id, formData.name, formData.domain);
      setIsModalOpen(false);
      setFormData({ id: "", name: "", domain: "" });
      setFormError("");
    } catch (err) {
      setFormError("فشل في إنشاء المستأجر، حاول مرة أخرى");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">إدارة المستأجرين</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isCreatingTenant}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-sm flex items-center gap-2 ${
            isCreatingTenant ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <span>+</span>
          {isCreatingTenant ? "جاري الإنشاء..." : "إضافة مستأجر جديد"}
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg text-center ${
            message.includes("فشل") || message.includes("Failed")
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {message}
        </div>
      )}

      {fetchError && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-center">
          خطأ في جلب البيانات: {fetchError.message || "غير معروف"}
        </div>
      )}

      {isLoadingTenants ? (
        <Loading />
      ) : tenant?.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
          لا يوجد مستأجرين بعد. ابدأ بإضافة واحد جديد.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-right font-medium text-gray-700">
                  المعرف (ID)
                </th>
                <th className="px-6 py-4 text-right font-medium text-gray-700">
                  الاسم
                </th>
                <th className="px-6 py-4 text-right font-medium text-gray-700">
                  النطاق (Domain)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tenant.map((t) => (
                <tr
                  key={t.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-gray-700 font-mono text-sm  text-end">{t.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900  text-end">
                    {t.name}
                  </td>
                  <td className="px-6 py-4 text-gray-700 text-end">{t.domains[0]?.domain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                إضافة مستأجر جديد
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {formError && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    معرف المستأجر (ID) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    placeholder="مثال: company-slug"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المستأجر <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    placeholder="مثال: شركة الأمل"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    النطاق (Domain) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    placeholder="مثال: alamal.sa"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingTenant}
                    className={`px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium ${
                      isCreatingTenant ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {isCreatingTenant ? "جاري الإنشاء..." : "إنشاء المستأجر"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tenant;