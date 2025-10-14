import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [carrito, setCarrito] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay usuario en localStorage al cargar
    const user = localStorage.getItem('currentUser')
    const cart = localStorage.getItem('tg_cart')
    
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    
    if (cart) {
      try {
        setCarrito(JSON.parse(cart))
      } catch (e) {
        setCarrito([])
      }
    }
    
    setLoading(false)
  }, [])

  // Persistir carrito cuando cambie
  useEffect(() => {
    localStorage.setItem('tg_cart', JSON.stringify(carrito))
  }, [carrito])

  const login = async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find(u => 
          u.username === credentials.username && u.password === credentials.password
        )
        
        if (user) {
          const userData = {
            id: user.id,
            username: user.username,
            nombre: user.nombre,
            apellido: user.apellido
          }
          setCurrentUser(userData)
          localStorage.setItem('currentUser', JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error('Credenciales incorrectas'))
        }
      }, 1000)
    })
  }

  const register = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const users = JSON.parse(localStorage.getItem('users') || '[]')
          
          if (users.find(u => u.username === userData.username)) {
            reject(new Error('El usuario ya existe'))
            return
          }

          const newUser = {
            id: Date.now(),
            ...userData,
            fechaRegistro: new Date().toISOString()
          }

          users.push(newUser)
          localStorage.setItem('users', JSON.stringify(users))
          resolve(newUser)
        } catch (error) {
          reject(new Error('Error al registrar usuario'))
        }
      }, 1000)
    })
  }

  const logout = () => {
    setCurrentUser(null)
    setCarrito([]) // Limpiar carrito al cerrar sesión
    localStorage.removeItem('currentUser')
    localStorage.removeItem('tg_cart')
  }

  // Funciones del carrito
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

  const removeFromCart = (index) => {
    setCarrito(prev => prev.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setCarrito([])
  }

  const updateCartItemQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return
    
    setCarrito(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, cantidad: newQuantity } : item
      )
    )
  }

  const value = {
    currentUser,
    carrito,
    login,
    register,
    logout,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItemQuantity
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}