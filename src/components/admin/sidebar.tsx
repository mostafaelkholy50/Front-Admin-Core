import { HiOutlineHome, HiOutlineUsers, HiOutlineCog } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { MESSAGES } from "../../constants/messages";

const M = MESSAGES.sidebar;

function Sidebar() {
    const location = useLocation();

    const menuItems = [
        { name: M.home, path: "/", icon: <HiOutlineHome /> },
        { name: M.tenants, path: "/Tenant", icon: <HiOutlineUsers /> },
        { name: M.settings, path: "/settings", icon: <HiOutlineCog /> },
    ];

    return (
        <aside className="hidden lg:flex flex-col w-64 bg-gray-900 h-screen transition-all duration-300">
            <div className="flex items-center justify-center h-20 shadow-md">
                <h1 className="text-white font-bold text-xl">{M.title}</h1>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                            location.pathname === item.path
                                ? "bg-indigo-600 text-white"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        }`}
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
