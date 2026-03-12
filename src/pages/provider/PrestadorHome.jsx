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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSalvar = (e) => {
    e.preventDefault()
    updateUser({ ...form, price: Number(form.price), portfolio })
    setSalvou(true)
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
    const novoPortfolio = portfolio.filter((_, i) => i !== index)
    setPortfolio(novoPortfolio)
    updateUser({ portfolio: novoPortfolio })
    setPortfolioMsg('Foto removida do portfólio.')
    setTimeout(() => setPortfolioMsg(''), 3000)
  }

  return (
    <div>
      <NavbarPrestador />

      <div style={{ padding: '32px 24px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '16px' }}>Meu Perfil Profissional</h2>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px', padding: '12px', border: '1px solid #ccc', borderRadius: '8px', background: 'white' }}>
          <img src={user.avatar} alt={user.name} style={{ width: '56px', height: '56px', borderRadius: '50%' }} />
          <div>
            <p><strong>{form.name}</strong></p>
            <p>{db.categories.find(c => c.label === form.category)?.icon} {form.category} — {form.city}</p>
            <p>⭐ {user.rating || '—'} ({user.reviews || 0} avaliações) — R$ {form.price}/diária</p>
          </div>
        </div>

        <h3 style={{ marginBottom: '12px' }}>Editar informações</h3>
        {salvou && <p style={{ color: 'green', marginBottom: '8px' }}>Perfil atualizado com sucesso!</p>}

        <form onSubmit={handleSalvar}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nome completo"
              required
              style={{ flex: 1, padding: '10px', fontSize: '14px' }}
            />
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Cidade"
              required
              style={{ flex: 1, padding: '10px', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              style={{ flex: 1, padding: '10px', fontSize: '14px' }}
            >
              <option value="">Selecione categoria...</option>
              {db.categories.map(cat => (
                <option key={cat.id} value={cat.label}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Preço (R$/diária)"
              required
              style={{ flex: 1, padding: '10px', fontSize: '14px' }}
            />
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descrição dos seus serviços..."
            rows={4}
            required
            style={{ width: '100%', padding: '10px', fontSize: '14px', marginBottom: '12px' }}
          />

          <button type="submit" style={{ padding: '6px 14px', cursor: 'pointer', background: '#4a7c59', color: 'white', border: '1px solid #ccc', borderRadius: '6px' }}>
            Salvar alterações
          </button>
        </form>

        <hr style={{ margin: '24px 0' }} />

        <h3 style={{ marginBottom: '8px' }}>Portfólio ({portfolio.length} fotos)</h3>
        {portfolioMsg && <p style={{ color: 'green', marginBottom: '8px' }}>{portfolioMsg}</p>}
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Adicione fotos de trabalhos anteriores para atrair mais clientes.</p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {portfolio.map((foto, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <img src={foto} alt={`Trabalho ${i + 1}`} style={{ width: '160px', height: '120px', objectFit: 'cover' }} />
              <button
                onClick={() => handleRemoverFoto(i)}
                style={{ position: 'absolute', top: '4px', right: '4px', fontSize: '12px', padding: '2px 6px', cursor: 'pointer', background: 'white', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button onClick={handleAdicionarFoto} style={{ padding: '6px 14px', cursor: 'pointer' }}>
          + Adicionar foto
        </button>

        <hr style={{ margin: '24px 0' }} />

        <h3 style={{ marginBottom: '8px' }}>Pré-visualização do perfil</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>É assim que os clientes verão seu perfil.</p>

        <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px', background: 'white' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <img src={user.avatar} alt={form.name} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
            <div>
              <h2>{form.name}</h2>
              <p>{form.category}</p>
              <p>📍 {form.city}</p>
              <p>⭐ {user.rating || '—'} ({user.reviews || 0} avaliações)</p>
              <p><strong>R$ {form.price} / diária</strong></p>
            </div>
          </div>

          <hr style={{ margin: '16px 0' }} />

          <h3>Sobre</h3>
          <p>{form.description || 'Nenhuma descrição adicionada.'}</p>

          <hr style={{ margin: '16px 0' }} />

          <h3>Portfólio</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {portfolio.map((foto, i) => (
              <img key={i} src={foto} alt={`Trabalho ${i + 1}`} style={{ width: '160px', height: '120px', objectFit: 'cover' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
