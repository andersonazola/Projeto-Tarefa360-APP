import { HTTPClient } from "./client";

const TarefaAPI = {


    async obterAsync(tarefaId) {
        try {
            const response = await HTTPClient.get(`/api/Tarefa/Obter/${tarefaId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter tarefa", error);
            throw error;
        }
    },

    async listarAsync(ativo) {
        try {
            const response = await HTTPClient.get(`/api/Tarefa/Listar/?ativo=${ativo}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar tarefas");
            throw error;
        }
    },

    async listarTodas() {
        try {
            const response = await HTTPClient.get(`/api/Tarefas/ListarTodas`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar tarefas");
        }
    },

    async CriarAsync(nome, descricao, tiposTarefas, projetoId, historiaId, sprintId, usuarioId) {
        try {
            const tarefaCriar = {
                Nome: nome,
                Descricao: descricao,
                TiposTarefas: tiposTarefas,
                ProjetoId: projetoId,
                HistoriaId: historiaId,
                SprintId: sprintId,
                UsuarioId: usuarioId
            }

            const response = await HTTPClient.post(`/api/Tarefa/Criar`, tarefaCriar);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar tarefa", error);
            throw error;
        }
    },


    async AtualizarAsync(id, nome, descricao, tiposTarefas, concluida, ativa, projetoId, historiaId, sprintId, usuarioId) {
        try {
            const tarefaAtualizar = {
                Id: id,
                Nome: nome,
                Descricao: descricao,
                TiposTarefas: tiposTarefas,
                Concluida: concluida,
                Ativa: ativa,
                ProjetoId: projetoId,
                HistoriaId: historiaId,
                SprintId: sprintId,
                UsuarioId: usuarioId
            }
            const response = await HTTPClient.put(`api/Tarefa/Atualizar`, tarefaAtualizar);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar tarefa");
            throw error;
        }
    },


    async Deletar(tarefaId) {
        try {
            const response = await HTTPClient.delete(`/api/Tarefa/Deletar/${tarefaId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar tarefa", error);
            throw error;
        }
    },

    async ConcluirTarefa(id) {
        try {
            const resposta = await HTTPClient.put(`/api/Tarefa/Concluir/${id}`);
            return resposta.data;
        }
        catch (error) {
            console.error("Erro ao concluir tarefa");
            throw error;
        }

    },

    async buscaAsync(filtro) {
        try {
            const response = await HTTPClient.get(`/api/Tarefa/Busca?filtro=${filtro}`);
            return response.data;
        } 
        catch (error) {
            console.error("Erro ao buscar tarefas:", error);
            throw error;
        }
    }
}

export default TarefaAPI;