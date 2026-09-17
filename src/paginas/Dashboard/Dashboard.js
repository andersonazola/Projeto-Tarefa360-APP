import { useEffect, useState } from 'react';
import { Sidebar } from '../../componentes/Sidebar/Sidebar';
import { Topbar } from '../../componentes/Topbar/Topbar';
import CardDashboard from '../../componentes/CardDashboard/CardDashboard';
import ProjetoAPI from '../../services/projetoAPI';
import DashboardAPI from '../../services/dashboardAPI';
import GeminiAPI from '../../services/geminiAPI';
import styles from './Dashboard.module.css';

export function Dashboard() {
    const [projetos, setProjetos] = useState([]);
    const [projetoSelecionado, setProjetoSelecionado] = useState("");
    const [dados, setDados] = useState(null);
    const [carregando, setCarregando] = useState(false);

    // Estados da IA
    const [resumoIA, setResumoIA] = useState("");
    const [gerandoIA, setGerandoIA] = useState(false);

    // Carrega a lista de projetos para o select ao abrir a tela
    useEffect(() => {
        async function carregarListaProjetos() {
            try {
                const list = await ProjetoAPI.listarAsync();
                setProjetos(list);

                if (list && list.length > 0) {
                    setProjetoSelecionado(list[0].id);
                }
            } catch (error) {
                console.error("Erro ao carregar lista de projetos:", error);
            }
        }
        carregarListaProjetos();
    }, []);

    // Busca indicadores toda vez que trocar o projeto selecionado
    useEffect(() => {
        if (!projetoSelecionado) {
            setDados(null);
            setResumoIA("");
            return;
        }

        async function carregarIndicadores() {
            try {
                setCarregando(true);
                setResumoIA("");
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

    // Função para chamar o Gemini
    async function gerarAnaliseIA() {
        const projetoAtual = projetos.find(p => p.id == projetoSelecionado);
        const nomeProjeto = projetoAtual ? projetoAtual.nome : "Projeto";

        try {
            setGerandoIA(true);
            const resumo = await GeminiAPI.gerarResumoDashboardAsync(nomeProjeto, dados);
            setResumoIA(resumo);
        } catch (error) {
            setResumoIA("Não foi possível gerar o resumo com IA no momento. Tente novamente.");
        } finally {
            setGerandoIA(false);
        }
    }

    return (
        <Sidebar>            
            <Topbar
                childrenTopo={
                    <div className={styles.seletor_topo}>
                        <label className={styles.label_topo}>Projeto:</label>
                        <select
                            className={styles.select_topo}
                            value={projetoSelecionado}
                            onChange={(e) => setProjetoSelecionado(e.target.value)}
                        >
                            <option value="">Selecione um projeto...</option>
                            {projetos.map((projeto) => (
                                <option key={projeto.id} value={projeto.id}>
                                    {projeto.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                }
            >
                <div className={styles.pagina_conteudo}>
                    
                    
                    <div className={styles.pagina_cabecalho}>
                        <h3>Visão Geral</h3>
                    </div>

                    
                    {carregando && (
                        <p className={styles.aviso}>Carregando indicadores...</p>
                    )}

                    {!projetoSelecionado && !carregando && (
                        <p className={styles.aviso}>
                            Selecione um projeto no topo da tela para visualizar os indicadores.
                        </p>
                    )}

                    
                    {dados && !carregando && (
                        <>
                            {/* Linha superior: Os 3 cards principais */}
                            <div className={styles.cards}>
                                <CardDashboard
                                    cor="#5FA875"
                                    titulo="Horas"
                                    total={`${dados.totalHoras}h`}
                                    concluidos={`${dados.horasConcluidas}h`}
                                    abertos={`${dados.horasAbertas}h`}
                                />

                                <CardDashboard
                                    cor="#7B7BC9"
                                    titulo="Histórias"
                                    total={dados.totalHistorias}
                                    concluidos={dados.historiasFechadas}
                                    abertos={dados.historiasAbertas}
                                />

                                <CardDashboard
                                    cor="#D9756A"
                                    titulo="Bugs"
                                    total={dados.totalBugs}
                                    concluidos={dados.bugsFechados}
                                    abertos={dados.bugsAbertos}
                                />
                            </div>

                            
                            <div className={styles.area_ia}>
                                <div className={styles.ia_cabecalho}>
                                    <h4>Resumo do Projeto</h4>
                                    <button
                                        className={styles.botao_ia}
                                        onClick={gerarAnaliseIA}
                                        disabled={gerandoIA}
                                    >
                                        {gerandoIA ? "Analisando..." : "Gerar Análise com IA"}
                                    </button>
                                </div>

                                <div className={styles.caixa_resumo_ia}>
                                    {resumoIA ? (
                                        <p>{resumoIA}</p>
                                    ) : (
                                        <p className={styles.texto_placeholder}>
                                            Clique no botão para que a inteligência artificial analise os dados.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </Topbar>
        </Sidebar>
    );
}