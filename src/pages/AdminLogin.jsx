import React, { useState } from 'react'
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const adminCredentials = {
      user: 'admin',
      password: 'admin123'
    }

    if (formData.username === adminCredentials.user && formData.password === adminCredentials.password) {
      localStorage.setItem('adminLoggedIn', 'true')
      navigate('/admin')
    } else {
      setError('Credenciales incorrectas. Intente nuevamente.')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="admin-form w-100" style={{ maxWidth: '450px' }}>
        <Card.Body className="p-4">
          <Card.Title className="text-center mb-4">
            <i className="fas fa-lock me-2"></i>
            Acceso Administrador
          </Card.Title>
          
          <Alert variant="info" className="mb-4">
            <strong>Nota:</strong> Esta área es solo para personal autorizado.
            <br /><br />
            <strong>Login temporal</strong>
            <br />
            <strong>Usuario:</strong> admin
            <br />
            <strong>Contraseña:</strong> admin123
          </Alert>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Usuario administrador</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Button type="submit" className="btn-admin w-100">
              Acceder al panel
            </Button>
            
            {error && (
              <Alert variant="danger" className="mt-3 text-center">
                {error}
              </Alert>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}