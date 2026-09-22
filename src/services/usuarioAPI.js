import { HTTPClient } from "./client";

const UsuarioAPI = {

    async obterAsync(usuarioId, usuarioLoginId) {
        try {
            const response = await HTTPClient.get(`/Usuario/obter/${usuarioId}`, {
                headers: { "Usuario-Id": usuarioLoginId }
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao obter usuário:", error);
            throw error;
        }
    },

    async listarAsync(ativos, usuarioLoginId) {
        try {
            const response = await HTTPClient.get(`/Usuario/Listar?ativos=${ativos}`, {
                headers: { "Usuario-Id": usuarioLoginId }
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            throw error;
        }
    },

    async criarAsync(nome, email, senha, tipoUsuario, usuarioLoginId) {
        try {
            const usuarioCriar = {
                Nome: nome,
                Email: email,
                Senha: senha,
                TipoUsuario: Number(tipoUsuario)
            };
            const response = await HTTPClient.post(`/Usuario/Criar`, usuarioCriar, {
                headers: { "Usuario-Id": usuarioLoginId }
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            throw error;
        }
    },

    async atualizarAsync(id, nome, email, tipoUsuario, usuarioLoginId) {
        try {
            const usuarioAtualizar = {
                Id: id,
                Nome: nome,
                Email: email,
                TipoUsuario: Number(tipoUsuario)
            };
            const response = await HTTPClient.put(`/Usuario/Atualizar`, usuarioAtualizar, {
                headers: { "Usuario-Id": usuarioLoginId }
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw error;
        }
    },

    async deletarAsync(usuarioId, usuarioLoginId) {
        try {
            const response = await HTTPClient.delete(`/Usuario/Deletar/${usuarioId}`, {
                headers: { "Usuario-Id": usuarioLoginId }
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            throw error;
        }
    },


    async listarTiposUsuarioAsync() {
        try {
            const response = await HTTPClient.get(`/Usuario/ListarTiposUsuario`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar tipos de usuários:", error);
            throw error;
        }
    },


    async alterarSenhaAsync(id, senha, senhaAntiga, usuarioLoginId) {
        try {
            const usuarioAlterarSenha = {
                Id: id,
                Senha: senha,
                SenhaAntiga: senhaAntiga
            };
            const response = await HTTPClient.put(`/Usuario/AlterarSenha`, usuarioAlterarSenha, {
                headers: { "Usuario-Id": usuarioLoginId }
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao alterar senha do usuário:", error);
            throw error;
        }
    },


    async restaurarAsync(usuarioId, usuarioLoginId) {
        try {
            const response = await HTTPClient.put(`/Usuario/Restaurar/${usuarioId}`, null, {
                headers: { "Usuario-Id": usuarioLoginId }
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao restaurar usuário:", error);
            throw error;
        }
    },

    async buscaAsync(filtro, usuarioLoginId) {
        try {
            const response = await HTTPClient.get(`/Usuario/Busca?filtro=${filtro}`,{
                headers: {"Usuario-Id": usuarioLoginId}
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            throw error;
        }
    }

}

export default UsuarioAPI;