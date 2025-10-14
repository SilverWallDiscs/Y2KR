import React, { useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(10)

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 10000)

    const countdown = setInterval(() => {
      setSeconds(prev => prev - 1)
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(countdown)
    }
  }, [navigate])

  return (
    <Container className="text-center py-5">
      <div className="error-container">
        <div className="error-code display-1 fw-bold text-primary mb-3">404</div>
        <h1 className="error-title h2 mb-3">Página no encontrada</h1>
        <p className="error-message lead mb-4">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="error-actions d-flex gap-3 justify-content-center flex-wrap">
          <Button variant="primary" onClick={() => navigate('/')}>
            Volver al Inicio
          </Button>
          <Button variant="secondary" onClick={() => navigate('/tienda')}>
            Ir a la Tienda
          </Button>
        </div>
        <p className="text-muted mt-3">
          Redirigiendo a la página principal en {seconds} segundos...
        </p>
      </div>
    </Container>
  )
}