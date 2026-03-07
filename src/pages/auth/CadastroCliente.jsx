import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function CadastroCliente() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (form.password !== form.confirm) {
      setError('As senhas não coincidem.')
      return
    }

    const fakeUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      role: 'client',
      avatar: 'https://i.pravatar.cc/150?img=20',
    }

    login(fakeUser.email, form.password, fakeUser)
    navigate('/cliente')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">Conecta</div>
        <p className="auth-subtitle">Criar conta — Cliente</p>
        <p className="auth-desc">Encontre profissionais de confiança perto de você.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <label>Nome completo</label>
            <input
              type="text"
              name="name"
              placeholder="Seu nome"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Confirmar senha</label>
            <input
              type="password"
              name="confirm"
              placeholder="Repita a senha"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn-primary">
            Criar conta
          </button>
        </form>

        <p className="auth-back">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
        <p className="auth-back">
          Quer oferecer serviços?{' '}
          <Link to="/cadastro/prestador">Cadastre-se como prestador</Link>
        </p>
      </div>
    </div>
  )
}