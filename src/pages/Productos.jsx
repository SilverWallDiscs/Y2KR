import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap'
import { useAuth } from '../auth/AuthContext'

export default function Productos() {
  const { addToCart } = useAuth()
  const [productos, setProductos] = useState([])
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas')

  useEffect(() => {
    // Cargar productos originales
    const productosOriginales = [
      {
        id: 1,
        nombre: "Poleron Oversize",
        precio: 3500,
        imagen: "/assets/producto1.webp",
        categoria: "Poleron",
        descripcion: "Poleron oversize cómoda y estilo urbano"
      },
      {
        id: 2,
        nombre: "Poleron Y2K",
        precio: 12000,
        imagen: "/assets/producto2.webp",
        categoria: "Poleron",
        descripcion: "Poleron estilo años 2000"
      },
      {
        id: 3,
        nombre: "Pantalón Cargo",
        precio: 8700,
        imagen: "/assets/producto3.webp",
        categoria: "Pantalones",
        descripcion: "Pantalón cargo con múltiples bolsillos"
      },
      {
        id: 4,
        nombre: "Gorra Estilo Retro",
        precio: 2900,
        imagen: "/assets/producto4.webp",
        categoria: "Accesorios",
        descripcion: "Gorra retro para completar tu look"
      },
      {
        id: 5,
        nombre: "Baggy Jeans",
        precio: 22900,
        imagen: "/assets/producto5.webp",
        categoria: "Pantalones",
        descripcion: "Jeans baggy estilo vintage"
      },
      {
        id: 6,
        nombre: "Jeans True Religion",
        precio: 29900,
        imagen: "/assets/producto6.webp",
        categoria: "Pantalones",
        descripcion: "Jeans de alta calidad marca True Religion"
      },
      {
        id: 7,
        nombre: "Pantalon RealTree",
        precio: 14900,
        imagen: "/assets/producto7.webp",
        categoria: "Pantalones",
        descripcion: "Pantalón camuflaje RealTree"
      },
      {
        id: 8,
        nombre: "Polera Oversize",
        precio: 8500,
        imagen: "/assets/producto8.png",
        categoria: "Poleras",
        descripcion: "Poleras oversize cómoda y estilo urbano"
      }
      
    ]

    // Cargar productos del administrador desde localStorage
    const productosAdmin = JSON.parse(localStorage.getItem('adminProducts') || '[]')
    setProductos([...productosOriginales, ...productosAdmin])
  }, [])

  const categorias = [
    { id: 'todas', nombre: 'Todos los Productos', emoji: '👕' },
    { id: 'Poleras', nombre: 'Poleras', emoji: '👚' },
    { id: 'Poleron', nombre: 'Poleron', emoji: '🧥' },
    { id: 'Pantalones', nombre: 'Pantalones', emoji: '👖' },
    { id: 'Accesorios', nombre: 'Accesorios', emoji: '🧢' }
  ]

  const productosFiltrados = categoriaFiltro === 'todas' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaFiltro)

  const handleAddToCart = (producto) => {
    addToCart(producto)
    // Mostrar notificación bonita
    const alertDiv = document.createElement('div')
    alertDiv.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3'
    alertDiv.style.zIndex = '9999'
    alertDiv.innerHTML = `
      <strong>¡Agregado al carrito!</strong> ${producto.nombre} 🛒
    `
    document.body.appendChild(alertDiv)
    
    setTimeout(() => {
      alertDiv.remove()
    }, 2000)
  }

  return (
    <Container>
      <h2 className="page-title">👕 Nuestra Colección Y2K</h2>
      <p className="muted mb-4">Descubre las últimas tendencias en ropa estilo años 2000</p>
      
      {/* Filtros de categoría - ACTUALIZADO */}
      <div className="mb-4 text-center">
        <div className="d-flex flex-wrap justify-content-center">
          {categorias.map(cat => (
            <div
              key={cat.id}
              className={`categoria-filtro ${categoriaFiltro === cat.id ? 'active' : ''}`}
              onClick={() => setCategoriaFiltro(cat.id)}
            >
              <span className="emoji">{cat.emoji}</span>
              {cat.nombre}
            </div>
          ))}
        </div>
      </div>

      {productosFiltrados.length === 0 ? (
        <Alert variant="info" className="text-center">
          <h5>No hay productos en esta categoría</h5>
          <p className="mb-0">Prueba con otra categoría o vuelve más tarde</p>
        </Alert>
      ) : (
        <Row>
          {productosFiltrados.map(producto => (
            <Col key={producto.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 producto-card">
                <div className="position-relative">
                  <Card.Img 
                    variant="top" 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    style={{ height: '300px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x400?text=Imagen+no+disponible'
                    }}
                  />
                  <Badge className="position-absolute top-0 end-0 m-2 badge-categoria">
                    {producto.categoria}
                  </Badge>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="producto-nombre">
                    {producto.nombre}
                  </Card.Title>
                  
                  {producto.descripcion && (
                    <Card.Text className="text-muted small mb-2">
                      {producto.descripcion}
                    </Card.Text>
                  )}
                  
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="producto-precio">
                        ${producto.precio.toLocaleString('es-CL')}
                      </span>
                      <small className="text-muted">
                        {producto.stock || 'En stock'}
                      </small>
                    </div>
                    
                    <Button 
                      variant="primary" 
                      className="w-100"
                      onClick={() => handleAddToCart(producto)}
                    >
                      🛒 Agregar al Carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}