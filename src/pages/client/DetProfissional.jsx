import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import NavbarCliente from '../../components/NavbarCliente'
import { useAuth } from '../../context/AuthContext'
import db from '../../data/db.js'

export default function DetalhesProfissional() {
  const { id } = useParams()
  const { user } = useAuth()
  const profissional = db.users.find(u => u.id === Number(id))

  const [modalAberto, setModalAberto] = useState(false)

  if (!profissional) {
    return (
      <div>
        <NavbarCliente />
        <div style={{ padding: '32px' }}>
          <p>Profissional não encontrado.</p>
          <Link to="/cliente">← Voltar</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <NavbarCliente />

      <div style={{ padding: '32px', maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        <Link to="/cliente" style={{ color: '#4a7c59', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>← Voltar</Link>

        {/* Card de perfil */}
        <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '12px', padding: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <img src={profissional.avatar} alt={profissional.name} style={{ width: '90px', height: '90px', borderRadius: '50%', flexShrink: 0 }} />
          <div style={{display: 'flex',flexWrap: 'wrap',gap: '20px',alignItems: 'center'}}
          >
            <h2 style={{ margin: 0 }}>{profissional.name}</h2>
            <p style={{ color: '#4a7c59', fontWeight: '600', margin: 0 }}>{profissional.category}</p>
            <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>📍 {profissional.city}</p>
            <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>⭐ {profissional.rating} ({profissional.reviews} avaliações)</p>
            <p style={{ fontWeight: '700', color: '#2d4f38', margin: 0 }}>R$ {profissional.price} / diária</p>
          </div>
        </div>

        {/* Sobre */}
        <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginBottom: '10px' }}>Sobre</h3>
          <p style={{ color: '#555', lineHeight: '1.6', margin: 0 }}>{profissional.description}</p>
        </div>

        {/* Portfólio */}
        <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginBottom: '16px' }}>Portfólio</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {profissional.portfolio.map((foto, i) => (
              <img key={i} src={foto} alt={`Trabalho ${i + 1}`} style={{ width: '180px', height: '130px', objectFit: 'cover', borderRadius: '8px' }} />
            ))}
          </div>
        </div>

        {/* Contato */}
        <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ marginBottom: '10px' }}>Contato</h3>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>Entre em contato com o profissional para combinar os detalhes do serviço.</p>
          <button
            onClick={() => setModalAberto(true)}
            style={{ padding: '10px 24px', background: '#4a7c59', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
          >
            📲 Entrar em contato
          </button>
        </div>

      </div>

      {/* Modal */}
      {modalAberto && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '32px', maxWidth: '360px', width: '90%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0 }}>Contato</h3>
            <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Entre em contato com <strong>{profissional.name}</strong> pelo telefone:</p>
            <p style={{ fontSize: '22px', fontWeight: '800', color: '#2d4f38', textAlign: 'center' }}>
              📱 (83) 99999-9999
            </p>
            <button
              onClick={() => setModalAberto(false)}
              style={{ padding: '10px', background: '#4a7c59', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

    </div>
  )
}