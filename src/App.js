import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './paginas/Home/Home';
import { Usuarios } from './paginas/Usuarios/Usuarios';
import { NovoUsuario } from './paginas/NovoUsuario/NovoUsuario';
import { EditarUsuario } from './paginas/EditarUsuario/EditarUsuario';
import { Projetos } from './paginas/Projetos/Projetos';
import { NovoProjeto } from './paginas/NovoProjeto/NovoProjeto';
import { EditarProjeto } from './paginas/EditarProjeto/EditarProjeto';
import { NovaHistoria } from './paginas/NovaHistoria/NovaHistoria';
import { EditarHistoria } from './paginas/EditarHistoria/EditarHistoria';
import { Historias } from './paginas/Historias/Historias';
import { Login } from './paginas/Login/Login';
import { RotaLogin } from './paginas/Login/RotaLogin';
import { Dashboard } from './paginas/Dashboard/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<RotaLogin><Dashboard/></RotaLogin>} />
      
        <Route path='/usuarios'
            element={
              <RotaLogin tipoUsuario={0}><Usuarios/></RotaLogin>
            }/>

        <Route path='/usuario/novo' 
            element={
              <RotaLogin tipoUsuario={0}><NovoUsuario /></RotaLogin>
            }/>

        <Route path='/usuario/editar' 
            element={
              <RotaLogin tipoUsuario={0}><EditarUsuario/></RotaLogin>
            }/>

        <Route path='/projetos' element={<RotaLogin><Projetos/></RotaLogin>} />
        <Route path='/projeto/novo' element={<RotaLogin><NovoProjeto/></RotaLogin>} />
        <Route path='/projeto/editar' element={<RotaLogin><EditarProjeto/></RotaLogin>} />
        <Route path='/historias' element={<RotaLogin><Historias/></RotaLogin>} />
        <Route path='/historia/novo' element={<RotaLogin><NovaHistoria/></RotaLogin>} />
        <Route path='/historia/editar' element={<RotaLogin><EditarHistoria/></RotaLogin>} />
        
        {/* <Route path='tarefas' element={<RotaLogin><Tarefas/></RotaLogin>} />
        <Route path='/sprints' element={<RotaLogin><Sprints/></RotaLogin>} />
        <Route path='/sprint/novo' element={<RotaLogin><NovaSprint/></RotaLogin>} />
        <Route path='/sprint/editar' element={<RotaLogin><EditarSprint/></RotaLogin>} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
