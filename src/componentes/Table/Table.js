import { Table } from "react-bootstrap";


export function Table ({ colunas, dados})
{
return (
    <Table responsive>
        <thead>
            <tr>
                {colunas.map((coluna) => (
                    <th key ={coluna.chave}>{coluna.titulo}</th>
                ))}
            </tr>
        </thead>

        <tbody>
            {dados.map((linha) => (
                <tr key={linha.id }>

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