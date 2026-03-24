import { useGetDashboard } from "../../hooks/dashboard/useGetDashboard";
import Loading from "../../components/admin/Loading";
import { MESSAGES } from "../../constants/messages";

const M = MESSAGES.dashboard;

function Dashboard() {
    const { data, isLoading, error } = useGetDashboard();

    if (isLoading) return <Loading />;
    if (error) return <div>{MESSAGES.errors.unknownError}: {error.message}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{M.title}</h1>
            <div className="bg-white p-4 rounded shadow mt-4">
                <h2 className="text-xl font-semibold">{M.tenantsCount}</h2>
                <p>{data?.tenant_count ?? 0}</p>
            </div>
        </div>
    );
}

export default Dashboard;
