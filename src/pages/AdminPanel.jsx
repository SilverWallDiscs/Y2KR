import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Tabs, Table, Modal, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function AdminPanel() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    categoria: '',
    descripcion: '',
    stock: ''
  })
  const [message, setMessage] = useState({ text: '', type: '' })

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
    },
    {
      id: 4,
      nombre: "Gorra Estilo Retro",
      precio: 2900,
      imagen: "/assets/producto4.webp",
      categoria: "Accesorios",
      descripcion: "Gorra retro para completar tu look",
      stock: 20
    },
    {
      id: 5,
      nombre: "Baggy Jeans",
      precio: 22900,
      imagen: "/assets/producto5.webp",
      categoria: "Pantalones",
      descripcion: "Jeans baggy estilo vintage",
      stock: 6
    },
    {
      id: 6,
      nombre: "Jeans True Religion",
      precio: 29900,
      imagen: "/assets/producto6.webp",
      categoria: "Pantalones",
      descripcion: "Jeans de alta calidad marca True Religion",
      stock: 4
    },
    {
      id: 7,
      nombre: "Pantalon RealTree",
      precio: 14900,
      imagen: "/assets/producto7.webp",
      categoria: "Pantalones",
      descripcion: "Pantalón camuflaje RealTree",
      stock: 10
    }
  ]

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    totalSales: 0,
    revenue: 0,
    lowStock: 0
  })

  const [salesData, setSalesData] = useState([])

  useEffect(() => {
    if (!localStorage.getItem('adminLoggedIn')) {
      navigate('/admin')
      return
    }
    loadProducts()
    loadSalesData()
    loadStats()
  }, [navigate])

  const loadProducts = () => {
    const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
    
    const defaultProductsMap = new Map(defaultProducts.map(p => [p.id, p]))
    const adminProductsMap = new Map(adminProducts.map(p => [p.id, p]))
    
    const combinedProducts = [...defaultProductsMap.values()].map(product => {
      return adminProductsMap.has(product.id) ? adminProductsMap.get(product.id) : product
    })
    
    adminProducts.forEach(adminProduct => {
      if (!defaultProductsMap.has(adminProduct.id)) {
        combinedProducts.push(adminProduct)
      }
    })
    
    setProducts(combinedProducts)
  }

  const loadSalesData = () => {
    const savedSalesData = JSON.parse(localStorage.getItem('salesData') || '[]')
    setSalesData(savedSalesData)
  }

  const loadStats = () => {
    const savedSalesData = JSON.parse(localStorage.getItem('salesData') || '[]')
    const totalSales = savedSalesData.reduce((sum, sale) => sum + sale.amount, 0)
    const revenue = savedSalesData.reduce((sum, sale) => sum + sale.revenue, 0)
    
    const totalValue = products.reduce((sum, p) => sum + (p.precio * (p.stock || 1)), 0)
    const lowStock = products.filter(p => (p.stock || 0) < 5).length

    setStats({
      totalProducts: products.length,
      totalValue: totalValue,
      totalSales: savedSalesData.length,
      revenue: revenue,
      lowStock: lowStock
    })
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
      id: editingProduct ? editingProduct.id : Date.now(),
      nombre: newProduct.nombre,
      precio: parseFloat(newProduct.precio),
      imagen: newProduct.imagen,
      categoria: newProduct.categoria,
      descripcion: newProduct.descripcion,
      stock: parseInt(newProduct.stock) || 0
    }

    const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
    
    if (editingProduct) {
      const isDefaultProduct = defaultProducts.some(p => p.id === editingProduct.id)
      
      if (isDefaultProduct) {
        const existingIndex = adminProducts.findIndex(p => p.id === editingProduct.id)
        if (existingIndex >= 0) {
          adminProducts[existingIndex] = product
        } else {
          adminProducts.push(product)
        }
      } else {
        const updatedProducts = adminProducts.map(p => 
          p.id === editingProduct.id ? product : p
        )
        localStorage.setItem('adminProducts', JSON.stringify(updatedProducts))
      }
      setMessage({ text: 'Producto actualizado correctamente', type: 'success' })
    } else {
      adminProducts.push(product)
      localStorage.setItem('adminProducts', JSON.stringify(adminProducts))
      setMessage({ text: 'Producto agregado correctamente', type: 'success' })
    }

    localStorage.setItem('adminProducts', JSON.stringify(adminProducts))
    setNewProduct({ nombre: '', precio: '', imagen: '', categoria: '', descripcion: '', stock: '' })
    setEditingProduct(null)
    setShowModal(false)
    loadProducts()
    loadStats()

    setTimeout(() => setMessage({ text: '', type: '' }), 3000)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setNewProduct({
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      categoria: product.categoria,
      descripcion: product.descripcion || '',
      stock: product.stock || ''
    })
    setShowModal(true)
  }

  const handleDeleteProduct = (productId) => {
    const isDefaultProduct = defaultProducts.some(p => p.id === productId)
    
    if (isDefaultProduct) {
      setMessage({ 
        text: 'No se pueden eliminar los productos por defecto del sistema', 
        type: 'warning' 
      })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
      return
    }

    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      const adminProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
      const updatedProducts = adminProducts.filter(p => p.id !== productId)
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts))
      loadProducts()
      loadStats()
      setMessage({ text: 'Producto eliminado correctamente', type: 'success' })
      setTimeout(() => setMessage({ text: '', type: '' }), 3000)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingProduct(null)
    setNewProduct({ nombre: '', precio: '', imagen: '', categoria: '', descripcion: '', stock: '' })
  }

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    navigate('/')
  }

  const generateSalesReport = () => {
    const report = {
      fecha: new Date().toLocaleDateString(),
      totalProductos: stats.totalProducts,
      valorInventario: stats.totalValue,
      ventasTotales: stats.totalSales,
      ingresos: stats.revenue,
      productos: products.map(p => ({
        nombre: p.nombre,
        precio: p.precio,
        categoria: p.categoria,
        stock: p.stock
      }))
    }
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reporte-ventas-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    
    setMessage({ text: 'Reporte descargado correctamente', type: 'success' })
    setTimeout(() => setMessage({ text: '', type: '' }), 3000)
  }

  // Función para renderizar gráfico simple
  const renderSimpleChart = () => {
    const categories = ['Poleras', 'Poleron', 'Pantalones', 'Accesorios']
    const salesByCategory = categories.map(cat => {
      const categoryProducts = products.filter(p => p.categoria === cat)
      return categoryProducts.reduce((sum, p) => sum + (p.precio * (p.stock || 0)), 0)
    })

    const maxValue = Math.max(...salesByCategory)
    
    return (
      <div className="chart-container">
        <h5 className="chart-title">Valor de Inventario por Categoría</h5>
        <div className="d-flex flex-column gap-3">
          {categories.map((category, index) => (
            <div key={category} className="d-flex align-items-center">
              <div className="me-3" style={{ width: '100px' }}>
                <small className="fw-bold">{category}</small>
              </div>
              <div className="flex-grow-1">
                <div 
                  className="bg-primary rounded-pill text-white text-end px-3"
                  style={{ 
                    width: `${(salesByCategory[index] / maxValue) * 100}%`,
                    height: '25px',
                    lineHeight: '25px',
                    minWidth: '40px'
                  }}
                >
                  ${salesByCategory[index].toLocaleString('es-CL')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderSalesChart = () => {
    const last7Days = [...Array(7)].map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - i)
      return date.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })
    }).reverse()

    const salesByDay = last7Days.map(day => {
      const daySales = salesData.filter(sale => {
        const saleDate = new Date(sale.date).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })
        return saleDate === day
      })
      return daySales.reduce((sum, sale) => sum + sale.revenue, 0)
    })

    const maxSales = Math.max(...salesByDay, 1)

    return (
      <div className="chart-container">
        <h5 className="chart-title">Ventas de los Últimos 7 Días</h5>
        <div className="d-flex align-items-end justify-content-between" style={{ height: '200px' }}>
          {last7Days.map((day, index) => (
            <div key={day} className="d-flex flex-column align-items-center" style={{ width: '14%' }}>
              <div 
                className="bg-success rounded-top w-100"
                style={{ 
                  height: `${(salesByDay[index] / maxSales) * 150}px`,
                  minHeight: '5px'
                }}
              ></div>
              <small className="mt-2 text-center">
                <div className="fw-bold">${salesByDay[index].toLocaleString('es-CL')}</div>
                <div>{day}</div>
              </small>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <Card className="admin-stats-card">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">
                <i className="fas fa-cog me-2"></i>
                Panel de Administración - KorteY2K
              </h2>
              <Button variant="outline-danger" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-2"></i>
                Cerrar Sesión
              </Button>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-0">
                Gestiona los productos, inventario y ventas de tu tienda de ropa Y2K
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

      <Tabs defaultActiveKey="stats" className="mb-4 admin-tabs">
        <Tab eventKey="stats" title={
          <span>
            <i className="fas fa-chart-bar me-2"></i>
            Estadísticas
          </span>
        }>
          <Row>
            <Col md={3} className="mb-3">
              <Card className="text-center border-0 shadow-sm admin-stats-card">
                <Card.Body>
                  <div className="text-primary mb-2">
                    <i className="fas fa-tshirt fa-2x"></i>
                  </div>
                  <h3 className="text-primary">{stats.totalProducts}</h3>
                  <p className="text-muted mb-0">Productos Totales</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} className="mb-3">
              <Card className="text-center border-0 shadow-sm admin-stats-card">
                <Card.Body>
                  <div className="text-success mb-2">
                    <i className="fas fa-dollar-sign fa-2x"></i>
                  </div>
                  <h3 className="text-success">${stats.totalValue.toLocaleString('es-CL')}</h3>
                  <p className="text-muted mb-0">Valor Inventario</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} className="mb-3">
              <Card className="text-center border-0 shadow-sm admin-stats-card">
                <Card.Body>
                  <div className="text-warning mb-2">
                    <i className="fas fa-shopping-cart fa-2x"></i>
                  </div>
                  <h3 className="text-warning">{stats.totalSales}</h3>
                  <p className="text-muted mb-0">Ventas Totales</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} className="mb-3">
              <Card className="text-center border-0 shadow-sm admin-stats-card">
                <Card.Body>
                  <div className="text-danger mb-2">
                    <i className="fas fa-exclamation-triangle fa-2x"></i>
                  </div>
                  <h3 className="text-danger">{stats.lowStock}</h3>
                  <p className="text-muted mb-0">Stock Bajo</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={6}>
              {renderSimpleChart()}
            </Col>
            <Col md={6}>
              {renderSalesChart()}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <Card className="admin-stats-card">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Resumen de Ventas</h5>
                  <Button variant="outline-primary" size="sm" onClick={generateSalesReport}>
                    <i className="fas fa-download me-2"></i>
                    Descargar Reporte
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <h6>Ingresos Totales</h6>
                      <h3 className="text-success">${stats.revenue.toLocaleString('es-CL')}</h3>
                    </Col>
                    <Col md={6}>
                      <h6>Productos con Stock Bajo</h6>
                      <div>
                        {products.filter(p => (p.stock || 0) < 5).map(product => (
                          <Badge key={product.id} bg="danger" className="me-2 mb-2">
                            {product.nombre} ({product.stock})
                          </Badge>
                        ))}
                        {products.filter(p => (p.stock || 0) < 5).length === 0 && (
                          <span className="text-success">Todo el stock está en niveles óptimos</span>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="products" title={
          <span>
            <i className="fas fa-boxes me-2"></i>
            Gestión de Productos
          </span>
        }>
          <Row className="mb-4">
            <Col>
              <Card className="admin-stats-card">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Lista de Productos</h5>
                  <Button variant="primary" onClick={() => setShowModal(true)}>
                    <i className="fas fa-plus me-2"></i>
                    Agregar Producto
                  </Button>
                </Card.Header>
                <Card.Body>
                  {products.length === 0 ? (
                    <p className="text-muted text-center py-4">No hay productos en la tienda</p>
                  ) : (
                    <div className="table-responsive">
                      <Table hover className="admin-table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Categoría</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(product => {
                            const isDefaultProduct = defaultProducts.some(p => p.id === product.id)
                            return (
                              <tr key={product.id}>
                                <td>
                                  <img 
                                    src={product.imagen} 
                                    alt={product.nombre}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                                    onError={(e) => {
                                      e.target.src = 'https://via.placeholder.com/50x50?text=Imagen'
                                    }}
                                  />
                                </td>
                                <td>
                                  <strong>{product.nombre}</strong>
                                  {isDefaultProduct && (
                                    <Badge bg="secondary" className="ms-2" style={{ fontSize: '0.6rem' }}>
                                      Default
                                    </Badge>
                                  )}
                                  {product.descripcion && (
                                    <div>
                                      <small className="text-muted d-block mt-1">{product.descripcion}</small>
                                    </div>
                                  )}
                                </td>
                                <td>${product.precio.toLocaleString('es-CL')}</td>
                                <td>
                                  <Badge bg="primary">{product.categoria}</Badge>
                                </td>
                                <td>
                                  <Badge bg={(product.stock || 0) < 5 ? "danger" : "success"}>
                                    {product.stock || 0}
                                  </Badge>
                                </td>
                                <td>
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="me-2 btn-action btn-edit"
                                    onClick={() => handleEditProduct(product)}
                                  >
                                    <i className="fas fa-edit"></i>
                                  </Button>
                                  {!isDefaultProduct && (
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      className="btn-action btn-delete"
                                      onClick={() => handleDeleteProduct(product.id)}
                                    >
                                      <i className="fas fa-trash"></i>
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>

      {/* Modal para agregar/editar producto */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" className="admin-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-box me-2"></i>
            {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddProduct}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Producto *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={newProduct.nombre}
                    onChange={handleInputChange}
                    required
                    placeholder="Ej: Polera Oversize Negra"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
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
                    placeholder="Ej: 3500"
                  />
                </Form.Group>
              </Col>
            </Row>

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

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría *</Form.Label>
                  <Form.Select
                    name="categoria"
                    value={newProduct.categoria}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="Poleras">👚 Poleras</option>
                    <option value="Poleron">🧥 Poleron</option>
                    <option value="Pantalones">👖 Pantalones</option>
                    <option value="Accesorios">🧢 Accesorios</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="Cantidad en stock"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={newProduct.descripcion}
                onChange={handleInputChange}
                placeholder="Describe el producto..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              <i className="fas fa-save me-2"></i>
              {editingProduct ? 'Actualizar Producto' : 'Guardar Producto'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}