import React from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../auth/AuthContext';

export default function GradientAppNavbar() {
  const { currentUser, logout, carrito } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const totalItems = carrito.reduce((total, item) => total + (item.cantidad || 1), 0);

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      className="mb-4 border-bottom border-primary"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
      }}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center fw-bold fs-3">
            <img
              src="/assets/Logo.png"
              width="40"
              height="40"
              className="d-inline-block align-top me-3"
              alt="Logo KorteY2K"
            />
            <span className="text-warning">Korte</span>
            <span className="text-white">Y2K</span>
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <LinkContainer to="/">
              <Nav.Link className="mx-2 fw-semibold hover-effect">Inicio</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/productos">
              <Nav.Link className="mx-2 fw-semibold hover-effect">Tienda</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contacto">
              <Nav.Link className="mx-2 fw-semibold hover-effect">Contacto</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav className="align-items-center">
            <LinkContainer to="/carrito">
              <Nav.Link className="position-relative mx-3">
                <Button variant="outline-dark" className="position-relative">
                  
                  <img src="/assets/carrito.png" width={25} alt="" />

                  {carrito.length > 0 && (
                    <Badge 
                      bg="warning" 
                      text="dark"
                      className="position-absolute top-0 start-100 translate-middle"
                    >
                      {totalItems}
                    </Badge>
                  )}
                  
                </Button>
              </Nav.Link>
            </LinkContainer>
            
            {currentUser ? (
              <div className="d-flex align-items-center">
                <span className="text-light me-3">
                  ¡Hola, <strong>{currentUser.nombre}</strong>!
                </span>
                <Button 
                  variant="outline-warning" 
                  size="sm"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Salir
                </Button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <LinkContainer to="/login">
                  <Button variant="outline-light">
                    Iniciar Sesión
                  </Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="warning" className="text-dark">
                    Registrarse
                  </Button>
                </LinkContainer>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}