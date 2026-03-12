import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import NavbarCliente from '../../components/NavbarCliente'
import db from '../../data/db.js'

export default function ClienteHome() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todos')

  const prestadores = db.users.filter(u => u.role === 'provider')

  const filtrados = useMemo(() => {
    return prestadores.filter(p => {
      const buscaOk = p.name.toLowerCase().includes(busca.toLowerCase()) ||
                      p.category.toLowerCase().includes(busca.toLowerCase())
      const categoriaOk = categoria === 'Todos' || p.category === categoria
      return buscaOk && categoriaOk
    })
  }, [busca, categoria])

  return (
    <div>
      <NavbarCliente />

      <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Encontre um profissional</h1>
        <br />

        <input
          type="text"
          placeholder="Buscar por nome ou serviço..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '14px', marginBottom: '16px' }}
        />

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <button
            onClick={() => setCategoria('Todos')}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid #4a7c59',
              background: categoria === 'Todos' ? '#4a7c59' : 'white',
              color: categoria === 'Todos' ? 'white' : '#4a7c59',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Todos
          </button>
          {db.categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoria(cat.label)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid #4a7c59',
                background: categoria === cat.label ? '#4a7c59' : 'white',
                color: categoria === cat.label ? 'white' : '#4a7c59',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {filtrados.length === 0 ? (
          <p>Nenhum profissional encontrado.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtrados.map(p => (
              <Link
                to={`/cliente/profissional/${p.id}`}
                key={p.id}
                style={{ display: 'flex', gap: '12px', padding: '12px', border: '1px solid #ccc', borderRadius: '8px', textDecoration: 'none', color: 'inherit', background: 'white' }}
              >
                <img src={p.avatar} alt={p.name} style={{ width: '56px', height: '56px', borderRadius: '50%' }} />
                <div>
                  <p><strong>{p.name}</strong></p>
                  <p>{p.category} — {p.city}</p>
                  <p>⭐ {p.rating} ({p.reviews} avaliações) — R$ {p.price}/dia</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}