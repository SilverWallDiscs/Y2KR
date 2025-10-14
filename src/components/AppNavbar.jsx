import React from 'react'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from '../auth/AuthContext'

export default function AppNavbar() {
  const { currentUser, logout, carrito } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/assets/Logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
              alt="Logo KorteY2K"
            />
            KorteY2K
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/productos">
              <Nav.Link>Tienda</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contacto">
              <Nav.Link>Contacto</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav>
            <LinkContainer to="/carrito">
              <Nav.Link>
                🛒 Carrito
                {carrito.length > 0 && (
                  <Badge bg="primary" className="ms-1">
                    {carrito.reduce((total, item) => total + (item.cantidad || 1), 0)}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            
            {currentUser ? (
              <>
                <Navbar.Text className="me-3">
                  Hola, {currentUser.nombre}
                </Navbar.Text>
                <Nav.Link onClick={handleLogout}>
                  Cerrar Sesión
                </Nav.Link>
              </>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>Iniciar Sesión</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}