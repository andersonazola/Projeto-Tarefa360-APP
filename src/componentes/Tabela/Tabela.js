import { Table } from "react-bootstrap";
import style from "./Tabela.module.css"
 
export function Tabela({ colunas, dados }) {
    return (
        <Table responsive className={style.tabela}>
            <colgroup>
            {colunas.map((coluna) => (
                <col
                    key={coluna.chave}
                    style={{width: coluna.largura || "auto"}}
                    />
                    ))}                  
            </colgroup>
 
            
                <thead>
                    <tr>
                        {colunas.map((coluna) => (
                            <th key={coluna.chave}>
                                {coluna.titulo}
                            </th>
                        ))} 
                    </tr>
                </thead>
                
            <tbody className={style.corpo}>
                {dados.map((linha) => (
                    <tr key={linha.id}>
                        {colunas.map((coluna) => (
                            <td key={coluna.chave}>
                                {coluna.render ? coluna.render(linha) : linha[coluna.chave]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
 
