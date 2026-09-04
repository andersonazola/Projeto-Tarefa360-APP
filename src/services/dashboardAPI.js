import  {HTTPClient} from "./client";

const DashboardAPI = {
    async obterAsync(projetoId){
        try {
            const response = await HTTPClient.get(`/api/Dashboard/Obter/${projetoId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter dados do dashboard:", error);
            throw error;
        }
    }
};

export default DashboardAPI;