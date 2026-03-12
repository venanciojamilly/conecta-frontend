import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavbarCliente from '../../components/NavbarCliente'
import { useAuth } from '../../context/AuthContext'
import db from '../../data/db.js'

export default function Avaliacao() {
  const { user } = useAuth()

  const prestadoresContratados = db.servicosContratados
    .filter(s => s.clientId === user.id)
    .map(s => db.users.find(u => u.id === s.providerId))

  const [avaliacoes, setAvaliacoes] = useState(db.reviews)
  const [hover, setHover] = useState({})
  const [forms, setForms] = useState({})
  const [avaliados, setAvaliados] = useState([])

  const handleEnviar = (providerId) => {
    const form = forms[providerId] || {}

    if (!form.rating) {
      alert('Selecione uma nota!')
      return
    }
    if (!form.comment?.trim()) {
      alert('Escreva um comentário!')
      return
    }

    const nova = {
      id: Date.now(),
      providerId,
      clientName: user.name,
      rating: form.rating,
      comment: form.comment,
      date: new Date().toLocaleDateString('pt-BR')
    }

    setAvaliacoes([...avaliacoes, nova])
    setAvaliados([...avaliados, providerId])
  }

  return (
    <div>
      <NavbarCliente />

      <div style={{ padding: '32px', maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1>Minhas avaliações</h1>

        {prestadoresContratados.length === 0 ? (
          <p style={{ color: '#999' }}>Você ainda não contratou nenhum profissional.</p>
        ) : (
          prestadoresContratados.map(p => {
            const jaAvaliou = avaliados.includes(p.id) || avaliacoes.some(a => a.providerId === p.id && a.clientName === user.name)
            const form = forms[p.id] || { rating: 0, comment: '' }

            return (
              <div key={p.id} style={{ background: 'white', border: '1px solid #ddd', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Info do prestador */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img src={p.avatar} alt={p.name} style={{ width: '52px', height: '52px', borderRadius: '50%' }} />
                  <div>
                    <p style={{ fontWeight: '700', margin: 0 }}>{p.name}</p>
                    <p style={{ color: '#4a7c59', fontSize: '13px', margin: 0 }}>{p.category}</p>
                  </div>
                  <Link to={`/cliente/profissional/${p.id}`} style={{ marginLeft: 'auto', fontSize: '13px', color: '#4a7c59', textDecoration: 'none', fontWeight: '600' }}>
                    Ver perfil →
                  </Link>
                </div>

                {/* Formulário ou confirmação */}
                {jaAvaliou ? (
                  <p style={{ color: '#4a7c59', fontWeight: '600', margin: 0 }}>✅ Você já avaliou este profissional.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <p style={{ fontWeight: '600', margin: 0 }}>Deixe sua avaliação</p>

                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <span
                          key={star}
                          onClick={() => setForms({ ...forms, [p.id]: { ...form, rating: star } })}
                          onMouseEnter={() => setHover({ ...hover, [p.id]: star })}
                          onMouseLeave={() => setHover({ ...hover, [p.id]: 0 })}
                          style={{ fontSize: '26px', cursor: 'pointer' }}
                        >
                          {star <= (hover[p.id] || form.rating) ? '⭐' : '☆'}
                        </span>
                      ))}
                    </div>

                    <textarea
                      placeholder="Conte como foi sua experiência..."
                      value={form.comment}
                      onChange={e => setForms({ ...forms, [p.id]: { ...form, comment: e.target.value } })}
                      rows={3}
                      style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', fontFamily: 'inherit', resize: 'none' }}
                    />

                    <button
                      onClick={() => handleEnviar(p.id)}
                      style={{ padding: '10px', background: '#4a7c59', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
                    >
                      Enviar avaliação
                    </button>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}