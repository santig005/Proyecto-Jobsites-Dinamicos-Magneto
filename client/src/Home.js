import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './pages/App'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
export default function Home() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<h1>Home</h1>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/editor' element={<App/>}/>
            <Route path='/grapes' element={<h1>Grapes</h1>}/>
        </Routes>
    </BrowserRouter>
  )
}
