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
import { Tabela } from "../../componentes/Tabela/Tabela";
import { render } from "@testing-library/react";
import { InputBusca } from "../../componentes/InputBusca/InputBusca";
import ProjetoAPI from "../../services/projetoAPI";
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
    const [projeto, setProjeto] = useState([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState('');

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

    async function buscarTarefas(filtro) {
        try {
            const buscaTarefas = await TarefaAPI.buscaAsync(filtro);
            setTarefas(buscaTarefas);
        }
        catch (error) {
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

    async function buscarProjetos() {
        try {
            const projetos = await ProjetoAPI.listarAsync();
            setProjeto(projetos);
        }
        catch (error) {
            console.error('Erro ao buscar projetos:', error);
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
        buscarHistoria();
        buscarSprints();
        buscarProjetos();
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => {
            buscarTarefas(busca);
        }, 300);
        return () => clearTimeout(timer);
    }, [busca]);


    const tarefasFiltradas = tarefas.filter((tarefa) => {
        const filtroHistoria = historiaSelecionada === '' || tarefa.historiaId === Number(historiaSelecionada);
        const filtroSprint = sprintSelecionada === '' || tarefa.sprintId === Number(sprintSelecionada);
        const filtroProjeto = projetoSelecionado === '' || tarefa.projetoId === Number(projetoSelecionado);   // linha adicionada
        return filtroHistoria && filtroSprint && filtroProjeto;  
    });

    const colunas = [
        {chave: 'nome', titulo: 'Nome'},
        {chave: 'nomeUsuario', titulo: 'Responsável'},
        {
            chave: 'acoes',
            titulo: 'Ações',
            render: (tarefa) => (
                <>
                <Link to='/tarefa/editar' state={tarefa.id} className={style.botao_editar}>
                    <MdEdit />
                </Link>

                <button onClick={() => handleClickDeletar(tarefa)} className={style.botao_deletar}>
                    <MdDelete />
                </button>
                </>
            ),
        },
    ];


    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <div className={style.pagina_cabecalho}>
                        <div>
                            <h3>Tarefas</h3>
                        </div>
                        <div className={style.pagina_cabecalho_botoes}>
                            <Form>
                                <FormGroup controlId="formProjeto" className="m-1">
                                    <Form.Control className={style.filtro_projeto}
                                        as="select"
                                        name="projeto"
                                        value={projetoSelecionado}
                                        onChange={(e) => setProjetoSelecionado(e.target.value)}
                                    >
                                        <option value="">Projeto</option>
                                        {projeto.map((p) => (
                                            <option key={p.id} value={p.id}>{p.nome}</option>
                                        ))}
                                    </Form.Control>
                                </FormGroup>
                            </Form>

                            <Form>
                                <FormGroup controlId="formSprint" className="m-1">
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
                                <FormGroup controlId="formHistoria" className="m-1">
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
                    </div>
                    <div className={style.barra_opcoes}>
                        <InputBusca filtro={busca} aoDigitar={setBusca} />
                        {busca && (
                            <MdClose onClick={() => setBusca('')} className={style.botao_limpar_busca} />
                        )}
                    </div>

                    <div className={style.tabela}>
                       <Tabela colunas={colunas} dados={tarefasFiltradas} />
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