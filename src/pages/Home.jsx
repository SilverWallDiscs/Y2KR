import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';



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
    <Carousel className="mb-5">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/Fondo1.webp"
          alt="Primera diapositiva"
          style={{ maxHeight: '500px', objectFit: 'cover' }}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/800x500?text=Imagen+no+disponible' }}
        />
        <Carousel.Caption>
          <h3>Primera Colección</h3>
          <p>Descubre nuestra línea urbana Y2K con estilo y actitud.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/Fondo5.jpg "
          alt="Segunda diapositiva"
          style={{ maxHeight: '500px', objectFit: 'cover' }}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/800x500?text=Imagen+no+disponible' }}
        />
        <Carousel.Caption>
          <h3>Nueva Temporada</h3>
          <p>Looks frescos, cómodos y con mucha onda.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/Fondo2.jpg"
          alt="Tercera diapositiva"
          style={{ maxHeight: '500px', objectFit: 'cover' }}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/800x500?text=Imagen+no+disponible' }}
        />
        <Carousel.Caption>
          <h3>¡Exprésate!</h3>
          <p>Moda que refleja tu personalidad.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

      
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
                  style={{ height: '500px', objectFit: 'cover' }}
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