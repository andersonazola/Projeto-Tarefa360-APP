import { HTTPClient } from "./client";

const LoginAPI = {

    async loginAsync(email, senha) {

        try 
        {
            const usuarioLogin = {
                Email: email,
                Senha: senha
            };
            const response = await HTTPClient.post(`/api/Login`, usuarioLogin);
            return response;

        }
        catch (error) 
        {
            console.error("Erro ao fazer login", error);
            throw error;
        }
    }
}

export default LoginAPI;