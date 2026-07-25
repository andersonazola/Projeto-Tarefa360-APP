import { HTTPClient } from "./client";

const UsuarioAPI = {
    //GET
    async obterAsync(usuarioId) {
        try {
            const response = await HTTPClient.get(`/Usuario/obter/${usuarioId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter usuário:", error);
            throw error;
        }
    },
    //GET
    async listarAsync(ativos) {
        try {
            const response = await HTTPClient.get(`/Usuario/Listar?ativos=${ativos}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            throw error;
        }
    },
    //POST
    async criarAsync(nome, email, senha) {
        try {
            const usuarioCriar = {
                Nome: nome,
                Email: email,
                Senha: senha
            };
            const response = await HTTTPClient.post(`/Usuario/Criar`, usuarioCriar);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            throw error;
        }
    },
    //PUT
    async atualizarAsync(id, nome, email) {
        try {
            const usuarioAtualizar = {
                Id: id,
                Nome: nome,
                Email: email
            };
            const response = await HTTPClient.put(`/Usuario/Atualizar`, usuarioAtualizar);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw error;
        }
    },
    //DELETE
    async deletarAsync(usuarioId) {
        try {
            const response = await HTTPClient.delete(`/UsuarioDeletar/${usuarioId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            throw error;
        }
    },

    //GET 
    async listarTiposUsuarioAsync() {
        try {
            const response = await HTTPClient.get(`/Usuario/ListarTiposUsuario`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar tipos de usuários:", error);
            throw error;
        }
    },

    //PUT

    async alterarSenhaAsync(id, senha, senhaAntiga) {
        try {
            const usuarioAlterarSenha = {
                Id: id,
                Senha: senha,
                SenhaAntiga: senhaAntiga
            };
            const response = await HTTPClient.put(`/Usuario/AlterarSenha`, usuarioAlterarSenha);
            return response.data;
        } catch (error) {
            console.error("Erro ao alterar senha do usuário:", error);
            throw error;
        }
    },

    //PUT
    async restaurarAsync(usuarioId) {
        try {
            const response = await HTTPClient.put(`/Usuario/Restaurar/${usuarioId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao restaurar usuário:", error);
            throw error;
        }
    },

}

export default UsuarioAPI;