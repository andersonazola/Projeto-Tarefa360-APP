import {HTTPClient} from ".client";

const ProjetoAPI = {
    //GET - Busca 1 único projeto pelo ID
    async obterAsync(projetoId){
        try {
            const response = await HTTPClient.get('/api/Projeto/Obter${projetoId}');
            return response.data;
        } catch (error) {
            console.error("Erro ao obter projeto:", error);
            throw error;
        }
    },

     //GET - Lista todos os projetos
    async listarAsync(){
        try {
            const response = await HTTPClient.get('/api/Projeto/Listar');
            return response.data;
        } catch (error){
            console.error("Erro ao listar projetos:", error);
            throw error;
        }
    },

    //POST - Cria um novo projeto
    async criarAsync(nome, descricao){
        try {
            const projetoCriar = {
                Nome: nome,
                Descricao: descricao
            };
            const response = await HTTPClient.post('/api/Projeto/Criar', projetoCriar);
            return response.data;
        } catch (error){
            console.error("Erro ao criar projeto:", error);
            throw error;
        }
    },

    //PUT - Atualiza um projeto existente
    async atualizarAsync (id, nome, descricao){
        try {
            const projetoAtualizar = {
                Id: id,
                Nome: nome,
                Descricao: descricao
            };
            const response = await HTTPClient.put('api/Projeto/Atualizar', projetoAtualizar);
            return response.data;
        } catch (error){
            console.error("Erro ao atualizar projeto:", error);
            throw error;
        }
    },

    //DELETE - Deleta um projeto pelo ID
    async deletarAsync(projetoId){
        try {
            const response = await HTTPClient.delete('/api/Projeto/Deletar/${projetoId}');
            return response.data;
        } catch (error){
            console.error("Erro ao deletar projeto:", error);
            throw error;
        }
    },
}

export default ProjetoAPI;