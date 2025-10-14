import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap'

export default function Tienda({ onAddToCart }) {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    // Cargar productos originales
    const productosOriginales = [
      {
        id: 1,
        nombre: "Remera Oversize",
        precio: 3500,
        imagen: "/assets/producto1.webp",
        categoria: "remeras"
      },
      {
        id: 2,
        nombre: "Campera Y2K",
        precio: 12000,
        imagen: "/assets/producto2.webp",
        categoria: "camperas"
      },
      {
        id: 3,
        nombre: "Pantalón Cargo",
        precio: 8700,
        imagen: "/assets/producto3.webp",
        categoria: "pantalones"
      },
      {
        id: 4,
        nombre: "Gorra Estilo Retro",
        precio: 2900,
        imagen: "/assets/producto4.webp",
        categoria: "accesorios"
      },
      {
        id: 5,
        nombre: "Baggy Jeans",
        precio: 22900,
        imagen: "/assets/producto5.webp",
        categoria: "pantalones"
      },
      {
        id: 6,
        nombre: "Jeans True Religion",
        precio: 29900,
        imagen: "/assets/producto6.webp",
        categoria: "pantalones"
      },
      {
        id: 7,
        nombre: "Pantalon RealTree",
        precio: 14900,
        imagen: "/assets/producto7.webp",
        categoria: "pantalones"
      }
    ]

    // Cargar productos del administrador desde localStorage
    const productosAdmin = JSON.parse(localStorage.getItem('adminProducts') || '[]')
    setProductos([...productosOriginales, ...productosAdmin])
  }, [])

  const handleAddToCart = (producto) => {
    if (onAddToCart) {
      onAddToCart(producto)
    }
    alert(`${producto.nombre} agregado al carrito 🛒`)
  }

  return (
    <Container>
      <h2 className="page-title text-center mb-4">Nuestros Productos</h2>
      
      {productos.length === 0 ? (
        <Alert variant="info" className="text-center">
          No hay productos disponibles en este momento.
        </Alert>
      ) : (
        <Row>
          {productos.map(producto => (
            <Col key={producto.id} md={6} lg={4} className="mb-4">
              <Card className="h-100">
                <Card.Img 
                  variant="top" 
                  src={producto.imagen} 
                  alt={producto.nombre}
                  style={{ height: '300px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400?text=Imagen+no+disponible'
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text className="text-muted fs-5 fw-bold">
                    ${producto.precio.toLocaleString()}
                  </Card.Text>
                  <Card.Text className="text-muted">
                    Categoría: {producto.categoria}
                  </Card.Text>
                  <Button 
                    variant="primary" 
                    className="mt-auto"
                    onClick={() => handleAddToCart(producto)}
                  >
                    Agregar al carrito
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}