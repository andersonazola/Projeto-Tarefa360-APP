import { useEffect, useState } from "react";
import ProjetoAPI from "../../services/projetoAPI";
import HistoriaAPI from "../../services/historiaAPI";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import Form from 'react-bootstrap/Form';
import { Button } from "bootstrap";
import { MdSaveAs } from "react-icons/md";

export function EditarHistoria() {
    const location = useLocation();
    const navigate = useNavigate();

    const [id] = useState(location.state);
    const [nome, setNome] = useState('');
    const [projeto, setProjeto] = useState([]);
    const [descricao, setDescricao] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            await HistoriaAPI.atualizarAsync(id, nome, projeto, descricao);
            navigate('/historias')
        }
        else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    useEffect(() => {
        const buscarProjetos = async () => {
            try {
                const projetos = await ProjetoAPI.listarAsync();
                console.log(projetos);
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
                setProjeto(historia.projeto)
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
                            />
                        </Form.Group>

                        <Form.Group controlId="formProjeto" className="mb-3">
                            <Form.Label>Projeto</Form.Label>
                            <Form.Control
                                as="select"
                                name="projeto"
                                value={projeto}
                                onChange={(e) => setProjeto(e.target.value)}
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
                                name="historia"
                                value={historia}
                                onChange={(e) => setDescricao(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isFormValid()}>
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