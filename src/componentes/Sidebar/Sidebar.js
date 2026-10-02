import style from "./Sidebar.module.css";
import Logo from "../../assets/LogoBranco.png"
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { MdGroup, MdFolder } from "react-icons/md";
import { GiWhiteBook } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { PiChartDonutFill } from "react-icons/pi";
import { PiClipboardTextBold } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";

export function Sidebar({ children }) {

    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const tipoUsuario = usuario?.tipoUsuario;
    const nomeUsuario = usuario?.nome || "Usuário";

    async function irParaDashboard() {
        navigate('/dashboard')
    }

    return (
        <div>
            <div className={style.sidebar_conteudo}>
                <div className={style.sidebar_header}>
                    <img src={Logo} alt="Logo-Tarefa360" onClick={irParaDashboard} className={style.logo} />

                    <div className={style.perfil_container}>
                        <div className={style.perfil_info}>
                            {/* Gera um avatar estilizado baseado no nome do usuário usando a api DiceBear */}
                            <img
                            src={`https://api.dicebear.com/10.x/initials/svg?seed=${nomeUsuario}`} 
                            alt="Avatar" 
                            className={style.perfil_avatar} 
                            />                            
                            
                            <h3 className={style.perfil_nome}>{nomeUsuario}</h3>
                        </div>                        
                    </div>

                    <hr className={style.linha} />
                </div>

                {tipoUsuario === 0 ? 
                (
                    <div className={style.sidebar_corpo}>
                        <SidebarItem texto="Dashboard" link="/dashboard" alt="Dashboard" logo={<MdDashboard />} />
                        <SidebarItem texto="Usuarios" link="/usuarios" logo={<MdGroup />} />
                        <SidebarItem texto="Projetos" link="/projetos" logo={<MdFolder />} />
                        <SidebarItem texto="Histórias" link="/historias" logo={<GiWhiteBook />} />
                        <SidebarItem texto="Sprints" link="/sprints" logo={<PiChartDonutFill/>} />
                        <SidebarItem texto="Tarefas" link="/tarefas" logo={<PiClipboardTextBold/>} />
                    </div>
                ) 
                : 
                (
                    <div className={style.sidebar_corpo}>
                        <SidebarItem texto="Dashboard" link="/dashboard" logo={<MdDashboard />} />
                        <SidebarItem texto="Projetos" link="/projetos" logo={<MdFolder />} />
                        <SidebarItem texto="Histórias" link="/historias" logo={<GiWhiteBook />} />
                        <SidebarItem texto="Sprints" link="/sprints" logo={<PiChartDonutFill/>} />
                        <SidebarItem texto="Tarefas" link="/tarefas" logo={<PiClipboardTextBold/>} />
                    </div>
                )}

            </div>

            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}