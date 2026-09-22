import { useEffect, useState } from "react";
import ProjetoAPI from "../../services/projetoAPI";
import SprintAPI from "../../services/sprintAPI";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import { Form } from "react-bootstrap/";
import { MdSaveAs } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import style from './EditarSprint.module.css'
import { Button } from "bootstrap";
import { button } from "bootstrap"
import { useAlert } from '../../componentes/Alert/AlertContext';

export function EditarSprint() {
    const { mostrarAlerta } = useAlert();

    const location = useLocation();
    const navigate = useNavigate();

    const [id] = useState(location.state);
    const [nome, setNome] = useState('');
    const [projeto, setProjeto] = useState([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState('');
    const [datainicio, setDataInicio] = useState('');
    const [datafim, setDataFim] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            await SprintAPI.atualizarAsync(id, nome, datainicio, datafim);
            mostrarAlerta('Sprint atualizada com sucesso!', 'success', () => {
                navigate('/sprints')
            });
        }
        else {
            mostrarAlerta('Por favor, preencha todos os campos.', 'warning');
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

        const buscarDadosSprint = async () => {
            try {
                const sprint = await SprintAPI.obterAsync(id);
                setNome(sprint.nome)
                setProjetoSelecionado(sprint.projetoId)
                setDataInicio(sprint.dataInicio?.split('T')[0] ?? '');
                setDataFim(sprint.dataFim?.split('T')[0] ?? '');
            }
            catch (error) {
                console.error('Erro ao buscar dados da sprint', error);
            }
        }

        buscarProjetos();
        buscarDadosSprint();
    }, []);

    const isFormValid = () => {
        return nome.length >= 3;
    };

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Editar Sprint</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o nome da sprint"
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
                                {projeto.map((p) => (
                                    <option key={p.id} value={p.id}>{p.nome}</option>
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
                            <Form.Label>Data de Fim</Form.Label>
                            <Form.Control
                            type="date"
                            name="datafim"
                            value={datafim}
                            onChange={(e) => setDataFim(e.target.value)}
                            required
                            min={datainicio}
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
