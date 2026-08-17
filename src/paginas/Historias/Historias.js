import { useEffect, useState } from "react";
import HistoriaAPI from "../../services/historiaAPI";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import { MdEdit, MdDelete} from "react-icons/md"
import { Button, Modal } from "bootstrap";

export function Historias()
{
    const [historias, setHistorias] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [historiaSelecionada, setHistoriaSelecionada] = useState(null);
    const [busca, setBusca] = useState("");

    const handleClickDeletar = (historia) => {
        setHistoriaSelecionada(historia);
        setMostrarModal(true);
    };

    const handleDeletar = async () => {
        try
        {
            await HistoriaAPI.deletarAsync(historiaSelecionada.id);
            setHistorias(historias.filter(h => h.id !== historiaSelecionada.id));
        }
        catch(error)
        {
            console.error("Erro ao deletar história:", error);
        }
        finally
        {
            
        }
    }

    const handleFecharModal = () => {
        setMostrarModal(false);
        setHistoriaSelecionada(null);
    };

    async function carregarHistorias(){
        try
        {
            const listaHistorias = await HistoriaAPI.listarAsync();
            setHistorias(listaHistorias);
        }
        catch(error)
        {
            console.error("Erro ao carregar histórias:", error)
        }
    }

    useEffect(() => {
        carregarHistorias();
    }, []);

    const historiasFiltradas = historias.filter(historia => 
        historia.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <h3>Histórias</h3>
                        <Link to='/historia/novo' className={style.botao_novo}>+ Nova</Link>
                    </div>

                    <div className={style.campo_busca}>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className={style.input_busca}
                        />
                    </div>

                    <div className={style.tabela}>
                        <Table responsive>
                            <thead className={style.tabela.cabecalho}>
                                <tr>
                                    <th>Nome</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody className={style.tabela_corpo}>
                                {historiasFiltradas.map((historia) => (
                                    <tr key={historia.id}>
                                        <td>{historia.nome}</td>
                                        <td>
                                            <Link to='/historia/editar' state={historia.id} className= {style.botao_editar}>
                                                <MdEdit />
                                            </Link>
                                            <button onClick={() => handleClickDeletar(historia)} className={style.botao_deletar}>
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <Modal show={mostrarModal} onHide={handleFecharModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Tem certeza que deseja deletar essa história {historiaSelecionada?.nome}?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleFecharModal}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDeletar}>
                                Deletar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Topbar>
        </Sidebar>
    )
}