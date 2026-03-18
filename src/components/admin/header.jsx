import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/LoginContext'
import { useNavigate } from 'react-router-dom'

function Header() {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        logout();
        navigate("/login");
    };
  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg fixed top-0 left-0 right-0">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <img src="public/images/logo.png" alt="Logo" className="w-15 h-15" />
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-gray-400">مرحباً،</span>
                <span className="text-white font-bold">{user?.name || "زائر"}</span>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                    تسجيل الخروج
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header