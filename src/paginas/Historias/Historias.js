import { useEffect, useState } from "react";
import HistoriaAPI from "../../services/historiaAPI";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import { MdEdit, MdDelete } from "react-icons/md"
import { Button, FormGroup, Modal } from "react-bootstrap";
import ProjetoAPI from "../../services/projetoAPI";
import Form from 'react-bootstrap/Form';
import style from './Historias.module.css';
import { ModalBody, ModalFooter, ModalHeader, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { InputBusca } from "../../componentes/InputBusca/InputBusca";
import { useAlert } from '../../componentes/Alert/AlertContext';

export function Historias() {
    const { mostrarAlerta } = useAlert();

    const [historias, setHistorias] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [historiaSelecionada, setHistoriaSelecionada] = useState(null);
    const [busca, setBusca] = useState("");
    const [projeto, setProjeto] = useState([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState('');
    

    const handleClickDeletar = (historia) => {
        setHistoriaSelecionada(historia);
        setMostrarModal(true);
    };

    const handleDeletar = async () => {
        try {
            await HistoriaAPI.deletarAsync(historiaSelecionada.id);
            setHistorias(historias.filter(h => h.id !== historiaSelecionada.id));
            mostrarAlerta('História excluída com sucesso!', 'success');
        }
        catch (error) {
            console.error("Erro ao deletar história:", error);
        }
        finally {
            handleFecharModal();
        }
    }

    const handleFecharModal = () => {
        setMostrarModal(false);
        setHistoriaSelecionada(null);
    };

    async function carregarHistorias(filtro) {
        try {
            const buscaHistorias = await HistoriaAPI.buscaAsync(filtro);
            setHistorias(buscaHistorias);
        }
        catch (error) {
            console.error("Erro ao carregar histórias:", error)
        }
    }

    async function buscarProjetos() {
        try {
            const projetos = await ProjetoAPI.listarAsync();
            setProjeto(projetos);
        }
        catch (error) {
            console.error('Erro ao buscar projetos:', error);
        }
    }

    useEffect(() => {
        buscarProjetos();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            carregarHistorias(busca);
        }, 300);

        return () => clearTimeout(timer);
    }, [busca]);


    const historiasFiltradas = historias.filter((historia) =>
        projetoSelecionado === '' || historia.projetoId === Number(projetoSelecionado)
    );

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <div>
                            <h3>Histórias</h3>
                        </div>
                        <div className={style.pagina_cabecalho_botoes}>
                            <Form>
                                <FormGroup controlId="formProjeto" className="m-3">
                                    <Form.Control className={style.filtro_projeto}
                                        as="select"
                                        name="projeto"
                                        value={projetoSelecionado}
                                        onChange={(e) => setProjetoSelecionado(e.target.value)}
                                        required
                                    >
                                        <option value="">Projeto</option>
                                        {projeto.map((projeto) => (
                                            <option key={projeto.id} value={projeto.id}>{projeto.nome}</option>
                                        ))}
                                    </Form.Control>
                                </FormGroup>
                            </Form>
                            <Link to='/historia/novo' className={style.botao_novo}>+ Nova</Link>
                        </div>
                    </div>
                    <div className={style.barra_opcoes}>
                        <InputBusca filtro={busca} aoDigitar={setBusca} />
                    </div>

                    <div className={style.tabela}>
                        <Table responsive>
                            <thead className={style.tabela_cabecalho}>
                                <tr>
                                    <th>Nome</th>
                                    <th>Projeto</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody className={style.tabela_corpo}>
                                {historiasFiltradas.map((historia) => (
                                    <tr key={historia.id}>
                                        <td>{historia.nome}</td>
                                        <td>{historia.nomeProjeto}</td>

                                        <td>
                                            <Link to='/historia/editar' state={historia.id} className={style.botao_editar}>
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
                        <ModalHeader closeButton>
                            <Modal.Title>Confirmar</Modal.Title>
                        </ModalHeader>
                        <ModalBody>
                            Tem certeza que deseja deletar essa história {historiaSelecionada?.nome}?
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="secondary" onClick={handleFecharModal}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDeletar}>
                                Deletar
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Topbar>
        </Sidebar>
    )
}