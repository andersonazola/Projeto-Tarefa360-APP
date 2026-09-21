import { useEffect, useState } from "react";
import ProjetoAPI from "../../services/projetoAPI";
import HistoriaAPI from "../../services/historiaAPI";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import Form from 'react-bootstrap/Form';
import { MdSaveAs } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import style from './EditarHistoria.module.css';
import { Button } from "react-bootstrap";
import { useAlert } from '../../componentes/Alert/AlertContext';

export function EditarHistoria() {
    const { mostrarAlerta } = useAlert();

    const location = useLocation();
    const navigate = useNavigate();

    const [id] = useState(location.state);
    const [nome, setNome] = useState('');
    const [projeto, setProjeto] = useState([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isFormValid()) 
            {
                await HistoriaAPI.atualizarAsync(id, nome, projetoSelecionado, descricao);
                mostrarAlerta('História atualizada com sucesso!', 'success', () => {
                    navigate('/historias')
                });
            }
            else 
                {
                mostrarAlerta('Por favor, preencha todos os campos.', 'warning');
            }
        }
        catch(error)
        {
            console.error('Erro ao atualizar história: ', error)
        }
    };

    useEffect(() => {
        const buscarProjetos = async () => {
            try {
                const projetos = await ProjetoAPI.listarAsync();
                setProjeto(projetos);
            }
            catch (error) {
                console.error('Erro ao buscar projetos:', error);
            }
        };

        const buscarDadosHistoria = async () => {
            try {
                const historia = await HistoriaAPI.obterAsync(id);
                setNome(historia.nome)
                setProjetoSelecionado(historia.projetoId)
                setDescricao(historia.descricao)
            }
            catch (error) {
                console.error('Erro ao buscar dados da história:', error);
            }
        }
        buscarProjetos();
        buscarDadosHistoria();
    }, []);

    const isFormValid = () => {
        return nome.length >= 3;
    };

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3> Editar história</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o nome da história"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                minLength={3}
                                maxLength={100}
                            />
                        </Form.Group>

                        <Form.Group controlId="formProjeto" className="mb-3">
                            <Form.Label>Projeto</Form.Label>
                            <Form.Control
                                as="select"
                                name="projeto"
                                value={projetoSelecionado}
                                onChange={(e) => setProjetoSelecionado(e.target.value)}
                                required
                            >
                                <option value="">Selecione um projeto</option>
                                {projeto.map((projeto) => (
                                    <option key={projeto.id} value={projeto.id}>{projeto.nome}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formDescricao" className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite a descrição da sua história"
                                name="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                maxLength={500}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!isFormValid()}>
                            <div className={style.botao_salvar}>
                                <MdSaveAs />
                                Salvar
                            </div>
                        </Button>
                    </Form>
                </div>
            </Topbar>
        </Sidebar>
    )
}