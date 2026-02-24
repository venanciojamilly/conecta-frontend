import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(form.email, form.password)

    if (!result.success) {
      setError('E-mail ou senha incorretos.')
      return
    }

    // Redireciona de acordo com o role
    if (result.role === 'client') navigate('/cliente')
    if (result.role === 'provider') navigate('/prestador')
    if (result.role === 'admin') navigate('/admin')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">Conecta</div>
        <p className="auth-subtitle">Entre na sua conta</p>

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn-primary">
            Entrar
          </button>
        </form>

        <div className="auth-divider">Não tem conta?</div>

        <div className="auth-register-options">
          <Link to="/cadastro/cliente" className="btn-outline">
            Preciso de um serviço
          </Link>
          <Link to="/cadastro/prestador" className="btn-outline">
            Quero oferecer um serviço
          </Link>
        </div>

        {/* Dica visual com os logins de teste */}
        <div className="auth-hint">
          <p>🧪 Contas de teste:</p>
          <code>joao@email.com / 123456 → Cliente</code>
          <code>maria@email.com / 123456 → Prestador</code>
          <code>admin@conecta.com / admin123 → Admin</code>
        </div>
      </div>
    </div>
  )
}