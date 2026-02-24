import { Link } from 'react-router-dom'
import NavbarPublica from '../components/NavbarPublica'
import db from '../data/db.js'

export default function Landing() {
  const prestadores = db.users.filter((u) => u.role === 'provider')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavbarPublica />

      <div style={{ flex: 1 }}>
        <div className="hero">
          <h1 className="hero-title">
            Conecte-se com profissionais de confiança
          </h1>
          <p className="hero-desc">
            Encontre eletricistas, faxineiras, encanadores e muito mais na sua região.
          </p>
          <div className="hero-cta">
            <Link to="/cadastro/cliente" className="btn-primary hero-btn">
              Preciso de um serviço
            </Link>
            <Link to="/cadastro/prestador" className="btn-outline hero-btn">
              Quero oferecer serviços
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 48px' }}>
          <h2 style={{ marginBottom: '16px' }}>Profissionais disponíveis</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {prestadores.map((p) => (
              <div key={p.id} style={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '16px', textAlign: 'center' }}>
                <img src={p.avatar} alt={p.name} style={{ width: '64px', height: '64px', borderRadius: '50%', marginBottom: '8px' }} />
                <p><strong>{p.name}</strong></p>
                <p style={{ fontSize: '13px', color: '#4a7c59', fontWeight: '600' }}>{p.category}</p>
                <p style={{ fontSize: '12px', color: '#666', margin: '4px 0' }}>📍 {p.city}</p>
                <p style={{ fontSize: '12px', color: '#666' }}>⭐ {p.rating} · R$ {p.price}/dia</p>
                <Link to="/login" style={{ display: 'block', marginTop: '12px', padding: '8px', background: '#4a7c59', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '13px' }}>
                  Ver perfil
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ background: '#2d4f38', color: 'white', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Conecta</p>
        <p style={{ fontSize: '13px', color: '#a8c5b0', marginBottom: '16px' }}>
          Conectando pessoas a profissionais de confiança
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px' }}>
          <Link to="/login" style={{ color: '#a8c5b0', fontSize: '13px' }}>Entrar</Link>
          <Link to="/cadastro/cliente" style={{ color: '#a8c5b0', fontSize: '13px' }}>Sou cliente</Link>
          <Link to="/cadastro/prestador" style={{ color: '#a8c5b0', fontSize: '13px' }}>Sou prestador</Link>
        </div>
        <p style={{ fontSize: '12px', color: '#6b9478' }}>© 2026 Conecta · Todos os direitos reservados</p>
      </footer>
    </div>
  )
}