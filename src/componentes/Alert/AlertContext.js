import React, { createContext, useContext, useState } from 'react';
import { Alert } from './Alert';

const AlertContext = createContext();


export function AlertProvider({ children }) {
    const [alerta, setAlerta] = useState({
        visivel: false,
        mensagem: '',
        tipo: 'success',
        aoConfirmar: null
    });

    // Abre o alerta (fica fixo até clicar no OK)
    const mostrarAlerta = (mensagem, tipo = 'success', aoConfirmar = null) => {
        setAlerta({
            visivel: true,
            mensagem: mensagem,
            tipo: tipo,
            aoConfirmar: aoConfirmar
        });

        
    };

    // Fecha o alerta ao clicar no OK
    const fecharAlerta = () => {
        const acao = alerta.aoConfirmar;

        setAlerta({
            visivel: false,
            mensagem: '',
            tipo: 'success',
            aoConfirmar: null
        });

        if (acao) {
            acao();
        }
    };

    return (
        <AlertContext.Provider value={{ mostrarAlerta }}>
            {children}
            <Alert
                visivel={alerta.visivel}
                mensagem={alerta.mensagem}
                tipo={alerta.tipo}
                onFechar={fecharAlerta}
            />
        </AlertContext.Provider>
    );
}
export function useAlert() {
    return useContext(AlertContext);
}