import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './paginas/Home/Home';
import { Usuarios } from './paginas/Usuarios/Usuarios';
import { NovoUsuario } from './paginas/NovoUsuario/NovoUsuario';
import { EditarUsuario } from './paginas/EditarUsuario/EditarUsuario';
import { Projetos } from './paginas/Projetos/Projetos';
import { NovoProjeto } from './paginas/NovoProjeto/NovoProjeto';
import { EditarProjeto } from './paginas/EditarProjeto/EditarProjeto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/usuarios' element={<Usuarios />} />
        <Route path='/usuario/novo' element={<NovoUsuario />} />
        <Route path='/usuario/editar' element={<EditarUsuario />} />
        <Route path='/projetos' element={<Projetos />} />
        <Route path='/projeto/novo' element={<NovoProjeto />} />
        <Route path='/projeto/editar' element={<EditarProjeto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
