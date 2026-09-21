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
import { useAlert } from '../../componentes/Alert/AlertContext';
import { InputBusca } from "../../componentes/InputBusca/InputBusca";

export function Sprints() {
    const { mostrarAlerta } = useAlert();
    const [sprints, setSprints] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [sprintSelecionada, setSprintSelecionada] = useState(null);
    const [busca, setBusca] = useState("");
    const [sprint, setSprint] = useState([]);
    const [sprintSelecionado, setSprintSelecionado] = useState('');

    const handleClickDeletar = (sprint) => {
        setSprintSelecionada(sprint);
        setMostrarModal(true);
    };

    const handleDeletar = async () => {
        try {
            await SprintAPI.deletarAsync(sprintSelecionada.id);
            setSprint(sprint.filter(h => h.id !== sprintSelecionada.id));
            mostrarAlerta('Sprint excluída com sucesso!', 'success');
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

    async function buscarSprints(filtro) {
        try {
            const listaSprints = await SprintAPI.buscaAsync(filtro);
            setSprint(listaSprints);
        }
        catch (error) {
            console.error("Erro ao carregar sprints:", error)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            buscarSprints(busca);
        }, 300);

        return () => clearTimeout(timer);
    }, [busca]);

    const sprintsFiltrada = sprint.filter((s) =>
        sprintSelecionado === '' || s.projetoId === Number(sprintSelecionado)
    );

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <div>
                            <h3>Sprints</h3>
                        </div>
                        <div className={style.pagina_cabecalho_botoes}>
                            <Form>
                                <FormGroup controlId="formSprint" className="m-3">
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
                                        <td>{format(sprint.dataFim, 'dd/MM/yyyy')}</td>
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