import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import PrivateRoute from './routes/PrivateRoute'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import CadastroCliente from './pages/auth/CadastroCliente'
import CadastroPrestador from './pages/auth/CadastroPrestador'
import ClienteHome from './pages/client/ClienteHome'
import DetalhesProfissional from './pages/client/DetProfissional'
import AdminHome from './pages/admin/AdminHome'
import PrestadorHome from './pages/provider/PrestadorHome'

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro/cliente" element={<CadastroCliente />} />
      <Route path="/cadastro/prestador" element={<CadastroPrestador />} />

      <Route path="/cliente" element={
        <PrivateRoute role="client"><ClienteHome /></PrivateRoute>
      }/>
      <Route path="/cliente/profissional/:id" element={
        <PrivateRoute role="client"><DetalhesProfissional /></PrivateRoute>
      }/>

      <Route path="/prestador/*" element={
        <PrivateRoute role="provider"><PrestadorHome /></PrivateRoute>
      }/>

      <Route path="/admin/*" element={
        <PrivateRoute role="admin"><AdminHome /></PrivateRoute>
      }/>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}