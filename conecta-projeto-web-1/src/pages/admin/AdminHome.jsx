import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import db from '../../data/db.js'

export default function AdminHome() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [usuarios, setUsuarios] = useState(db.users)
  const [filtro, setFiltro] = useState('todos')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleExcluir = (id) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsuarios(usuarios.filter(u => u.id !== id))
    }
  }

  const clientes = usuarios.filter(u => u.role === 'client')
  const prestadores = usuarios.filter(u => u.role === 'provider')

  const filtrados = filtro === 'todos' ? usuarios
    : filtro === 'client' ? clientes
    : filtro === 'provider' ? prestadores
    : usuarios

  return (
    <div>
    <div style={{ background: '#2d4f38', color: 'white', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <strong>Painel Admin — Conecta</strong>
      <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer' }}>
        Sair
      </button>
    </div>

    <div style={{ padding: '32px 24px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '16px' }}>Usuários cadastrados</h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['todos', 'client', 'provider'].map(f => (
          <button key={f} onClick={() => setFiltro(f)} style={{ padding: '6px 14px', cursor: 'pointer', background: filtro === f ? '#4a7c59' : 'white', color: filtro === f ? 'white' : '#333', border: '1px solid #ccc', borderRadius: '6px' }}>
            {f === 'todos' ? 'Todos' : f === 'client' ? 'Clientes' : 'Prestadores'}
          </button>
        ))}
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '8px' }}>Nome</th>
            <th style={{ padding: '8px' }}>E-mail</th>
            <th style={{ padding: '8px' }}>Perfil</th>
            <th style={{ padding: '8px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map(u => (
            <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px 8px' }}>{u.name}</td>
              <td style={{ padding: '10px 8px', color: '#666', fontSize: '13px' }}>{u.email}</td>
              <td style={{ padding: '10px 8px', fontSize: '13px' }}>{u.role}</td>
              <td style={{ padding: '10px 8px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button style={{ fontSize: '12px', padding: '4px 8px', cursor: 'pointer' }}>Aprovar</button>
                  <button style={{ fontSize: '12px', padding: '4px 8px', cursor: 'pointer' }}>Suspender</button>
                  {u.role !== 'admin' && (
                    <button onClick={() => handleExcluir(u.id)} style={{ fontSize: '12px', padding: '4px 8px', cursor: 'pointer', color: 'red' }}>Excluir</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)
  
}