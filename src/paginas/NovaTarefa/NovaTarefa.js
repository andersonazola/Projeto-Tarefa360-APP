import { useEffect, useState } from "react";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import style from "./NovaTarefa.module.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import TarefaAPI from "../../services/tarefaAPI";
import ProjetoAPI from "../../services/projetoAPI";
import HistoriaAPI from "../../services/historiaAPI";
import SprintAPI from "../../services/sprintAPI";
import UsuarioAPI from "../../services/usuarioAPI";
import { MdSaveAs } from 'react-icons/md';


const tipos_tarefas = [
    {valor: 0, nome: 'Desenvolvimento'},
    {valor: 1, nome: 'Bug'}, 
    {valor: 2, nome: 'Documentação'},
    {valor: 3, nome: 'Análise'},
];


export function NovaTarefa() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [projeto, setProjeto] = useState([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState('');
    const [historia, setHistoria] = useState([]);
    const [historiaSelecionada, setHistoriaSelecionada] = useState('');
    const [sprint, setSprint] = useState([]);
    const [sprintSelecionada, setSprintSelecionada] = useState('');
    const [tipoTarefaSelecionada, setTipoTarefaSelecionada] = useState('');
    const [usuario, setUsuario] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const buscarProjetos = async () => {
            try {
                const projetos = await ProjetoAPI.listarAsync(true);
                setProjeto(projetos);
            }
            catch (error) {
                console.error('Erro ao buscar projetos', error);
            }
        };

        const buscarHistoria = async () => {
            try {
                const historias = await HistoriaAPI.listarAsync(true);
                setHistoria(historias);
            }
            catch (error) {
                console.error('Erro ao buscar historias', error);
            }
        };

        const buscarSprints = async () => {
            try {
                const sprints = await SprintAPI.listarAsync(true)
                setSprint(sprints);
            }
            catch (error) {
                console.error('Erro ao buscar sprints', error);
            }
        };

        const buscarUsuarios = async () => {
            try {
                const usuarios = await UsuarioAPI.listarAsync(true);
                setUsuario(usuarios);
            }
            catch (error) {
                console.error('Erro ao buscar usuarios', error);
            }
        };

        buscarProjetos();
        buscarHistoria();
        buscarSprints();
        buscarUsuarios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid() && temCaracterEspecial(nome) === false) {
            await TarefaAPI.CriarAsync(
                nome,
                descricao,
                Number(tipoTarefaSelecionada),
                projetoSelecionado,
                historiaSelecionada,
                sprintSelecionada,
                usuarioSelecionado
            );
            navigate('/tarefas');
        }
        else {
            alert('Por favor, preencha os campos Nome e Projeto.');
        }
    };

    const isFormValid = () => {
        return nome.length >= 3 && projetoSelecionado !== '';
    };

    const temCaracterEspecial = (nome) => {
        const regex = /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`;]/;
        return regex.test(nome);
    };

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Nova Tarefa</h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o nome da tarefa"
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
                                value= {projetoSelecionado}
                                onChange={(e) => setProjetoSelecionado(e.target.value)}
                                required
                            >
                                <option value="">Selecione um projeto</option>
                                {projeto.map((projetoEscolhido) => (
                                    <option key={projetoEscolhido.id} value={projetoEscolhido.id}>
                                        {projetoEscolhido.nome}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <div className={style.linha_dupla}>
                            <Form.Group controlId="formHistoria" className="mb-3">
                                <Form.Label>Historia</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="historia"
                                    value={historiaSelecionada}
                                    onChange={(e) => setHistoriaSelecionada(e.target.value)}
                                >
                                    <option value="">Seleciona uma historia</option>
                                    {historia.map((historiaEscolhia) => (
                                        <option key={historiaEscolhia.id} value={historiaEscolhia.id}>
                                            {historiaEscolhia.nome}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formSprint" className="mb-3">
                                <Form.Label>Sprint</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="sprint"
                                    value={sprintSelecionada}
                                    onChange={(e) => setSprintSelecionada(e.target.value)}
                                >
                                    <option value="">Seleciona uma sprint</option>
                                    {sprint.map((sprintEscolhida) => (
                                        <option key={sprintEscolhida.id} value={sprintEscolhida.id}>
                                            {sprintEscolhida.nome}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </div>

                        <Form.Group controlId="formDescricao" className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Digite a descrição da tarefa"
                                className={style.descricao_caixa_alta}
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                maxLength={500}
                            />
                        </Form.Group>

                        <div className={style.linha_dupla}>
                            <Form.Group controlId="formTipo" className="mb-3">
                                <Form.Label>Tipo da Tarefa</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="tipoTarefa"
                                    value={tipoTarefaSelecionada}
                                    onChange={(e) => setTipoTarefaSelecionada(e.target.value)}
                                >
                                    <option value=""> Selecione o tipo de Tarefa</option>
                                    {tipos_tarefas.map((tipo)=>(
                                        <option key={tipo.valor} value={tipo.valor}>
                                            {tipo.nome}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formUsuario" className="mb-3">
                                <Form.Label>Usuário</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="usuario"
                                    value={usuarioSelecionado}
                                    onChange={(e) => setUsuarioSelecionado(e.target.value)}
                                >
                                    <option value="">Seleciona o Usuário</option>
                                    {usuario.map((usuarioEscolhida) => (
                                        <option key={usuarioEscolhida.id} value={usuarioEscolhida.id}>
                                            {usuarioEscolhida.nome}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </div>

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