import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import logoSvg from '../assets/logo-magneto.png';
import {useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {signup, user, isAuthenticated, errors:registerErrors} = useAuth();
  console.log(user)

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) navigate('/');
  },[isAuthenticated, navigate])

  const onSubmit = async data => {
    signup(data)
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <img src={logoSvg} alt="Logo" className="mx-auto" />
          <h1 className="text-3xl font-bold text-gray-800">Panel</h1>
        </div>
        {
          registerErrors.map((error, index) => <p key={index} className="text-red-500 text-sm mt-1">{error}</p>)
        }
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Nombre de Empresa
            </label>
            <input
              type="text"
              id="username"
              {...register('username', { required: 'El nombre de Empresa es obligatorio' })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.username ? 'border-red-500' : ''}`}
              placeholder="Ingresa el nombre de Empresa"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'El correo electrónico es obligatorio' })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Ingresa tu correo electrónico"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'La contraseña es obligatoria' })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="Ingresa tu contraseña"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Registrarse
            </button>
            <a href="login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              ¿Ya tienes una cuenta?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;