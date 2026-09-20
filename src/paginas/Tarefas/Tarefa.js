import { useEffect, useState } from "react";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import { MdEdit, MdDelete, MdClose } from "react-icons/md"
import { Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import style from './Tarefa.module.css';
import { Link } from "react-router-dom";
import TarefaAPI from "../../services/tarefaAPI";
import HistoriaAPI from "../../services/historiaAPI";
import SprintAPI from "../../services/sprintAPI"
import { useAlert } from '../../componentes/Alert/AlertContext';


export function Tarefas() {
    const { mostrarAlerta } = useAlert();

    const [tarefas, setTarefas] = useState([]);
    const [mostraModal, setMostraModal] = useState(false);
    const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
    const [busca, setBusca] = useState("");
    const [historia, setHistoria] = useState([]);
    const [historiaSelecionada, setHistoriaSelecionada] = useState('');
    const [sprint, setSprint] = useState([]);
    const [sprintSelecionada, setSprintSelecionada] = useState('');


    const handleClickDeletar = (tarefa) => {
        setTarefaSelecionada(tarefa);
        setMostraModal(true);
    };

    const handleDeletar = async () => {
        try {
            await TarefaAPI.Deletar(tarefaSelecionada.id);
            setTarefas(tarefas.filter(t => t.id !== tarefaSelecionada.id));
            mostrarAlerta('Tarefa excluída com sucesso!', 'success');
        }
        catch (error) {
            console.error("Erro ao deletar tarefa:", error)
            mostrarAlerta('Erro ao deletar tarefa.', 'danger');
        } finally {
            handleFecharModal();
        }
    }

    const handleFecharModal = () => {
        setMostraModal(false);
        setTarefaSelecionada(null);
    };


    async function carregarTarefas() {
        try {
            const listarTarefas = await TarefaAPI.listarAsync(true);
            console.log('TAREFAS RECEBIDAS:', listarTarefas);
            setTarefas(listarTarefas);
        } catch (error) {
            console.error("Erro ao carregar tarefas:", error)
        }
    }

    async function buscarHistoria() {
        try {
            const historias = await HistoriaAPI.listarAsync(); 
            setHistoria(historias);
        }
        catch (error) {
            console.error('Erro ao buscar historia:', error);
        }
    }

    async function buscarSprints() {
        try {
            const sprints = await SprintAPI.listarAsync(); 
        }
        catch (error) {
            console.error('Erro ao buscar sprint:', error);
        }
    }


    useEffect(() => {
        carregarTarefas();
        buscarHistoria();
        buscarSprints();
    }, []);


    const tarefasFiltradas = tarefas.filter((tarefa) => {
        const buscaTarefa = tarefa.nome.toLowerCase().includes(busca.toLowerCase());
        const filtroHistoria = historiaSelecionada === '' || tarefa.historiaId === historiaSelecionada;
        const filtroSprint = sprintSelecionada === '' || tarefa.sprintId === sprintSelecionada;
        return buscaTarefa && filtroHistoria && filtroSprint;
    });


    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <h3>Tarefas</h3>
                    </div>
                    <div className={style.barra_opcoes}>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className={style.input_busca}
                        />
                        {busca && (
                            <MdClose onClick={() => setBusca('')} className={style.botao_limpar_busca} />
                        )}

                        <Form>
                            <FormGroup controlId="formSprint">
                                <Form.Control className={style.filtro_projeto}
                                    as="select"
                                    name="sprint"
                                    value={sprintSelecionada}
                                    onChange={(e) => setSprintSelecionada(e.target.value)}
                                >
                                    <option value="">Sprint</option>
                                    {sprint.map((s) => (
                                        <option key={s.id} value={s.id}>{s.nome}</option>
                                    ))}
                                </Form.Control>
                            </FormGroup>
                        </Form>

                        <Form>
                            <FormGroup controlId="formHistoria">
                                <Form.Control className={style.filtro_projeto}
                                    as="select"
                                    name="historia"
                                    value={historiaSelecionada}
                                    onChange={(e) => setHistoriaSelecionada(e.target.value)}
                                >
                                    <option value="">História</option>
                                    {historia.map((h) => (
                                        <option key={h.id} value={h.id}>{h.nome}</option>
                                    ))}
                                </Form.Control>
                            </FormGroup>
                        </Form>

                        <Link to='/tarefa/novo' className={style.botao_novo}>+ Novo</Link>
                    </div>

                    <div className={style.tabela}>
                        <Table responsive>
                            <thead className={style.tabela_cabecalho}>
                                <tr>
                                    <th>Nome</th>
                                    <th>Responsável</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody className={style.tabela_corpo}>
                                {tarefasFiltradas.map((tarefa) => (
                                    <tr key={tarefa.id}>
                                        <td>{tarefa.nome}</td>
                                        <td>{tarefa.nomeUsuario}</td>
                                        <td>
                                            <Link to='/tarefa/editar' state={tarefa.id} className={style.botao_editar}>
                                                <MdEdit />
                                            </Link>

                                            <button onClick={() => handleClickDeletar(tarefa)} className={style.botao_deletar}>
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <Modal show={mostraModal} onHide={handleFecharModal}>
                        <ModalHeader closeButton>
                            <Modal.Title>Confirmar</Modal.Title>
                        </ModalHeader>
                        <ModalBody>
                            Tem certeza que deseja deletar essa tarefa {tarefaSelecionada?.nome}?
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="secondary" onClick={handleFecharModal}>
                                Cancelar
                            </Button>
                            <Button variant="dark" onClick={handleDeletar}>
                                Deletar
                            </Button>
                        </ModalFooter>
                    </Modal>

                </div>
            </Topbar>
        </Sidebar>
    )

}