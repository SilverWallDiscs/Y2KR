import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    const loadFeaturedProducts = () => {
      const productosAdmin = JSON.parse(localStorage.getItem('adminProducts') || '[]')
      const defaultProducts = [
        {
          id: 1,
          nombre: "Polera Oversize",
          precio: 3500,
          imagen: "/assets/producto1.webp",
          categoria: "Poleras",
          descripcion: "Polera oversize cómoda y estilo urbano",
          stock: 15
        },
        {
          id: 2,
          nombre: "Polerón Y2K",
          precio: 12000,
          imagen: "/assets/producto2.webp",
          categoria: "Poleron",
          descripcion: "Polerón estilo años 2000",
          stock: 8
        },
        {
          id: 3,
          nombre: "Pantalón Cargo",
          precio: 8700,
          imagen: "/assets/producto3.webp",
          categoria: "Pantalones",
          descripcion: "Pantalón cargo con múltiples bolsillos",
          stock: 12
        }
      ]
      
      const productosActualizados = defaultProducts.map(producto => {
        const productoActualizado = productosAdmin.find(p => p.id === producto.id)
        return productoActualizado || producto
      })
      
      setFeaturedProducts(productosActualizados)
    }

    loadFeaturedProducts()
    
    const handleStorageChange = () => {
      loadFeaturedProducts()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1 className="page-title">Bienvenido a KorteY2K</h1>
          <p className="muted">Ropa y accesorios con estilo Y2K</p>
        </Col>
      </Row>
      
      {/* Hero Section */}
      <section className="hero-section mb-5">
        <div className="hero-content text-center text-white py-5">
          <h1>Descubre la nueva colección</h1>
          <p className="lead">Estilo, calidad y comodidad para cada momento.</p>
          <a href="/Productos" className="btn btn-light btn-lg">Comprar ahora</a>
        </div>
      </section>
      
      {/* Productos Destacados */}
      <section className="productos-destacados mb-5">
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <Row>
          {featuredProducts.map((producto) => (
            <Col key={producto.id} md={4} className="mb-4">
              <Card className="h-100 producto-card">
                <Card.Img 
                  variant="top" 
                  src={producto.imagen} 
                  alt={producto.nombre}
                  style={{ height: '250px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x250?text=Imagen+no+disponible'
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="producto-nombre">{producto.nombre}</Card.Title>
                  <Card.Text className="text-muted producto-precio">
                    ${producto.precio.toLocaleString('es-CL')}
                  </Card.Text>
                  <Card.Text className="small text-muted">
                    Stock: {producto.stock} unidades
                  </Card.Text>
                  <a href="/Productos" className="btn btn-primary mt-auto">Ver producto</a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  )
}