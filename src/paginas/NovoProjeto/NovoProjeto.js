import { useState } from "react";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import style from "./NovoProjeto.module.css"
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import ProjetoAPI from "../../services/projetoAPI";
import { MdSave, MdSaveAlt, MdSaveAs } from "react-icons/md"

export function NovoProjeto(){
    const [nome, setNome] =useState('');
    const [descricao, setDescricao] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            await ProjetoAPI.criarAsync(nome, descricao);
            navigate('/projetos')
        } else {
            alert ('Por favor, preencha o campo Nome!');
        }
    };

    const isFormValid = () => {
        return nome.length >= 3;
    };

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
                            <Form.Label>Descricao</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={3}
                                placeholder="Digite a descrição do projeto"
                                name="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                maxLength={500}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disablecd ={!isFormValid()} >
                             <div className = {style.botao_salvar}>
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