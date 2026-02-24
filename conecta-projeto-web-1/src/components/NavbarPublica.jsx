import { Link } from 'react-router-dom'

export default function NavbarPublica() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Conecta</div>
      <div className="navbar-links">
        <Link to="/login" className="btn-outline" style={{ padding: '8px 20px' }}>
          Entrar
        </Link>
        <Link to="/cadastro/cliente" className="btn-primary" style={{ padding: '8px 20px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px' }}>
          Cadastrar
        </Link>
      </div>
    </nav>
  )
}