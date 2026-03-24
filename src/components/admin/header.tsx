import { useAuth } from "../../contexts/AuthContext";
import { MESSAGES } from "../../constants/messages";
import { useNavigate } from "react-router-dom";

const M = MESSAGES.auth;

function Header() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <header className="bg-gray-900 text-white p-4 shadow-lg fixed top-0 left-0 right-0">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img src="public/images/logo.png" alt="Logo" className="w-15 h-15" />
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-400">{M.welcome}</span>
                    <span className="text-white font-bold">{user?.name ?? M.guest}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                        {M.logoutButton}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
