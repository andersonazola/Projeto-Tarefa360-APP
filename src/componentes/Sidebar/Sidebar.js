import style from "./Sidebar.module.css";
import Logo from "../../assets/LogoBranco.png"
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { MdGroup, MdFolder, MdFlagCircle } from "react-icons/md";
import { GiBlackBook } from "react-icons/gi";

export function Sidebar({ children }) {
    return (
        <div>
            <div className={style.sidebar_conteudo}>
                <div className={style.sidebar_header}>
                    <img src={Logo} alt="Logo-Tarefa360" className={style.logo} />

                    <hr className={style.linha} />
                </div>

                <div className={style.sidebar_corpo}>
                    <SidebarItem texto="Usuarios" link="/usuarios" logo={<MdGroup />} />
                    <SidebarItem texto="Projetos" link="/projetos" logo={<MdFolder />} />
                    <SidebarItem texto="Histórias" link="/historias" logo={<GiBlackBook />} />
                    <SidebarItem texto="Sprints" link="/sprints" logo={< MdFlagCircle/>} />
                </div>
            </div>

            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}

