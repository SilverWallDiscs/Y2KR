import React from 'react'
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap'
import { useAuth } from '../auth/AuthContext'

export default function Carrito() {
  const { carrito, removeFromCart, clearCart, updateCartItemQuantity } = useAuth() // obtengo carrito y funciones del contexto

  const calcularTotal = () => { // funcion para calcular total
    return carrito.reduce((total, item) => total + (item.precio * (item.cantidad || 1)), 0) // sumo precio por cantidad
  }

  const actualizarStock = () => { // funcion para actualizar stock al finalizar compra
    const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]') // productos admin
    const defaultProducts = JSON.parse(localStorage.getItem('defaultProductsBackup') || '[]') // productos por defecto

    const allProducts = mergeDefaultAndAdmin(defaultProducts, adminProducts) // combino productos

    const productosActualizados = allProducts.map(producto => { // actualizo stock segun carrito
      const itemComprado = carrito.find(c => c.id === producto.id) // busco item comprado
      if (itemComprado) {
        const nuevoStock = (producto.stock || 0) - (itemComprado.cantidad || 1) // resto cantidad comprada
        return { ...producto, stock: Math.max(nuevoStock, 0) } // nunca stock negativo
      }
      return producto
    })

    const nuevosDefault = productosActualizados.filter(p => defaultProducts.some(dp => dp.id === p.id)) // separo productos por defecto
    const nuevosAdmin = productosActualizados.filter(p => !defaultProducts.some(dp => dp.id === p.id)) // separo productos admin

    localStorage.setItem('adminProducts', JSON.stringify(nuevosAdmin)) // guardo productos admin
    if (defaultProducts.length > 0) {
      localStorage.setItem('defaultProductsBackup', JSON.stringify(nuevosDefault)) // guardo respaldo productos por defecto
    }
  }

  const mergeDefaultAndAdmin = (defaultProducts, adminProducts) => { // combino productos por defecto y admin
    const defaultMap = new Map(defaultProducts.map(p => [p.id, p])) // map de default
    const adminMap = new Map(adminProducts.map(p => [p.id, p])) // map de admin

    const merged = [...defaultMap.values()].map(p =>
      adminMap.has(p.id) ? adminMap.get(p.id) : p // reemplazo default por admin si existe
    )

    adminProducts.forEach(p => { // agrego productos admin que no estan en default
      if (!defaultMap.has(p.id)) merged.push(p)
    })

    return merged
  }

  const handleCheckout = () => { // funcion para finalizar compra
    if (carrito.length === 0) return // si carrito vacio no hace nada
    actualizarStock() // actualizo stock
    alert('compra realizada con exito gracias por tu compra en kortey2k') // mensaje de exito
    clearCart() // vacio carrito
  }

  const aumentarCantidad = (index) => { // funcion para aumentar cantidad
    const item = carrito[index] // item actual
    const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]') // productos admin
    const defaultProducts = JSON.parse(localStorage.getItem('defaultProductsBackup') || '[]') // productos por defecto
    const allProducts = mergeDefaultAndAdmin(defaultProducts, adminProducts) // combino productos
    const productoReal = allProducts.find(p => p.id === item.id) // busco producto real

    if (productoReal && (item.cantidad || 1) < productoReal.stock) {
      updateCartItemQuantity(index, (item.cantidad || 1) + 1) // aumento cantidad
    } else {
      alert('no hay mas stock disponible para este producto') // aviso si no hay stock
    }
  }

  const disminuirCantidad = (index) => { // funcion para disminuir cantidad
    const item = carrito[index] // item actual
    if ((item.cantidad || 1) > 1) {
      updateCartItemQuantity(index, (item.cantidad || 1) - 1) // disminuyo cantidad
    }
  }

  return (
    <Container> 
      <h2 className="page-title">mi carrito de compras</h2>

      {carrito.length === 0 ? ( // si carrito vacio
        <Alert variant="info" className="text-center py-5">
          <div className="py-4">
            <h4 className="mb-3">tu carrito esta vacio</h4>
            <p className="text-muted mb-4">descubre nuestra increible coleccion de ropa y2k</p>
            <Button variant="primary" href="/productos" size="lg">
              explorar productos
            </Button>
          </div>
        </Alert>
      ) : ( // si carrito tiene productos
        <Row>
          <Col lg={8}> 
            <Card className="mb-4"> 
              <Card.Header className="bg-white">
                <h5 className="mb-0">
                  productos en el carrito ({carrito.reduce((total, item) => total + (item.cantidad || 1), 0)} items)
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                {carrito.map((item, index) => ( // recorro items del carrito
                  <div key={`${item.id}-${index}`} className="carrito-item">
                    <Row className="align-items-center">
                      <Col md={3}>
                        <img
                          src={item.imagen} // imagen producto
                          alt={item.nombre} // alt
                          className="rounded-3 w-100"
                          style={{ height: '120px', objectFit: 'cover' }}
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/200x200?text=imagen no disponible' }} // fallback imagen
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
                            onClick={() => disminuirCantidad(index)} // boton restar
                            disabled={(item.cantidad || 1) <= 1} // deshabilitado si cantidad 1
                          >
                            -
                          </Button>
                          <span className="mx-3 fw-bold">{item.cantidad || 1}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => aumentarCantidad(index)} // boton sumar
                          >
                            +
                          </Button>
                        </div>
                      </Col>

                      <Col md={1}>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(index)} // boton eliminar item
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
                vaciar carrito
              </Button>
              <Button variant="outline-primary" href="/productos">
                seguir comprando
              </Button>
            </div>
          </Col>

          <Col lg={4}>
            <Card className="carrito-total">
              <Card.Body>
                <h5 className="mb-4 text-center">resumen de compra</h5>

                <div className="d-flex justify-content-between mb-3">
                  <span>subtotal</span>
                  <span>${calcularTotal().toLocaleString('es-CL')}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>envio</span>
                  <span className="text-success">gratis</span>
                </div>

                <hr className="my-3" />

                <div className="d-flex justify-content-between mb-4">
                  <strong>total</strong>
                  <strong className="fs-4">
                    ${calcularTotal().toLocaleString('es-CL')}
                  </strong>
                </div>

                <Button
                  variant="light"
                  size="lg"
                  className="w-100 fw-bold"
                  onClick={handleCheckout} // boton finalizar compra
                >
                  finalizar compra
                </Button>

                <div className="text-center mt-3">
                  <small className="opacity-75">
                    envio gratis en compras sobre $20000
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
