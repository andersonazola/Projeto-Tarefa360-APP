import style from "./Topbar.module.css";
import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";

export function Topbar({ children, childrenTopo }) {
    return (
        <div>
            <div className={style.topbar_conteudo}>
                
                <div className={style.area_centro_topo}>
                    {childrenTopo}
                </div>

                
                <Link to="/login" className={style.botao_deslogar}>
                    <MdLogout />
                </Link>
            </div>

            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    );
}