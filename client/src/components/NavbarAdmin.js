import React from "react";
import logoSvg from "../assets/logo-magneto.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function NavbarAdmin() {
  const {user, logout} = useAuth()

  const handleLogout = () => {
    logout()
  }
  return (
    <nav className="flex justify-between items-center py-4 px-12 text-black border-b">
      <img src={logoSvg} alt="Logo" className="h-8" />

      {/* Usuario y acciones */}
      <div className="flex items-center">
        <span className="mr-4 font-semibold">Hola, {user?.username}</span>
        <Link
          to="/login" onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-1 px-2 rounded"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
