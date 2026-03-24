import { Outlet } from "react-router-dom";
import Header from "../../../components/admin/header";
import Sidebar from "../../../components/admin/sidebar";

function AdminLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar />

            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header />

                <main className="p-6 mt-16">
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
