import Table from "react-bootstrap/esm/Table";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import { Link } from "react-router-dom";
import style from "./Projetos.module.css"
import { MdEdit, MdDelete } from "react-icons/md"
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import ProjetoAPI from "../../services/projetoAPI";
import { Tabela } from "../../componentes/Tabela/Tabela";

export function Projetos(){
    const [projetos, setProjetos] = useState ([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [projetoSelecionado, setProjetoSelecionado] = useState (null);
    const [busca, setBusca] = useState("");

    const handleClickDeletar = (projeto) => {
        setProjetoSelecionado(projeto);
        setMostrarModal(true);
    };

    const handleDeletar = async () => {
        try {
            await ProjetoAPI.deletarAsync(projetoSelecionado.id);
            setProjetos(projetos.filter(p => p.id !== projetoSelecionado.id));
        } catch (error) {
            console.error("Erro ao deletar projeto:", error);
        } finally {
            handleFecharModal ();
        }
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
        setProjetoSelecionado(null);
    };

    async function carregarProjetos(){
        try {
            const listaProjetos = await ProjetoAPI.listarAsync();
            setProjetos(listaProjetos);
        } catch (error) {
            console.error("Erro ao carregar projetos:", error);
        }
    }

    useEffect(() => {
        carregarProjetos();
    }, []);

    //Filtra projetos pelo texto da busca
    const projetosFiltrados = projetos.filter(projeto =>
        projeto.nome.toLowerCase().includes(busca.toLowerCase())
    );

    const colunas = [
        { chave: 'nome', titulo: 'Nome' },
        {
            chave: 'acoes',
            titulo: 'Ações',
            render: (projeto) => (
                <>
                    <Link to='/projeto/editar' state={projeto.id} className={style.botao_editar}>
                        <MdEdit />
                    </Link>
                    <button onClick={() => handleClickDeletar(projeto)} className={style.botao_deletar}>
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
                        <h3>Projetos</h3>
                        <Link to='/projeto/novo' className={style.botao_novo}>+ Novo</Link>
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
                        <Tabela colunas={colunas} dados={projetosFiltrados} />
                    </div>

                    <Modal show={mostrarModal} onHide={handleFecharModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Tem certeza que deseja deletar o projeto {projetoSelecionado?.nome}?
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