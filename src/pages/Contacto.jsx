import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })
  const [message, setMessage] = useState({ text: '', type: '' })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.nombre || !formData.email || !formData.asunto || !formData.mensaje) {
      setMessage({ text: 'Por favor, completa todos los campos', type: 'error' })
      return
    }

    if (!isValidEmail(formData.email)) {
      setMessage({ text: 'Por favor, ingresa un email válido', type: 'error' })
      return
    }

    setMessage({ text: 'Enviando mensaje...', type: 'success' })

    setTimeout(() => {
      setMessage({ text: '¡Mensaje enviado con éxito! Te contactaremos pronto.', type: 'success' })
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' })
    }, 2000)
  }

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  return (
    <Container className="main-contacto">
      <div className="contacto-header text-center mb-5">
        <h1>Contáctanos</h1>
        <p className="lead">¿Tienes alguna pregunta, comentario o inquietud? Nos encantaría escucharte.</p>
      </div>

      <Row>
        <Col md={6} className="mb-4">
          <Card className="form-contacto h-100">
            <Card.Body>
              <Card.Title className="mb-4">
                <i className="fas fa-envelope me-2"></i>
                Envíanos un mensaje
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="fas fa-user me-2"></i>
                    Nombre completo
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="fas fa-envelope me-2"></i>
                    Correo electrónico
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="fas fa-tag me-2"></i>
                    Asunto
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    placeholder="Asunto de tu mensaje"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    <i className="fas fa-comment me-2"></i>
                    Mensaje
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  />
                </Form.Group>

                <Button type="submit" className="btn-enviar w-100">
                  <i className="fas fa-paper-plane me-2"></i>
                  Enviar mensaje
                </Button>

                {message.text && (
                  <Alert variant={message.type === 'success' ? 'success' : 'danger'} className="mt-3">
                    {message.text}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="info-contacto text-white h-100">
            <Card.Body>
              <Card.Title className="mb-4">
                <i className="fas fa-info-circle me-2"></i>
                Información de contacto
              </Card.Title>

              <div className="contacto-item mb-3">
                <div className="contacto-icono me-3">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h5>Dirección</h5>
                  <p className="mb-0">Álvarez 2336, 2571188 Viña del Mar, Valparaíso</p>
                </div>
              </div>

              <div className="contacto-item mb-3">
                <div className="contacto-icono me-3">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h5>Email</h5>
                  <a href="mailto:soporte@kortey2k.com" className="text-white">soporte@kortey2k.com</a>
                </div>
              </div>

              <div className="contacto-item mb-3">
                <div className="contacto-icono me-3">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h5>Teléfono</h5>
                  <a href="tel:+541123456789" className="text-white">+54 11 2345 6789</a>
                </div>
              </div>

              <div className="contacto-item mb-4">
                <div className="contacto-icono me-3">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h5>Horario de atención</h5>
                  <p className="mb-0">
                    Lunes a Viernes: 9:00 - 18:00<br />
                    Sábados: 10:00 - 14:00
                  </p>
                </div>
              </div>

              <div className="redes-sociales">
                <h5 className="mb-3">Síguenos en redes sociales</h5>
                <div className="social-icons d-flex gap-3">
                  <a href="#" className="text-white" aria-label="Instagram">
                    <i className="fab fa-instagram fa-lg"></i>
                  </a>
                  <a href="#" className="text-white" aria-label="Facebook">
                    <i className="fab fa-facebook-f fa-lg"></i>
                  </a>
                  <a href="#" className="text-white" aria-label="Twitter">
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                  <a href="#" className="text-white" aria-label="TikTok">
                    <i className="fab fa-tiktok fa-lg"></i>
                  </a>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <Card.Header>
          <h4 className="mb-0">
            <i className="fas fa-map-marked-alt me-2"></i>
            Nuestra ubicación
          </h4>
        </Card.Header>
        <Card.Body className="p-0">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.258907600635!2d-71.5331841!3d-33.0336892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689de64d74fd4af%3A0x8004f381e9055a38!2sDuoc%20UC%20Vi%C3%B1a%20Del%20Mar!5e0!3m2!1ses!2scl!4v1726832325528!5m2!1ses!2sc"
            width="100%" 
            height="400" 
            style={{border: 0}} 
            allowFullScreen 
            loading="lazy"
            title="Nuestra ubicación en Google Maps"
          ></iframe>
        </Card.Body>
      </Card>
    </Container>
  )
}