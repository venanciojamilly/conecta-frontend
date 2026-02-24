import { Link } from 'react-router-dom'
import NavbarPublica from '../components/NavbarPublica'

export default function Landing() {
  return (
    <div>
      <NavbarPublica />

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
    </div>
  )
}