import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavbarCliente() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={{ background: 'white', borderBottom: '1px solid #dde8e1', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <span style={{ fontSize: '18px', fontWeight: '800', color: '#4a7c59' }}>Conecta</span>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link
            to="/cliente"
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              background: location.pathname === '/cliente' ? '#4a7c59' : 'transparent',
              color: location.pathname === '/cliente' ? 'white' : '#6b7280',
            }}
          >
            Encontrar profissional
          </Link>
          <Link
            to="/cliente/avaliacoes"
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              background: location.pathname === '/cliente/avaliacoes' ? '#4a7c59' : 'transparent',
              color: location.pathname === '/cliente/avaliacoes' ? 'white' : '#6b7280',
            }}
          >
            Minhas avaliações
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Olá, {user?.name?.split(' ')[0]}</span>
        <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #ccc', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>
          Sair
        </button>
      </div>
    </nav>
  )
}