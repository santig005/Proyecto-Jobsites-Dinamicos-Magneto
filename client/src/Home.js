import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import EditorPage from './pages/EditorPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContext'
import InfoPage from './pages/InfoPage'
import ProtectedRoute from './ProtectedRoute'
export default function Home() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>

            <Route element={<ProtectedRoute/>}>
              <Route path='/' element={<InfoPage/>}/>
              <Route path='/editor' element={<EditorPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}
