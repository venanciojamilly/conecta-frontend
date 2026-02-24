import { createContext, useContext, useState } from 'react'
import db from '../data/db'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (email, password, forcedUser = null) => {

    if (forcedUser) {
      setUser(forcedUser)
      return { success: true, role: forcedUser.role }
    }
  
    const found = db.users.find(
      u => u.email === email && u.password === password
    )
    if (found) {
      setUser(found)
      return { success: true, role: found.role }
    }
    return { success: false }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)