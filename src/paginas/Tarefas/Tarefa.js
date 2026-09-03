import { useEffect, useState } from "react";
import HistoriaAPI from "../../services/historiaAPI";
import { Sidebar } from "../../componentes/Sidebar/Sidebar";
import { Topbar } from "../../componentes/Topbar/Topbar";
import { MdEdit, MdDelete } from "react-icons/md"
import { Button, FormGroup, Modal } from "react-bootstrap";
import ProjetoAPI from "../../services/projetoAPI";
import Form from 'react-bootstrap/Form';
import style from './Historias.module.css';
import { ModalBody, ModalFooter, ModalHeader, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import TarefaAPI from "../../services/tarefaAPI";
import { Usuarios } from "../Usuarios/Usuarios";


export function Tarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [mostraModal, setMostraModal] = useState([]);
    const [tarefaSelecionada, setTarefaSelecionada] = useState(false);
    const [busca, setBusca] = useState ("");
    const [projeto, setProjeto] = useState([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState('');
    const [historia, setHistoria] = useSate([]);
    const [historiaSelecionada, setHistoriaSelecionada] = useState('');
    const [sprint, setSprint] = useSate([]);
    const [sprintSelecionada, setSprintSelecionada] = useState('');
    const [usuario, setUsuario] = useState([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
    const [tarefasFiltro, setTarefasFiltro] = useState([]);


    const handleClickDeletar = (tarefa) =>{
        setTarefaSelecionada(tarefa);
        setMostraModal(true);
    };

    const handleClickDeletar = async () => {
        try{
            await TarefaAPI.deletarAsync(tarefaSelecionada.id);
            setTarefas(tarefas.filter(t => t.id !== tarefaSelecionada.id));
        }
        catch(error){
            console.error("Erro ao deletar tarefa:", error)
        } finally{
            handleFecharModal();
        }
    }

    const handleFecharModal = () =>{
        setMostraModal(false);
        setTarefaSelecionada(null);
    };


    async function carregarTarefas(){
        try{
            const listarTarefas = await TarefaAPI.listarAsync(true);
            setTarefas(listarTarefas);
        }catch (error){
            console.error("Erro ao carregar tarefas:", error)
        }
    }

    async function buscarProjetos(){
        try{
            const projetos = await TarefaAPI.listarAsync();
            setProjeto(projetos);
        }
        catch(error){
            console.error('Erro ao buscar projetos:', error);
        }
    }

    useEffect(() => {
        carregarTarefas();
        buscarProjetos();
    }, []);


    const tarefasFiltradas = tarefas.filter((tarefas) => {
        const buscatarefas = tarefas.nome.toLowerCase().includes(busca.toLowerCase());
        const filtroProjeto = projetoSelecionado == '' || tarefas.projetoId == projetoSelecionado;
        const filtroHistoria = historiaSelecionada == '' || tarefas.HistoriaId == historiaSelecionada;
        const filtroSprint = sprintSelecionada == '' || tarefas.sprintId == sprintSelecionada;
        const filtroUsuario = usuarioSelecionado == '' || tarefas.usuarioId == usuarioSelecionado;
        return 
    
    
    })


}