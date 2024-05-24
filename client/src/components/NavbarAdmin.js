import React from "react";
import logoSvg from "../assets/logo-magneto.png";
function NavbarAdmin() {
  return (
    <nav className="flex justify-between items-center py-4 px-12 text-black border-b">
      <img src={logoSvg} alt="Logo" className="h-8" />

      {/* Usuario y acciones */}
      <div className="flex items-center">
        <span className="mr-4 font-semibold">Hola, Admin123</span>
        <div className="relative h-8 w-8">
          {/* Icono del usuario */}
          <button className="rounded-full  hover:bg-gray-200 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>

          {/* Acciones desplegables */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
            <ul>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Cerrar sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarAdmin;
