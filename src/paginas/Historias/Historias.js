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
import { Tabela } from "../../componentes/Tabela/Tabela";

export function Historias() {
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
        try 
        {
            await HistoriaAPI.deletarAsync(historiaSelecionada.id);
            setHistorias(historias.filter(h => h.id !== historiaSelecionada.id));
        }
        catch (error) 
        {
            console.error("Erro ao deletar história:", error);
        }
        finally 
        {
            handleFecharModal();
        }
    }

    const handleFecharModal = () => {
        setMostrarModal(false);
        setHistoriaSelecionada(null);
    };

    async function carregarHistorias() {
        try {
            const listaHistorias = await HistoriaAPI.listarAsync(true);
            setHistorias(listaHistorias);
        }
        catch (error) 
        {
            console.error("Erro ao carregar histórias:", error)
        }
    }

    async function buscarProjetos() {
        try 
        {
            const projetos = await ProjetoAPI.listarAsync();
            setProjeto(projetos);
        }
        catch (error) {
            console.error('Erro ao buscar projetos:', error);
        }
    }

    useEffect(() => {
        carregarHistorias();

        buscarProjetos();
    }, []);

    const historiasFiltradas = historias.filter((historia) => {
        const buscaHistoria = historia.nome.includes(busca);
        const filtroProjeto = projetoSelecionado === '' || historia.projetoId === Number (projetoSelecionado);
        return buscaHistoria && filtroProjeto;
    });
    const colunas = [
        { chave: 'nome', titulo: 'Nome' },
        { chave: 'nomeProjeto', titulo: 'Projeto' },
        {
            chave: 'acoes',
            titulo: 'Ações',
            render: (historia) => (
                <>
                    <Link to='/historia/editar' state={historia.id} className={style.botao_editar}>
                        <MdEdit />
                    </Link>
                    <button onClick={() => handleClickDeletar(historia)} className={style.botao_deletar}>
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
                        <h3>Histórias</h3>
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
                        <Link to='/historia/novo' className={style.botao_novo}>+ Nova</Link>
                    </div>

                    <div className={style.tabela}>
                        <Tabela colunas={colunas} dados={historiasFiltradas} />
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