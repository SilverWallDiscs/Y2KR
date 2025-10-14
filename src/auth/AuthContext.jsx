import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay usuario en localStorage al cargar
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    // Simular autenticación
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
          
          // Verificar si el usuario ya existe
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
    localStorage.removeItem('currentUser')
  }

  const value = {
    currentUser,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}