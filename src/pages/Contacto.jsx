import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'

export default function Contacto() {
  const [formData, setFormData] = useState({ 
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })
  const [message, setMessage] = useState({ text: '', type: '' }) // estado para mensaje de exito o error

  const handleChange = (e) => { // funcion para manejar cambios en los inputs
    setFormData({
      ...formData,
      [e.target.name]: e.target.value // actualizo campo segun nombre
    })
  }

  const handleSubmit = (e) => { // funcion para enviar formulario
    e.preventDefault() // evito recargar pagina

    if (!formData.nombre || !formData.email || !formData.asunto || !formData.mensaje) { // verifico campos vacios
      setMessage({ text: 'por favor completa todos los campos', type: 'error' }) // mensaje error
      return
    }

    if (!isValidEmail(formData.email)) { // valido formato email
      setMessage({ text: 'por favor ingresa un email valido', type: 'error' }) // mensaje error email
      return
    }

    setMessage({ text: 'enviando mensaje...', type: 'success' }) // mensaje envio

    setTimeout(() => { // simulo envio
      setMessage({ text: 'mensaje enviado con exito te contactaremos pronto', type: 'success' }) // mensaje exito
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' }) // limpio formulario
    }, 2000)
  }

  const isValidEmail = (email) => { // funcion para validar email con regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    return re.test(email)
  }

  return (
    <Container className="main-contacto">
      <div className="contacto-header text-center mb-5">
        <h1>contáctanos</h1> 
        <p className="lead">tienes alguna pregunta comentario o inquietud nos encantaria escucharte</p>
      </div>

      <Row>
        <Col md={6} className="mb-4">
          <Card className="form-contacto h-100">
            <Card.Body>
              <Card.Title className="mb-4">
                <i className="fas fa-envelope me-2"></i>
                enviamos un mensaje
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3"> 
                  <Form.Label> 
                    <i className="fas fa-user me-2"></i>
                    nombre completo
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre} // valor input nombre
                    onChange={handleChange} // onchange
                    placeholder="tu nombre completo"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="fas fa-envelope me-2"></i>
                    correo electronico
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email} // valor input email
                    onChange={handleChange} // onchange
                    placeholder="tu@email.com"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="fas fa-tag me-2"></i>
                    asunto
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="asunto"
                    value={formData.asunto} // valor input asunto
                    onChange={handleChange} // onchange
                    placeholder="asunto de tu mensaje"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>
                    <i className="fas fa-comment me-2"></i>
                    mensaje
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="mensaje"
                    value={formData.mensaje} // valor text mensaje
                    onChange={handleChange} // onchange
                    placeholder="escribe tu mensaje aqui"
                    required
                  />
                </Form.Group>

                <Button type="submit" className="btn-enviar w-100">
                  <i className="fas fa-paper-plane me-2"></i>
                  enviar mensaje
                </Button>

                {message.text && ( // muestro mensaje si existe
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
                informacion de contacto
              </Card.Title>

              <div className="contacto-item mb-3">
                <div className="contacto-icono me-3">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h5>direccion</h5>
                  <p className="mb-0">alvarez 2336 2571188 vina del mar valparaiso</p>
                </div>
              </div>

              <div className="contacto-item mb-3">
                <div className="contacto-icono me-3">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h5>email</h5>
                  <a href="mailto:soporte@kortey2k.com" className="text-white">soporte@kortey2k.com</a>
                </div>
              </div>

              <div className="contacto-item mb-3">
                <div className="contacto-icono me-3">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h5>telefono</h5>
                  <a href="tel:+541123456789" className="text-white">+54 11 2345 6789</a>
                </div>
              </div>

              <div className="contacto-item mb-4">
                <div className="contacto-icono me-3">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h5>horario de atencion</h5>
                  <p className="mb-0">
                    lunes a viernes 9 00 - 18 00
                    sabados 10 00 - 14 00
                  </p>
                </div>
              </div>

              <div className="redes-sociales">
                <h5 className="mb-3">siguenos en redes sociales</h5>
                <div className="social-icons d-flex gap-3">
                  <a href="#" className="text-white" aria-label="instagram">
                    <i className="fab fa-instagram fa-lg"></i>
                  </a>
                  <a href="#" className="text-white" aria-label="facebook">
                    <i className="fab fa-facebook-f fa-lg"></i>
                  </a>
                  <a href="#" className="text-white" aria-label="twitter">
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                  <a href="#" className="text-white" aria-label="tiktok">
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
            nuestra ubicacion
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
            title="nuestra ubicacion en google maps"
          ></iframe>
        </Card.Body>
      </Card>
    </Container>
  )
}
