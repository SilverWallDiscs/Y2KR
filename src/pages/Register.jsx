import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'

export default function Register() {
    const { register, login } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ nombre: '', apellido: '', username: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({}) // Nuevo estado para errores de campos

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const validateForm = () => {
        const errors = {}
        const nameRegex = /^[a-zA-Z\s]+$/ // Solo letras y espacios para nombre y apellido
        if (!form.nombre || form.nombre.length < 2 || form.nombre.length > 50 || !nameRegex.test(form.nombre)) {
            errors.nombre = 'El nombre debe tener entre 2 y 50 caracteres y solo letras.'
        }
        if (!form.apellido || form.apellido.length < 2 || form.apellido.length > 50 || !nameRegex.test(form.apellido)) {
            errors.apellido = 'El apellido debe tener entre 2 y 50 caracteres y solo letras.'
        }
        if (!form.username || form.username.length < 3 || form.username.length > 20) {
            errors.username = 'El usuario debe tener entre 3 y 20 caracteres.'
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!form.password || !passwordRegex.test(form.password)) {
            errors.password = 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúscula, minúscula, número y símbolo.'
        }
        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!validateForm()) return // Validar antes de proceder
        setLoading(true)
        try {
            await register(form)
            await login({ username: form.username, password: form.password })
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="p-3">
                        <Card.Body>
                            <Card.Title className="mb-3">Crear cuenta</Card.Title>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control name="nombre" value={form.nombre} onChange={onChange} required />
                                    {fieldErrors.nombre && <small className="text-danger">{fieldErrors.nombre}</small>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control name="apellido" value={form.apellido} onChange={onChange} required />
                                    {fieldErrors.apellido && <small className="text-danger">{fieldErrors.apellido}</small>}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control name="username" value={form.username} onChange={onChange} required />
                                    {fieldErrors.username && <small className="text-danger">{fieldErrors.username}</small>}
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={form.password} onChange={onChange} required />
                                    {fieldErrors.password && <small className="text-danger">{fieldErrors.password}</small>}
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button type="submit" disabled={loading}>{loading ? 'Creando…' : 'Crear cuenta'}</Button>
                                </div>
                            </Form>
                            <hr />
                            <p className="mb-0">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}