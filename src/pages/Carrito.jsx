import React, { useMemo } from 'react'
import { Container, Table, Button, Alert, Card } from 'react-bootstrap'

export default function Carrito({ items, onRemove, onClear, onCheckout }) {
  const total = useMemo(() => items.reduce((acc, p) => acc + p.precio * (p.cantidad || 1), 0), [items])

  return (
    <Container>
      <h2 className="page-title">Carrito</h2>
      {items.length === 0 ? (
        <Alert variant="info">
          <div className="text-center py-4">
            <p className="mb-3">Tu carrito está vacío</p>
            <Button variant="primary" href="/tienda">
              Ir a la tienda
            </Button>
          </div>
        </Alert>
      ) : (
        <>
          <Table hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p, i) => (
                <tr key={`${p.id}-${i}`}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={p.imagen} 
                        alt={p.nombre}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/50x50?text=Imagen'
                        }}
                      />
                      {p.nombre}
                    </div>
                  </td>
                  <td>${p.precio.toLocaleString('es-CL')}</td>
                  <td>{p.cantidad || 1}</td>
                  <td>${((p.precio || 0) * (p.cantidad || 1)).toLocaleString('es-CL')}</td>
                  <td>
                    <Button size="sm" variant="outline-danger" onClick={() => onRemove(i)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <Card className="mt-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Total: ${total.toLocaleString('es-CL')}</h5>
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" onClick={onClear}>
                    Vaciar Carrito
                  </Button>
                  <Button variant="success" onClick={onCheckout}>
                    Finalizar compra
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  )
}