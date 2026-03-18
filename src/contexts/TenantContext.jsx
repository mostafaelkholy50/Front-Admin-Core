import { createContext, useState } from "react";
import { useGetTenants, useStoreTenant } from "../hooks/tenant";

export const TenantContext = createContext();

export function TenantProvider({ children }) {
  const { data: tenantsList = [], isLoading, error } = useGetTenants();
  const { mutateAsync: createTenant, isPending: isCreating } = useStoreTenant();

  const [message, setMessage] = useState(null);

  const Store = async (id, name, domain) => {
    try {
      await createTenant({ id, name, domain });
      setMessage("تم إنشاء المستأجر بنجاح!");
    } catch (err) {
      console.error(err);
      setMessage("فشل في إنشاء المستأجر");
      throw err;
    }
  };

  const value = {
    tenant: tenantsList || [],
    message,
    setMessage,
    Store,
    isLoadingTenants: isLoading,
    isCreatingTenant: isCreating,
    error,
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
}