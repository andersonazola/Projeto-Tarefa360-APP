import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import ProjetoAPI from "../../services/projetoAPI";
import SprintAPI  from "../../services/sprintAPI";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import  Form  from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { MdSaveAs } from "react-icons/md";
import style from './NovaSprint.module.css';
import { useAlert } from '../../componentes/Alert/AlertContext';

export function NovaSprint () {
    const { mostrarAlerta } = useAlert();
    
    const [nome, setNome] = useState('');
    const [projeto, setProjeto] = useState([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState(null);
    const [datainicio, setDataInicio] = useState('');
    const [datafim, setDataFim] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjetos = async () => {
            try{ 
                const projetos = await ProjetoAPI.listarAsync();
                setProjeto(projetos);
            }
            catch(error) {
                console.error('Erro ao buscar projetos', error);
            }
        };
        fetchProjetos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            await SprintAPI.criarAsync(nome,projetoSelecionado,datainicio, datafim);
            mostrarAlerta('Sprint cadastrada com sucesso!', 'success', () => {
                navigate('/sprints');
            });
        }
        else {
            mostrarAlerta('Por favor, preencha todos os campos.', 'warning');
        }
    };

    const isFormValid = () => {
        return nome.length >=3 && projetoSelecionado && datainicio && datafim;
    };

    return (

        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3> Nova Sprint</h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                            type = "text"
                            placeholder = "Digite o nome da sprint"
                            name="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            minLenght={3}
                            maxLenght={60}
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
                                {projeto.map((projetoEscolhido) =>(
                                    <option key={projetoEscolhido.id} value={projetoEscolhido.id}>{projetoEscolhido.nome}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formDataInicio" className="mb-3">
                            <Form.Label>Data de Inicio</Form.Label>
                            <Form.Control
                            type="date"
                            name="datainicio"
                            value={datainicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDataFim" className="mb-3">
                            <Form.Label> Data de Fim </Form.Label>
                            <Form.Control
                            type="date"
                            name="datafim"
                            value={datafim}
                            onChange={(e) => setDataFim(e.target.value)}
                            required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" >
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