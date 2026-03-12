import { useState } from 'react'
import NavbarPrestador from '../../components/NavbarPrestador'
import { useAuth } from '../../context/AuthContext'
import db from '../../data/db'

export default function PrestadorHome() {
  const { user, updateUser } = useAuth()

  const [form, setForm] = useState({
    name: user.name || '',
    category: user.category || '',
    city: user.city || '',
    description: user.description || '',
    price: user.price || '',
  })

  const [portfolio, setPortfolio] = useState(user.portfolio || [])
  const [salvou, setSalvou] = useState(false)
  const [portfolioMsg, setPortfolioMsg] = useState('')
  const [editando, setEditando] = useState(false)
  const [fotoRemovida, setFotoRemovida] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (!editando) setEditando(true)
  }

  const handleSalvar = (e) => {
    e.preventDefault()
    updateUser({ ...form, price: Number(form.price), portfolio })
    setSalvou(true)
    setEditando(false)
    setTimeout(() => setSalvou(false), 3000)
  }

  const handleAdicionarFoto = () => {
    const seed = `user${Date.now()}`
    const novaFoto = `https://picsum.photos/seed/${seed}/400/300`
    const novoPortfolio = [...portfolio, novaFoto]
    setPortfolio(novoPortfolio)
    updateUser({ portfolio: novoPortfolio })
    setPortfolioMsg('Foto adicionada ao portfólio!')
    setTimeout(() => setPortfolioMsg(''), 3000)
  }

  const handleRemoverFoto = (index) => {
    setFotoRemovida(index)
    setTimeout(() => {
      const novoPortfolio = portfolio.filter((_, i) => i !== index)
      setPortfolio(novoPortfolio)
      updateUser({ portfolio: novoPortfolio })
      setFotoRemovida(null)
      setPortfolioMsg('Foto removida do portfólio.')
      setTimeout(() => setPortfolioMsg(''), 3000)
    }, 300)
  }

  const handleFileClick = () => {
    handleAdicionarFoto()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f1' }}>
      <NavbarPrestador />

      <div className="prestador-container">
        <h1 className="page-title">Meu Perfil Profissional</h1>

        <div className="prestador-resumo-card">
          <img
            src={user.avatar}
            alt={user.name}
            className="prestador-resumo-avatar"
          />
          <div className="prestador-resumo-info">
            <h2 className="prestador-resumo-nome">{form.name || user.name}</h2>
            <span className="prestador-resumo-categoria">
              {db.categories.find(c => c.label === form.category)?.icon} {form.category}
            </span>
            <span className="prestador-resumo-local">📍 {form.city}</span>
            <div className="prestador-resumo-stats">
              <span>⭐ {user.rating || '—'}</span>
              <span className="prestador-resumo-sep">·</span>
              <span>{user.reviews || 0} avaliações</span>
              <span className="prestador-resumo-sep">·</span>
              <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                R$ {form.price}/diária
              </span>
            </div>
          </div>
        </div>

        <div className="prestador-section-card">
          <div className="prestador-section-header">
            <h3 className="prestador-section-titulo">Editar informações</h3>
            {salvou && (
              <span className="prestador-sucesso">Perfil atualizado com sucesso!</span>
            )}
          </div>

          <form onSubmit={handleSalvar} className="auth-form">
            <div className="field-row">
              <div className="field">
                <label>Nome completo</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div className="field">
                <label>Cidade</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Ex: Campina Grande"
                  required
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Categoria de serviço</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
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
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Ex: 120"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Descrição dos seus serviços</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Conte sobre sua experiência e o que você oferece..."
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ alignSelf: 'flex-start', padding: '12px 32px' }}
            >
              Salvar alterações
            </button>
          </form>
        </div>

        <div className="prestador-section-card">
          <div className="prestador-section-header">
            <h3 className="prestador-section-titulo">
              Portfólio ({portfolio.length} {portfolio.length === 1 ? 'foto' : 'fotos'})
            </h3>
            {portfolioMsg && (
              <span className="prestador-sucesso">{portfolioMsg}</span>
            )}
          </div>

          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
            Adicione fotos de trabalhos anteriores para atrair mais clientes.
          </p>

          <div className="prestador-portfolio-grid">
            {portfolio.map((foto, i) => (
              <div
                key={i}
                className="prestador-portfolio-item"
                style={{
                  opacity: fotoRemovida === i ? 0 : 1,
                  transform: fotoRemovida === i ? 'scale(0.8)' : 'scale(1)',
                }}
              >
                <img src={foto} alt={`Trabalho ${i + 1}`} className="prestador-portfolio-foto" />
                <button
                  onClick={() => handleRemoverFoto(i)}
                  className="prestador-portfolio-remover"
                  title="Remover foto"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              onClick={handleFileClick}
              className="prestador-portfolio-adicionar"
            >
              <span style={{ fontSize: '28px', lineHeight: 1 }}>+</span>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Adicionar foto</span>
            </button>
          </div>
        </div>

        <div className="prestador-section-card">
          <h3 className="prestador-section-titulo" style={{ marginBottom: '16px' }}>
            Pré-visualização do perfil
          </h3>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>
            É assim que os clientes verão seu perfil na plataforma.
          </p>

          <div className="prestador-preview">
            <div className="perfil-card">
              <img src={user.avatar} alt={form.name} className="perfil-avatar" />
              <div className="perfil-info">
                <h2 className="perfil-nome">{form.name}</h2>
                <span className="profissional-categoria">
                  {db.categories.find(c => c.label === form.category)?.icon} {form.category}
                </span>
                <span className="profissional-cidade">📍 {form.city}</span>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>
                  ⭐ {user.rating || '—'} ({user.reviews || 0} avaliações)
                </span>
                <span className="perfil-preco">R$ {form.price} / diária</span>
              </div>
            </div>

            <div className="perfil-secao">
              <h4 className="perfil-secao-titulo">Sobre</h4>
              <p className="perfil-descricao">
                {form.description || 'Nenhuma descrição adicionada.'}
              </p>
            </div>

            {portfolio.length > 0 && (
              <div className="perfil-secao">
                <h4 className="perfil-secao-titulo">Portfólio</h4>
                <div className="portfolio-grid">
                  {portfolio.map((foto, i) => (
                    <img
                      key={i}
                      src={foto}
                      alt={`Trabalho ${i + 1}`}
                      className="portfolio-foto"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
