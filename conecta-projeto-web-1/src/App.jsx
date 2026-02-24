import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import PrivateRoute from './routes/PrivateRoute'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import CadastroCliente from './pages/auth/CadastroCliente'
import CadastroPrestador from './pages/auth/CadastroPrestador'

//  temporários
const ClientHome = () => <h1 style={{color:'white', padding:'40px'}}>Área do Cliente </h1>
const ProviderHome = () => <h1 style={{color:'white', padding:'40px'}}>Área do Prestador </h1>
const AdminHome = () => <h1 style={{color:'white', padding:'40px'}}>Painel Admin </h1>

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro/cliente" element={<CadastroCliente />} />
      <Route path="/cadastro/prestador" element={<CadastroPrestador />} />

      <Route path="/cliente/*" element={
        <PrivateRoute role="client"><ClientHome /></PrivateRoute>
      }/>

      <Route path="/prestador/*" element={
        <PrivateRoute role="provider"><ProviderHome /></PrivateRoute>
      }/>

      <Route path="/admin/*" element={
        <PrivateRoute role="admin"><AdminHome /></PrivateRoute>
      }/>
      <Route path="/" element={<Landing />} />


      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}