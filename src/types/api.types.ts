// ─── API Response Shapes ──────────────────────────────────────────────────────

export interface TenantDomain {
    id: number;
    tenant_id: string;
    domain: string;
    created_at: string;
    updated_at: string;
}

export interface Tenant {
    id: string;
    name: string;
    data: Record<string, unknown> | null;
    created_at: string;
    updated_at: string;
    domains: TenantDomain[];
}

export interface TenantsResponse {
    tenants: Tenant[];
}

export interface CreateTenantPayload {
    id: string;
    name: string;
    domain: string;
}

// ─── Auth Types ───────────────────────────────────────────────────────────────

export interface User {
    id: number;
    name: string;
    email: string;
    role: "SuperAdmin" | string;
    created_at: string;
    updated_at: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

// ─── Dashboard Types ──────────────────────────────────────────────────────────

export interface DashboardState {
    tenant_count: number;
}
