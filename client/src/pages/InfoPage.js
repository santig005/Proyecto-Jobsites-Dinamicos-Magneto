import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function InfoPage() {
  const {logout} = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Job-sites dinamicos</h1>
        <p className="mb-4">
          El proyecto fue realizado por Camilo soto, Victor Villadiego, Santiago Gomez y Jacobo Zuluaga, con el propósito de resolver una prblemática que se presenta en el mundo laboral.
        </p>
        <p className="mb-4">
          Para la solución del problema utilizamos un framework/libreria Opens source de JavaScript llamada GrapesJS, que nos permite crear interfaces dinámicas para los sitios web. Es decir, un editor grag-and-drop de páginas web, con el fin de eliminar los largos tiempos de espera entre el personal de la empresa y el cliente.
        </p>
        <p className="mb-8">
          Con esta implementacion se logra reducir costes de tiempo y dinero de ambas empresas y además se aumenta la capacidad de personalizacion de la página web ya que no dependera solamente de una plantilla sino que será completamente dinámica.
        </p>
        <div className="flex justify-between">
          <Link to="/editor" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Editor
          </Link>
          <Link to="/login" onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
