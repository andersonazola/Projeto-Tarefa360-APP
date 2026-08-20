import style from "./EditarProjeto.module.css"
import { Sidebar } from "../../componentes/Sidebar/Sidebar"
import { Topbar } from "../../componentes/Topbar/Topbar"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import ProjetoAPI from "../../services/projetoAPI";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

export function EditarProjeto() {
    const location = useLocation();
    const navigate = useNavigate();

    const [id] = useState(location.state);
    const [nome, setNome]= useState('');
    const [descricao, setDescricao] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();
    await ProjetoAPI.atualizarAsync(nome, descricao);
    navigate('/projetos')
    };

    useEffect(() => {
        const buscarDadosProjeto = async () => {
            try {
                const projeto = await ProjetoAPI.obterAsync(id);
                setNome(projeto.nome)
                setDescricao(projeto.descricao)
            } catch (error) {
                console.error('Erro ao buscar dados do projeto:', error);
            }
        }
        buscarDadosProjeto();
    }, [id]);
 

    return (
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Projetos</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                                type="text"
                                placeholder="Digite o nome do projeto"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                minLength={3}
                                maxLength={100}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescricao" className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={3}
                                placeholder="Digite a descricao do projeto"
                                name="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                maxLength={500}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Salvar
                        </Button>
                    </Form>
                </div>
            </Topbar>
        </Sidebar>
    )
}