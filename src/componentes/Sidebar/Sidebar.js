import style from "./Sidebar.module.css";
import Logo from "../../assets/LogoBranco.png"
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { MdGroup, MdFolder } from "react-icons/md";
import { GiBlackBook } from "react-icons/gi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { PiClipboardTextBold } from "react-icons/pi";






export function Sidebar({ children }) {

    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const tipoUsuario = usuario?.tipoUsuario;

    async function irParaHome() 
    {
        navigate('/home')
    }

    return (
        <div>
            <div className={style.sidebar_conteudo}>
                <div className={style.sidebar_header}>
                    <img src={Logo} alt="Logo-Tarefa360" onClick={irParaHome} className={style.logo} />

                    <hr className={style.linha} />
                </div>

                <div className={style.sidebar_corpo}>
                    <SidebarItem texto="Usuarios" link="/usuarios" logo={<MdGroup />} />
                    <SidebarItem texto="Projetos" link="/projetos" logo={<MdFolder />} />
                    <SidebarItem texto="Histórias" link="/historias" logo={<GiBlackBook />} />
                    <SidebarItem texto="Tarefas" link="/tarefas" logo={<PiClipboardTextBold />} />
                </div>
            </div>

            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}

