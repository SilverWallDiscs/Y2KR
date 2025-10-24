import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import AppNavbar from './components/AppNavbar'
import AppFooter from './components/AppFooter'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Register from './pages/Register'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/AdminLogin'
import AdminPanel from './pages/AdminPanel'

export default function App() {
    const [carrito, setCarrito] = useState([])

    // Persistir carrito
    useEffect(() => {
        const raw = localStorage.getItem('tg_cart')
        if (raw) { 
            try {
                setCarrito(JSON.parse(raw)) 
            } catch (e) {
                setCarrito([])
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('tg_cart', JSON.stringify(carrito))
    }, [carrito])

    const addToCart = (item) => {
        setCarrito(prev => {
            const existingItem = prev.find(p => p.id === item.id)
            if (existingItem) {
                return prev.map(p => 
                    p.id === item.id 
                        ? { ...p, cantidad: (p.cantidad || 1) + 1 }
                        : p
                )
            }
            return [...prev, { ...item, cantidad: 1 }]
        })
    }

    const removeFromCart = (index) => setCarrito(prev => prev.filter((_, i) => i !== index))
    const clearCart = () => setCarrito([])

    const handleCheckout = () => {
        alert('compra realizada con exito gracias por tu compra en kortey2k')
        clearCart()
    }

    return (
        <AuthProvider>
            <Router>
                <div className="d-flex flex-column min-vh-100">
                    <AppNavbar />
                    <main className="flex-grow-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/productos" element={<Productos onAddToCart={addToCart} />} />
                            <Route path="/contacto" element={<Contacto />} />
                            <Route path="/carrito" element={
                                <ProtectedRoute>
                                    <Carrito 
                                        items={carrito} 
                                        onRemove={removeFromCart} 
                                        onClear={clearCart}
                                        onCheckout={handleCheckout}
                                    />
                                </ProtectedRoute>
                            } />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/admin" element={<AdminLogin />} />
                            <Route path="/admin-panel" element={<AdminPanel />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <AppFooter />
                </div>
            </Router>
        </AuthProvider>
    )
}