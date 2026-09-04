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
import TarefaAPI from "../../services/tarefaAPI";
import { Usuarios } from "../Usuarios/Usuarios";


export function Tarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [mostraModal, setMostraModal] = useState([]);
    const [tarefaSelecionada, setTarefaSelecionada] = useState(false);
    const [busca, setBusca] = useState("");
    const [projeto, setProjeto] = useState([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState('');
    const [historia, setHistoria] = useSate([]);
    const [historiaSelecionada, setHistoriaSelecionada] = useState('');
    const [sprint, setSprint] = useSate([]);
    const [sprintSelecionada, setSprintSelecionada] = useState('');
    const [usuario, setUsuario] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
    const [tarefasFiltro, setTarefasFiltro] = useState([]);


    const handleClickDeletar = (tarefa) => {
        setTarefaSelecionada(tarefa);
        setMostraModal(true);
    };

    const handleDeletar = async () => {
        try {
            await TarefaAPI.deletarAsync(tarefaSelecionada.id);
            setTarefas(tarefas.filter(t => t.id !== tarefaSelecionada.id));
        }
        catch (error) {
            console.error("Erro ao deletar tarefa:", error)
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
            setTarefas(listarTarefas);
        } catch (error) {
            console.error("Erro ao carregar tarefas:", error)
        }
    }

    async function buscarProjetos() {
        try {
            const projetos = await TarefaAPI.listarAsync();
            setProjeto(projetos);
        }
        catch (error) {
            console.error('Erro ao buscar projetos:', error);
        }
    }

    async function buscarHistoria() {
        try {
            const historias = await TarefaAPI.listarAsync();
            setHistoria(historias);
        }
        catch (error) {
            console.error('Erro ao buscar historia:', error);
        }
    }


    async function buscarSprints() {
        try {
            const sprints = await TarefaAPI.listarAsync();
            setSprint(sprints);
        }
        catch (error) {
            console.error('Erro ao buscar sprint:', error);
        }
    }


    async function buscarUsuarios() {
        try {
            const usuarios = await TarefaAPI.listarAsync();
            seUsuario(usuarios);
        }
        catch (error) {
            console.error('Erro ao buscar usuari:', error);
        }
    }



    useEffect(() => {
        carregarTarefas();
        buscarProjetos();
        buscarHistoria();
        buscarSprints();
        buscarUsuarios();
    }, []);


    const tarefasFiltradas = tarefas.filter((tarefas) => {
        const buscaTarefas = tarefas.nome.toLowerCase().includes(busca.toLowerCase());
        const filtroProjeto = projetoSelecionado == '' || tarefas.projetoId == projetoSelecionado;
        const filtroHistoria = historiaSelecionada == '' || tarefas.HistoriaId == historiaSelecionada;
        const filtroSprint = sprintSelecionada == '' || tarefas.sprintId == sprintSelecionada;
        const filtroUsuario = usuarioSelecionado == '' || tarefas.usuarioId == usuarioSelecionado;
        return buscaTarefas && filtroProjeto && filtroHistoria && filtroUsuario && filtroSprint;

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
                        <Form>
                            <FormGroup controlId="formProjeto" className="mb-3">
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
                        <Link to='/tarefa/novo' className={style.botao_novo}>+ Nova</Link>
                    </div>

                    <div className={style.tabela}>
                        <Table responsive>
                            <thead className={style.tabela_cabecalho}>
                                <tr>
                                    <th>Nome</th>
                                    <th>Projeto</th>
                                    <th>Historia</th>
                                    <th>Sprint</th>
                                    <th>Usuario</th>
                                </tr>
                            </thead>
                            <tbody className={style.tabela_corpo}>
                                {tarefasFiltradas.map((tarefa) => (
                                    <tr key={tarefa.id}>
                                        <td>{tarefa.nome}</td>
                                        <td>{tarefa.nomeProjeto}</td>

                                        <td>
                                            <Link to='/tarefa/editar' state={tarefa.id} className={style.botao_editar}>
                                                <MdEdit />
                                            </Link>

                                            <Button onClick={() => handleClickDeletar(tarefa)} className={style.botoa_deletar}>
                                                <MdDelete />
                                            </Button>
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