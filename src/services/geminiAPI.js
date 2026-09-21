import axios from "axios";

const GEMINI_API_KEY = "AQ.Ab8RN6K9FsLVte9JD1pPRkoDQhrPsvJwujXR2jB5k6lwmt1NZA";

const GeminiAPI = {
    async gerarResumoDashboardAsync(nomeProjeto, dados) {
        try {
            const prompt = `
Você é um especialista em gestão ágil de projetos (Scrum Master).
Analise os seguintes dados do projeto "${nomeProjeto}":
- Total de Horas: ${dados.totalHoras} (Concluídas: ${dados.horasConcluidas}, Abertas: ${dados.horasAbertas})
- Total de Histórias: ${dados.totalHistorias} (Fechadas: ${dados.historiasFechadas}, Abertas: ${dados.historiasAbertas})
- Total de Bugs: ${dados.totalBugs} (Fechados: ${dados.bugsFechados}, Abertos: ${dados.bugsAbertos})

Por favor, faça um resumo executivo bem direto em no máximo 3 ou 4 linhas:
1. Avalie o ritmo atual do projeto.
2. Destaque um ponto de atenção (especialmente sobre os bugs em aberto).
3. Dê uma recomendação rápida para o time e não use emojis.
4. Monte em tópicos por linhas.
Seja encorajador, profissional nos tópicos.
`;


            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${GEMINI_API_KEY}`;

            const corpoRequisicao = {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            };

            const resposta = await axios.post(url, corpoRequisicao);
            return resposta.data.candidates[0].content.parts[0].text;

        } catch (error) {
            console.error("Erro detalhado da API Gemini:", error?.response?.data || error);
            throw error;
        }
    }
};

export default GeminiAPI;