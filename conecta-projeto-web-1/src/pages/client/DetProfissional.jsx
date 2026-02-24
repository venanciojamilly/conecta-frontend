import { useParams, Link } from 'react-router-dom'
import NavbarCliente from '../../components/NavbarCliente'
import db from '../../data/db.js'

export default function DetProfissional() {
  const { id } = useParams()
  const profissional = db.users.find(u => u.id === Number(id))

  if (!profissional) {
    return (
      <div>
        <NavbarCliente />
        <div className="page-container">
          <p>Profissional não encontrado.</p>
          <Link to="/cliente">← Voltar</Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <NavbarCliente />
  
      <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
        <Link to="/cliente">← Voltar</Link>
        <br /><br />
  
        <img src={profissional.avatar} alt={profissional.name} style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
        <h2>{profissional.name}</h2>
        <p>{profissional.category}</p>
        <p>📍 {profissional.city}</p>
        <p>⭐ {profissional.rating} ({profissional.reviews} avaliações)</p>
        <p><strong>R$ {profissional.price} / diária</strong></p>
  
        <hr style={{ margin: '16px 0' }} />
  
        <h3>Sobre</h3>
        <p>{profissional.description}</p>
  
        <hr style={{ margin: '16px 0' }} />
  
        <h3>Portfólio</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {profissional.portfolio.map((foto, i) => (
            <img key={i} src={foto} alt={`Trabalho ${i + 1}`} style={{ width: '160px', height: '120px', objectFit: 'cover' }} />
          ))}
        </div>
  
        <br />
        <button>📲 Entrar em contato</button>
      </div>
    </div>
  )
}