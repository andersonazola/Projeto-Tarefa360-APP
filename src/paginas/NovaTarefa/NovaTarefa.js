import { useEffect, useEffectEvent, useState } from "react";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import style from "./NovaTarefa.module.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import tarefaAPI from "../../services/tarefaAPI";
import TarefaAPI from "../../services/tarefaAPI";


export function NovaTarefa() {
    const [nome, , setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tiposTarefas, setTiposTarefas] = useState('');
    const [projeto, setProjeto] = useState('');
    const [projetoSelecionado, setProjetoSelecionado] = useState('');
    const [historiaId, setHistoriaId] = useState('');
    const [sprintId, setSprintId] = useState('');
    const [usuarioId, setUsuarioId] = useState('');

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

        if (isFormValid() && temCaracterEspecial(nome) == false) {
            await TarefaAPI.criarAsync(nome, descricao);
            navigate('/historias')
        }
        else {
            alert('Por favor, preencha os campos Nome e Projeto.');
        }
    };

    const isFormValid = () => {
        return nome.length >= 3;
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
                                {projeto.map((projetoEscolhido) => (
                                    <option key={projetoEscolhido.id} value={projetoEscolhido.id}>{projetoEscolhido}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        
                        <Form.Group controlId="formDescricao" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Digite a descrição da historia"
                                    name="descricao"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    maxLength={500}
                                    />
                        </Form.Group>

                        <Button variant="primary" type="submit" disable={isFormValid()}>
                            <div className={style.botao_salvar}>
                                <MdSaveAs/>
                                Salvar
                            </div>
                        </Button>
                        
                    </Form>
                </div>
            </Topbar>
        </Sidebar>
    )
}

