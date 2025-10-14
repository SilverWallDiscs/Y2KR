import React, { useState } from 'react'
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

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
      navigate('/admin-panel')
    } else {
      setError('Credenciales incorrectas. Intente nuevamente.')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="admin-form shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <i className="fas fa-lock fa-3x text-primary mb-3"></i>
                <Card.Title className="h3">
                  Acceso Administrador
                </Card.Title>
                <p className="text-muted">Panel de gestión KorteY2K</p>
              </div>
              
              <Alert variant="info" className="mb-4">
                <strong>Credenciales de prueba:</strong>
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
                    placeholder="Ingresa tu usuario"
                    required
                    className="py-2"
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña"
                    required
                    className="py-2"
                  />
                </Form.Group>
                
                <Button type="submit" variant="primary" className="w-100 py-2 fw-bold">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Acceder al panel
                </Button>
                
                {error && (
                  <Alert variant="danger" className="mt-3 text-center">
                    {error}
                  </Alert>
                )}
              </Form>

              <div className="text-center mt-4">
                <Link to="/" className="text-decoration-none">
                  <i className="fas fa-arrow-left me-2"></i>
                  Volver al sitio principal
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}