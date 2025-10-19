import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

export default function Home() {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="page-title">Bienvenido a KorteY2K</h1>
          <p className="muted">Ropa y accesorios con estilo Y2K</p>
        </Col>
      </Row>
      
      {/* Hero Section */}
      <section className="hero mb-5 text-center text-white py-5 rounded" 
               style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <h1 id="hero-heading">Descubre la nueva colección</h1>
        <p className="lead">Estilo, calidad y comodidad para cada momento.</p>
        <a href="/Productos" className="btn btn-light btn-lg">Comprar ahora</a>
      </section>
      
      {/* Productos Destacados */}
      <section className="productos-destacados mb-5">
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src="/assets/producto1.webp" alt="Remera Oversize" />
              <Card.Body className="d-flex flex-column">
                <Card.Title>Remera Oversize</Card.Title>
                <Card.Text className="text-muted">$3.500</Card.Text>
                <a href="/Productos" className="btn btn-primary mt-auto">Ver producto</a>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src="/assets/producto2.webp" alt="Campera Y2K" />
              <Card.Body className="d-flex flex-column">
                <Card.Title>Campera Y2K</Card.Title>
                <Card.Text className="text-muted">$12.000</Card.Text>
                <a href="/Productos" className="btn btn-primary mt-auto">Ver producto</a>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src="/assets/producto3.webp" alt="Pantalón Cargo" />
              <Card.Body className="d-flex flex-column">
                <Card.Title>Pantalón Cargo</Card.Title>
                <Card.Text className="text-muted">$8.700</Card.Text>
                <a href="/Productos" className="btn btn-primary mt-auto">Ver producto</a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  )
}