
import style from "./Sidebar.module.css";
import Logo from "../../assets/LogoBranco.png"
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { MdGroup } from "react-icons/md";

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
                </div>

            </div>

            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}

