// DELETED: TenantContext has been structurally removed.
// We no longer use a Context for data fetching. Data is fetched directly in components 
// using React Query hooks (e.g. useGetTenants, useStoreTenant)
// See: src/pages/Admin/tenant.tsx for the new implementation.
export {};