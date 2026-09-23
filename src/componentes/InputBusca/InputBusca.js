import style from './InputBusca.module.css';

export function InputBusca({ filtro, aoDigitar, maxLenght}) {
    return (
        <input
            type="text"
            placeholder="Buscar..."
            value={filtro}
            onChange={(e) => aoDigitar(e.target.value)}
            maxLength={(maxLenght ? maxLenght : 100)}
            className={style.input_busca}
        />
    )
}
