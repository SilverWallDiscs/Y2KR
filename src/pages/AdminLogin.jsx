import React, { useState } from 'react'
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

export default function AdminLogin() {
  const navigate = useNavigate() // hook para navegar entre rutas
  const [formData, setFormData] = useState({ // estado para los datos del formulario
    username: '', 
    password: '' 
  })
  const [error, setError] = useState('') // estado para mostrar error si credenciales son incorrectas

  const handleChange = (e) => { // cambia los valores del formulario mientras escribes
    setFormData({
      ...formData, // mantiene lo que ya hay
      [e.target.name]: e.target.value // actualiza solo el campo que cambio
    })
  }

  const handleSubmit = (e) => { // al enviar el formulario
    e.preventDefault() // evito que recargue la pagina
    
    const adminCredentials = { // credenciales de prueba
      user: 'admin',
      password: 'admin123'
    }

    if (formData.username === adminCredentials.user && formData.password === adminCredentials.password) { 
      // si el usuario y contraseña coinciden
      localStorage.setItem('adminLoggedIn', 'true') // guardo en localstorage que el admin esta logeado
      navigate('/admin-panel') // lo llevo al panel de admin
    } else {
      setError('Credenciales incorrectas. Intente nuevamente.') // muestro error
      setTimeout(() => setError(''), 3000) // limpio el error despues de 3 segundos
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100"> 
      {/* contenedor centrado vertical y horizontal ocupa toda la altura de la pantalla */}
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}> {/* columna de tamaño medio/grande */}
          <Card className="admin-form shadow-lg border-0"> {/* tarjeta con sombra y sin borde */}
            <Card.Body className="p-5"> {/* cuerpo de la tarjeta con padding */}
              
              <div className="text-center mb-4"> {/* encabezado centrado */}
                <i className="fas fa-lock fa-3x text-primary mb-3"></i> {/* icono de candado */}
                <Card.Title className="h3">Acceso Administrador</Card.Title> {/* titulo */}
                <p className="text-muted">Panel de gestión KorteY2K</p> {/* subtitulo */}
              </div>
              
              <Alert variant="info" className="mb-4"> {/* mensaje de info con credenciales de prueba */}
                <strong>Credenciales de prueba:</strong>
                <br />
                <strong>Usuario:</strong> admin
                <br />
                <strong>Contraseña:</strong> admin123
              </Alert>
              
              <Form onSubmit={handleSubmit}> {/* formulario */}
                <Form.Group className="mb-3"> {/* grupo input usuario */}
                  <Form.Label>Usuario administrador</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username} // valor del input
                    onChange={handleChange} // actualiza estado al escribir
                    placeholder="Ingresa tu usuario"
                    required
                    className="py-2"
                  />
                </Form.Group>
                
                <Form.Group className="mb-4"> {/* grupo input contraseña */}
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password} // valor del input
                    onChange={handleChange} // actualiza estado al escribir
                    placeholder="Ingresa tu contraseña"
                    required
                    className="py-2"
                  />
                </Form.Group>
                
                <Button type="submit" variant="primary" className="w-100 py-2 fw-bold"> 
                  {/* boton de enviar formulario */}
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Acceder al panel
                </Button>
                
                {error && ( // si hay error lo muestro
                  <Alert variant="danger" className="mt-3 text-center">
                    {error}
                  </Alert>
                )}
              </Form>

              <div className="text-center mt-4"> {/* enlace para volver al sitio principal */}
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
