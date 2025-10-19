import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function AppFooter() {
  return (
    <footer className="bg-dark text-white mt-5 pt-5 pb-4">
      <Container>
        <Row>
          {/* Información de la tienda */}
          <Col lg={4} md={6} className="mb-4">
            <h5 className="fw-bold mb-3">
              <img
                src="/assets/Logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top me-2"
                alt="Logo KorteY2K"
              />
              KorteY2K
            </h5>
            <p className="text-light">
              Tu tienda de ropa estilo Y2K. Encuentra las mejores prendas oversize, 
              camperas y accesorios con el auténtico estilo de los años 2000.
            </p>
            <div className="social-links">
              <a href="#" className="text-white me-3" aria-label="Instagram">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-white me-3" aria-label="TikTok">
                <i className="fab fa-tiktok fa-lg"></i>
              </a>
              <a href="#" className="text-white me-3" aria-label="Facebook">
                <i className="fab fa-facebook-f fa-lg"></i>
              </a>
              <a href="#" className="text-white" aria-label="Twitter">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
            </div>
          </Col>

          {/* Enlaces rápidos */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/productos" className="text-light text-decoration-none">
                  Tienda
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto" className="text-light text-decoration-none">
                  Contacto
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/carrito" className="text-light text-decoration-none">
                  Mi Carrito
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contacto y Admin */}
          <Col lg={4} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Contacto & Admin</h6>
            <div className="mb-3">
              <p className="mb-1">
                <i className="fas fa-envelope me-2"></i>
                soporte@kortey2k.com
              </p>
              <p className="mb-1">
                <i className="fas fa-phone me-2"></i>
                +54 11 2345 6789
              </p>
              <p className="mb-3">
                <i className="fas fa-map-marker-alt me-2"></i>
                Viña del Mar, Valparaíso
              </p>
            </div>
            
            {/* Botón de Admin */}
            <div className="admin-access">
              <h6 className="fw-bold mb-2">Acceso Administrador</h6>
              <p className="small text-light mb-2">
                Área restringida para personal autorizado
              </p>
              <Link to="/admin">
                <Button variant="outline-light" size="sm" className="w-100">
                  <i className="fas fa-lock me-2"></i>
                  Panel Admin
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        <hr className="my-4" />

        {/* Copyright */}
        <Row>
          <Col md={6}>
            <p className="mb-0">
              &copy; {new Date().getFullYear()} KorteY2K. Todos los derechos reservados.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-0">
              <a href="#" className="text-light text-decoration-none me-3">Términos</a>
              <a href="#" className="text-light text-decoration-none">Privacidad</a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}