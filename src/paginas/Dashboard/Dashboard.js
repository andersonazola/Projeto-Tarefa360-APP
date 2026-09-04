import { useEffect, useState } from 'react';
import { Sidebar } from '../../componentes/Sidebar/Sidebar';
import { Topbar } from '../../componentes/Topbar/Topbar';
import CardDashboard from '../../componentes/CardDashboard/CardDashboard';
import ProjetoAPI from '../../services/projetoAPI';
import styles from './Dashboard.module.css';
import DashboardAPI from '../../services/dashboardAPI';



export function Dashboard() {
    // Guarda a lista de projetos que vem da API
    const [projetos, setProjetos] = useState([]);

    // Guarda o Id do projeto que o usuário selecionou
    const [projetoSelecionado, setProjetoSelecionado] = useState("");

    // Guarda os totais retornados pela API do dashboard
    const [dados, setDados] = useState(null);

    // Controla a exibição da mensagem de carregamento
    const [carregando, setCarregando] = useState(false);

    // Estados para guardar o resumo gerado pela IA e controlar o carregamento dela
    const [resumoIA, setResumoIA] = useState("");
    const [gerandoIA, setGerandoIA] = useState(false);

    // Função para buscar os projetos da API
    useEffect(() => {
        async function carregarListaProjetos() {
            try {
                const list = await ProjetoAPI.listarAsync();
                setProjetos(list);
            } catch (error) {
                console.error("Erro ao carregar lista de projetos:", error);
            }
        }

        carregarListaProjetos();
    }, []);

    // Executa sempre que o usuário escolher outro projeto no select
    useEffect(() => {
        if (!projetoSelecionado) {
            setDados(null);
            setResumoIA("");
            return;
        }

        async function carregarIndicadores() {
            try {
                setCarregando(true);
                setResumoIA(""); // Limpa o resumo anterior ao trocar de projeto
                const resultado = await DashboardAPI.obterAsync(projetoSelecionado);
                setDados(resultado);
            } catch (error) {
                console.error("Erro ao carregar indicadores do dashboard:", error);
                setDados(null);
            } finally {
                setCarregando(false);
            }
        }

        carregarIndicadores();
    }, [projetoSelecionado]);

    

    return (
        <Sidebar>
            <Topbar>
                <div className={styles.pagina_conteudo}>
                    <div className={styles.pagina_cabecalho}>
                        <h3>Dashboard</h3>
                    </div>

                    {/* Menu suspenso para escolher o projeto */}
                    <div className={styles.seletor_projeto}>
                        <label>Projeto:</label>
                        <select
                            className={styles.select_projeto}
                            value={projetoSelecionado}
                            onChange={(e) => setProjetoSelecionado(e.target.value)}
                        >
                            <option value="">Selecione um projeto</option>
                            {projetos.map((projeto) => (
                                <option key={projeto.id} value={projeto.id}>
                                    {projeto.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Mensagem enquanto carrega */}
                    {carregando && (
                        <p className={styles.aviso}>Carregando indicadores...</p>
                    )}

                    {/* Mensagem quando nenhum projeto foi selecionado */}
                    {!projetoSelecionado && !carregando && (
                        <p className={styles.aviso}>
                            Escolha um projeto acima para visualizar os indicadores.
                        </p>
                    )}

                    {/* Renderização dos 3 Cards e da Área de IA */}
                    {dados && !carregando && (
                        <>
                            <div className={styles.cards}>
                                <CardDashboard
                                    cor="#1b6e1b"
                                    titulo="Tarefas"
                                    total={dados.totalTarefas}
                                    concluidos={dados.tarefasConcluidas}
                                    abertos={dados.tarefasAbertas}
                                />

                                <CardDashboard
                                    cor="#0000ff"
                                    titulo="Histórias"
                                    total={dados.totalHistorias}
                                    concluidos={dados.historiasFechadas}
                                    abertos={dados.historiasAbertas}
                                />

                                <CardDashboard
                                    cor="#ff0000"                                    
                                    titulo="Bugs"
                                    total={dados.totalBugs}
                                    concluidos={dados.bugsFechados}
                                    abertos={dados.bugsAbertos}
                                />
                            </div>
                            
                        </>
                    )}
                </div>
            </Topbar>
        </Sidebar>
    );
}