import { useState } from "react";
import { useGetTenants } from "../../hooks/tenant/useGetTenants";
import { useStoreTenant } from "../../hooks/tenant/useStoreTenant";
import { MESSAGES } from "../../constants/messages";
import Loading from "../../components/admin/Loading.tsx";

const M = MESSAGES.tenant;

const Tenant = () => {
    const { data: tenants = [], isLoading, error } = useGetTenants();
    const { mutateAsync: createTenant, isPending: isCreating } = useStoreTenant();

    const [isModalOpen, setIsModalOpen]   = useState(false);
    const [formData, setFormData]         = useState({ id: "", name: "", domain: "" });
    const [formError, setFormError]       = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.id.trim() || !formData.name.trim() || !formData.domain.trim()) {
            setFormError(M.allFieldsRequired);
            return;
        }
        try {
            await createTenant(formData);
            setIsModalOpen(false);
            setFormData({ id: "", name: "", domain: "" });
            setFormError("");
        } catch {
            setFormError(M.createFailedRetry);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold text-gray-900">{M.pageTitle}</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    disabled={isCreating}
                    className={`bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-sm flex items-center gap-2 ${
                        isCreating ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                >
                    <span>+</span>
                    {isCreating ? M.creating : M.addButton}
                </button>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-center">
                    {M.fetchError}: {error.message || M.unknown}
                </div>
            )}

            {isLoading ? (
                <Loading />
            ) : tenants.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
                    {M.empty}
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-right font-medium text-gray-700">{M.colId}</th>
                                <th className="px-6 py-4 text-right font-medium text-gray-700">{M.colName}</th>
                                <th className="px-6 py-4 text-right font-medium text-gray-700">{M.colDomain}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tenants.map((t) => (
                                <tr key={t.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-gray-700 font-mono text-sm text-end">{t.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900 text-end">{t.name}</td>
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
                            <h2 className="text-xl font-semibold text-gray-900">{M.modalTitle}</h2>
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
                                {[
                                    { label: M.fieldId,     name: "id",     placeholder: M.placeholderId },
                                    { label: M.fieldName,   name: "name",   placeholder: M.placeholderName },
                                    { label: M.fieldDomain, name: "domain", placeholder: M.placeholderDomain },
                                ].map(({ label, name, placeholder }) => (
                                    <div key={name}>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {label} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name={name}
                                            value={formData[name as keyof typeof formData]}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                            placeholder={placeholder}
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-end gap-3 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        {M.cancelButton}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isCreating}
                                        className={`px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium ${
                                            isCreating ? "opacity-60 cursor-not-allowed" : ""
                                        }`}
                                    >
                                        {isCreating ? M.creating : M.createButton}
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
