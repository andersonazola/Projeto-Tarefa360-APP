import { HTTPClient } from "./client";

const SprintAPI = {

    async obterAsync(sprintId) {
        try {
            const response = await HTTPClient.get(`/api/Sprint/Obter/${sprintId}`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao obter sprint:", error);
            throw error;
        }
    },

    async listarAsync(ativo) {
        try {
            const response = await HTTPClient.get(`api/Sprint/Listar/?ativo=${ativo}`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao listar sprints:", error);
            throw error;
        }
    },

    async criarAsync(nome, projetoId, datainicio, datafim) {
        try {
            const sprintCriar =
            {
                Nome: nome,
                ProjetoId: projetoId,
                DataInicio: datainicio,
                DataFim: datafim
            }

            const response = await HTTPClient.post(`/api/Sprint/Criar`, sprintCriar);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao criar Sprint", error);
            throw error;
        }
    },

    async atualizarAsync(id, nome, projetoId, datainicio, datafim) {
        try {
            const sprintAtualizar =
            {
                Id: id,
                Nome: nome,
                ProjetoId: projetoId,
                DataInicio: datainicio,
                DataFim: datafim
            }
            const response = await HTTPClient.put(`/api/Sprint/Atualizar`, sprintAtualizar);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao atualizar sprint", error);
            throw error;
        }
    },

    async deletarAsync(sprintId) {
        try {
            const response = await HTTPClient.delete(`/api/Sprint/Deletar/${sprintId}`);
            return response.data;
        }
        catch (error) {
            console.error("Erro ao deletar sprint", error);
            throw error;
        }
    },

    async buscaAsync(filtro) {
        try {
            const response = await HTTPClient.get(`/api/Sprint/Busca?filtro=${filtro}`);
            return response.data;
        } 
        catch (error) {
            console.error("Erro ao buscar sprints:", error);
            throw error;
        }
    }
}

export default SprintAPI;