import { useEffect, useState } from "react";
import SprintAPI from "../../services/sprintAPI";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import { MdEdit, MdDelete } from "react-icons/md";
import { Button, FormGroup, Modal, ModalTitle } from "react-bootstrap";
import { Form } from "react-bootstrap";
import style from './Sprint.module.css';
import { ModalBody, ModalFooter, ModalHeader, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from 'date-fns';


export function Sprints() {
    const [sprints, setSprints] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [sprintSelecionada, setSprintSelecionada] = useState(null);
    const [busca, setBusca] = useState("");
    const [sprint, setSprint] = useState([]);
    const [sprintSelecionado, setSprintSelecionado] = useState('');
    const [sprintFiltro, setSprintsFiltro] = useState([]);

    const handleClickDeletar = (sprint) => {
        setSprintSelecionada(sprint);
        setMostrarModal(true);
    };

    const handleDeletar = async () => {
        try {
            await SprintAPI.deletarAsync(sprintSelecionada.id);
            setSprints(sprints.filter(h => h.id !== sprintSelecionada.id));
        }
        catch (error) {
            console.error("Erro ao deletar sprint", error);
        }
        finally {
            handleFecharModal()
        }
    }

    const handleFecharModal = () => {
        setMostrarModal(false);
        setSprintSelecionada(null);
    };

    async function carregarSprints() {
        try {
            const listaSprints = await SprintAPI.listarAsync(true);
            setSprints(listaSprints)
        }
        catch (error) {
            console.log("Erro ao carregar sprints:", error)
        }
    }

    async function buscarSprints() {
        try {
            const sprints = await SprintAPI.listarAsync();
            setSprint(sprints);
        }
        catch (error) {
            console.error("Erro ao buscar sprints", error);
        }
    }

    useEffect(() => {
        carregarSprints();

        buscarSprints();
    }, []);

        const sprintsFiltradas = sprints.filter((sprint) => {
        const buscaSprint = sprint.nome.toLowerCase().includes(busca.toLowerCase());
        const filtroSprint = sprintSelecionado == '' || sprint.projetoId == sprintSelecionado;
        return buscaSprint && filtroSprint;
    });

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <h3>Sprints</h3>
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
                            <FormGroup controlId="formSprint" className="">
                                <Form.Control className={style.filtro_sprint}
                                    as="select"
                                    name="sprint"
                                    value={sprintSelecionado}
                                    onChange={(e) => setSprintSelecionado(e.target.value)}
                                    required
                                >
                                    <option value="">Sprint </option>
                                    {sprint.map((sprint) => (
                                        <option key={sprint.id} value={sprint.id}> {sprint.nome}</option>
                                    ))}
                                </Form.Control>
                            </FormGroup>
                        </Form>

                        <Link to='/sprints/novo' className={style.botao_novo}> + Nova</Link>
                    </div>

                    <div className={style.tabela}>
                        <Table responsive>
                            <thead className={style.tabela_cabecalho}>
                                <tr>
                                    <th>Nome</th>
                                    <th>Projeto</th>
                                    <th>Data Inicio</th>
                                    <th>Data Fim</th>
                                </tr>
                            </thead>

                            <tbody className={style.tabela_corpo}>
                                {sprintsFiltradas.map((sprint) => (
                                    <tr key={sprint.id}>
                                        <td>{sprint.nome}</td>
                                        <td>{sprint.nomeProjeto}</td>
                                        <td>{format(sprint.dataInicio, 'dd/MM/yyyy')}</td>
                                        <td>{sprint.dataFim}</td>
                                        <td>
                                            <Link to='/sprints/editar' state={sprint.id} className={style.botao_editar}>
                                                <MdEdit />
                                            </Link>
                                            <button onClick={() => handleClickDeletar(sprint)} className={style.botao_deletar}>
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
                            <ModalTitle>Confirmar</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            Tem certeza que deseja deletar essa sprint? {sprintSelecionada?.nome}?
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