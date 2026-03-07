import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import db from '../../data/db'

export default function CadastroPrestador() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    category: '',
    city: '',
    description: '',
    price: '',
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

    if (!form.category) {
      setError('Selecione uma categoria.')
      return
    }

    // Simula cadastro — num backend real seria POST /users
    alert(`Cadastro de prestador simulado com sucesso!\nRedirecionando para o login.`)
    navigate('/login')
  }

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <div className="auth-logo">Conecta</div>
        <p className="auth-subtitle">Criar conta — Prestador</p>
        <p className="auth-desc">Monte seu perfil profissional e comece a receber clientes.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field-row">
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
              <label>Cidade</label>
              <input
                type="text"
                name="city"
                placeholder="Ex: Campina Grande"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
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

          <div className="field-row">
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
          </div>

          <div className="field-row">
            <div className="field">
              <label>Categoria de serviço</label>
              <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Selecione...</option>
                {db.categories.map(cat => (
                  <option key={cat.id} value={cat.label}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Preço base (R$/diária)</label>
              <input
                type="number"
                name="price"
                placeholder="Ex: 120"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label>Descrição dos seus serviços</label>
            <textarea
              name="description"
              placeholder="Conte um pouco sobre sua experiência e o que você oferece..."
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn-primary">
            Criar perfil profissional
          </button>
        </form>

        <p className="auth-back">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  )
}