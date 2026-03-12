import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavbarPrestador() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/prestador" className="navbar-logo">Conecta</Link>
      <div className="navbar-links">
        <span className="navbar-user">Olá, {user?.name?.split(' ')[0]}</span>
        <button onClick={handleLogout} className="btn-outline" style={{ padding: '7px 16px', fontSize: '13px' }}>
          Sair
        </button>
      </div>
    </nav>
  )
}
