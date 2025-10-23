import React from 'react'
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap'
import { useAuth } from '../auth/AuthContext'
import { updateProductStock } from './AdminPanel'

export default function Carrito() {
  const { carrito, removeFromCart, clearCart, updateCartItemQuantity } = useAuth()

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * (item.cantidad || 1)), 0)
  }

  const handleCheckout = () => {
    if (carrito.length === 0) return
    
    alert('¡Compra realizada con éxito! Gracias por tu compra en KorteY2K.')
    clearCart()
  }

  

  const aumentarCantidad = (index) => {
    const item = carrito[index]
    updateCartItemQuantity(index, (item.cantidad || 1) + 1)
  }

  const disminuirCantidad = (index) => {
    const item = carrito[index]
    if ((item.cantidad || 1) > 1) {
      updateCartItemQuantity(index, (item.cantidad || 1) - 1)
    }
  }

  return (
    <Container>
      <h2 className="page-title">🛒 Mi Carrito de Compras</h2>
      
      {carrito.length === 0 ? (
        <Alert variant="info" className="text-center py-5">
          <div className="py-4">
            <h4 className="mb-3">Tu carrito está vacío</h4>
            <p className="text-muted mb-4">Descubre nuestra increíble colección de ropa Y2K</p>
            <Button variant="primary" href="/productos" size="lg">
              Explorar Productos
            </Button>
          </div>
        </Alert>
      ) : (
        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header className="bg-white">
                <h5 className="mb-0">
                  Productos en el carrito ({carrito.reduce((total, item) => total + (item.cantidad || 1), 0)} items)
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                {carrito.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="carrito-item">
                    <Row className="align-items-center">
                      <Col md={3}>
                        <img 
                          src={item.imagen} 
                          alt={item.nombre}
                          className="rounded-3 w-100"
                          style={{ height: '120px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200x200?text=Imagen+no+disponible'
                          }}
                        />
                      </Col>
                      
                      <Col md={4}>
                        <h6 className="producto-nombre mb-2">{item.nombre}</h6>
                        <Badge bg="secondary" className="badge-categoria">
                          {item.categoria}
                        </Badge>
                      </Col>
                      
                      <Col md={2}>
                        <div className="text-center">
                          <h6 className="producto-precio mb-0">
                            ${item.precio.toLocaleString('es-CL')}
                          </h6>
                          <small className="text-muted">c/u</small>
                        </div>
                      </Col>
                      
                      <Col md={2}>
                        <div className="cantidad-controls justify-content-center">
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => disminuirCantidad(index)}
                            disabled={(item.cantidad || 1) <= 1}
                          >
                            -
                          </Button>
                          <span className="mx-3 fw-bold">{item.cantidad || 1}</span>
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => aumentarCantidad(index)}
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                      
                      <Col md={1}>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(index)}
                          className="border-0"
                        >
                          🗑️
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Card.Body>
            </Card>
            
            <div className="d-flex gap-3">
              <Button variant="outline-secondary" onClick={clearCart}>
                Vaciar Carrito
              </Button>
              <Button variant="outline-primary" href="/productos">
                Seguir Comprando
              </Button>
            </div>
          </Col>
          
          <Col lg={4}>
            <Card className="carrito-total">
              <Card.Body>
                <h5 className="mb-4 text-center">Resumen de Compra</h5>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal:</span>
                  <span>${calcularTotal().toLocaleString('es-CL')}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Envío:</span>
                  <span className="text-success">Gratis</span>
                </div>
                
                <hr className="my-3" />
                
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total:</strong>
                  <strong className="fs-4">
                    ${calcularTotal().toLocaleString('es-CL')}
                  </strong>
                </div>
                
                <Button 
                  variant="light" 
                  size="lg" 
                  className="w-100 fw-bold"
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                </Button>
                
                <div className="text-center mt-3">
                  <small className="opacity-75">
                    ✅ Envío gratis en compras sobre $20.000
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}