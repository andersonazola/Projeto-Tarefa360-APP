import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjetoAPI from "../../services/projetoAPI";
import HistoriaAPI from "../../services/historiaAPI";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { MdSaveAs } from "react-icons/md";
import style from './NovaHistoria.module.css';
import { useAlert } from '../../componentes/Alert/AlertContext';

export function NovaHistoria() {
    const { mostrarAlerta } = useAlert();

    const [nome, setNome] = useState('');
    const [projeto, setProjeto] = useState([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState(''); 
    const [descricao, setDescricao] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fecthProjetos = async () => {
            try {
                const projetos = await ProjetoAPI.listarAsync();
                setProjeto(projetos);
            }
            catch (error) {
                console.error('Erro ao buscar projetos', error);
            }
        };
        fecthProjetos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            await HistoriaAPI.criarAsync(nome, projetoSelecionado, descricao);
            mostrarAlerta('História cadastrada com sucesso!', 'success', () => {
                navigate('/historias')
            });
        }
        else {
            mostrarAlerta('Por favor, preencha os campos Nome e Projeto.', 'warning');
        }
    };

    const isFormValid = () => {
        return nome.length >= 3;
    };


    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Novo História</h3>

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
                                maxLength={80}
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
                                {projeto.map((projetoEscolhido) => (
                                    <option key={projetoEscolhido.id} value={projetoEscolhido.id}>{projetoEscolhido.nome}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formDescricao" className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite a descrição da história"
                                name="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                maxLength={500}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disable={isFormValid()}>
                            <div className= {style.botao_salvar}>
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