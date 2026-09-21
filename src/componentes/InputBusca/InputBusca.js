import style from './InputBusca.module.css';

export function InputBusca({ filtro, aoDigitar }) {
    return (
        <input
            type="text"
            placeholder="Buscar..."
            value={filtro}
            onChange={(e) => aoDigitar(e.target.value)}
            className={style.input_busca}
        />
    )
}
