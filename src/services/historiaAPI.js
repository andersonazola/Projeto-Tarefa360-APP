import { HTTPClient } from "./client";

const HistoriaAPI = {

    async obterAsync(historiaId)
    {
        try
        {
            const response = await HTTPClient.get(`/api/Historia/Obter/${historiaId}`);
            return response.data;
        }
        catch(error)
        {
            console.error("Erro ao obter história:", error);
            throw error;
        }
    },

    async listarAsync(ativo)
    {
        try
        {
            const response = await HTTPClient.get(`/api/Historia/Listar/${ativo}`);
            return response.data;
        }
        catch(error)
        {
            console.error("Erro ao listar histórias:", error);
            throw error;
        }
    },

    async criarAsync(nome, projeto, descricao)
    {
        try
        {
            const historiaCriar = {
                Nome: nome,
                Projeto: projeto,
                Descricao: descricao
            }

            const response = await HTTPClient.post('/api/Historia/Criar', historiaCriar);
            return response.data;
        }
        catch(error)
        {
            console.error("Erro ao criar história", error);
            throw error;
        }
    },

    async atualizarAsync(id, nome, projetoId, descricao)
    {
        try
        {
            const historiaAtualizar = {
                Id: id,
                Nome: nome,
                ProjetoId: projetoId,
                Descricao: descricao
            }

            const response = await HTTPClient.put('/api/Historia/Atualizar', historiaAtualizar);
            return response.data;
        }
        catch(error)
        {
            console.error("Erro ao atualizar história", error);
            throw error;
        }
    },

    async deletarAsync(historiaId)
    {
        try
        {
            const response = await HTTPClient.delete(`/api/Historia/Deletar/${historiaId}`);
            return response.data;
        }
        catch(error)
        {
            console.error("Erro ao deletar história", error);
            throw error;
        }
    }
}