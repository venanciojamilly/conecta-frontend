import { createContext, useContext, useState } from 'react'
import db from '../data/db.js'

const AuthContext = createContext(null)

// Carrega usuário salvo no localStorage (se houver)
const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'))

export function AuthProvider({ children }) {
  const [user, setUser] = useState(usuarioSalvo)

  const login = (email, password, forcedUser = null) => {
    // Cadastro novo — salva direto
    if (forcedUser) {
      setUser(forcedUser)
      localStorage.setItem('usuario', JSON.stringify(forcedUser))
      return { success: true, role: forcedUser.role }
    }

    // Login normal — busca no mock
    const found = db.users.find(
      u => u.email === email && u.password === password
    )
    if (found) {
      setUser(found)
      localStorage.setItem('usuario', JSON.stringify(found))
      return { success: true, role: found.role }
    }

    return { success: false }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('usuario')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)