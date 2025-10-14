import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Tabs } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function AdminPanel() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    categoria: '',
    descripcion: ''
  })
  const [message, setMessage] = useState({ text: '', type: '' })

  useEffect(() => {
    // Verificar si el admin está logueado
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin')
      return
    }
    loadProducts()
  }, [navigate])

  const loadProducts = () => {
    const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
    setProducts(adminProducts)
  }

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    
    if (!newProduct.nombre || !newProduct.precio || !newProduct.imagen || !newProduct.categoria) {
      setMessage({ text: 'Por favor completa todos los campos obligatorios', type: 'danger' })
      return
    }

    const product = {
      id: Date.now(),
      nombre: newProduct.nombre,
      precio: parseFloat(newProduct.precio),
      imagen: newProduct.imagen,
      categoria: newProduct.categoria,
      descripcion: newProduct.descripcion
    }

    const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
    adminProducts.push(product)
    localStorage.setItem('adminProducts', JSON.stringify(adminProducts))

    setMessage({ text: 'Producto agregado correctamente', type: 'success' })
    setNewProduct({ nombre: '', precio: '', imagen: '', categoria: '', descripcion: '' })
    loadProducts()

    setTimeout(() => setMessage({ text: '', type: '' }), 3000)
  }

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
      const updatedProducts = adminProducts.filter(p => p.id !== productId)
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts))
      loadProducts()
      setMessage({ text: 'Producto eliminado correctamente', type: 'success' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    navigate('/')
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">
                <i className="fas fa-cog me-2"></i>
                Panel de Administración
              </h2>
              <Button variant="outline-danger" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-0">
                Gestiona los productos y contenido de tu tienda
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {message.text && (
        <Alert variant={message.type} className="mb-4">
          {message.text}
        </Alert>
      )}

      <Tabs defaultActiveKey="products" className="mb-4">
        <Tab eventKey="products" title="Gestionar Productos">
          <Row>
            <Col md={6}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-plus-circle me-2"></i>
                    Agregar Nuevo Producto
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleAddProduct}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre del Producto *</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={newProduct.nombre}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Precio *</Form.Label>
                      <Form.Control
                        type="number"
                        name="precio"
                        value={newProduct.precio}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>URL de la Imagen *</Form.Label>
                      <Form.Control
                        type="text"
                        name="imagen"
                        value={newProduct.imagen}
                        onChange={handleInputChange}
                        placeholder="https://ejemplo.com/imagen.jpg"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Categoría *</Form.Label>
                      <Form.Select
                        name="categoria"
                        value={newProduct.categoria}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar categoría</option>
                        <option value="remeras">Remeras</option>
                        <option value="camperas">Camperas</option>
                        <option value="pantalones">Pantalones</option>
                        <option value="accesorios">Accesorios</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="descripcion"
                        value={newProduct.descripcion}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Button type="submit" variant="primary" className="w-100">
                      <i className="fas fa-save me-2"></i>
                      Guardar Producto
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-list me-2"></i>
                    Productos Agregados ({products.length})
                  </h5>
                </Card.Header>
                <Card.Body>
                  {products.length === 0 ? (
                    <p className="text-muted text-center">No hay productos agregados</p>
                  ) : (
                    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                      {products.map(product => (
                        <Card key={product.id} className="mb-3">
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="mb-1">{product.nombre}</h6>
                                <p className="mb-1 text-muted">${product.precio}</p>
                                <small className="text-muted">Categoría: {product.categoria}</small>
                              </div>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="stats" title="Estadísticas">
          <Row>
            <Col md={3} className="mb-3">
              <Card className="text-center">
                <Card.Body>
                  <h3>{products.length}</h3>
                  <p className="text-muted mb-0">Productos Totales</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-3">
              <Card className="text-center">
                <Card.Body>
                  <h3>${products.reduce((sum, p) => sum + p.precio, 0).toLocaleString()}</h3>
                  <p className="text-muted mb-0">Valor Total Inventario</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  )
}