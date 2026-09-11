import style from "./Sidebar.module.css";
import Logo from "../../assets/LogoBranco.png"
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { MdGroup, MdFolder } from "react-icons/md";
import { GiWhiteBook } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { PiChartDonutFill } from "react-icons/pi";
import { PiClipboardTextBold } from "react-icons/pi";

export function Sidebar({ children }) {

    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const tipoUsuario = usuario?.tipoUsuario;

    async function irParaDashboard() 
    {
        navigate('/dashboard')
    }

    return (
        <div>
            <div className={style.sidebar_conteudo}>
                <div className={style.sidebar_header}>
                    <img src={Logo} alt="Logo-Tarefa360" onClick={irParaDashboard} className={style.logo} />

                    <hr className={style.linha} />
                </div>

                {tipoUsuario === 0 ? 
                (
                    <div className={style.sidebar_corpo}>
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