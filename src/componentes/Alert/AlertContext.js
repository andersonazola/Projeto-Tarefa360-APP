import React, { createContext, useContext, useRef, useState } from 'react';
import { Alert } from './Alert';

const AlertContext = createContext();


export function AlertProvider({ children }) {
    const [alerta, setAlerta] = useState({
        visivel: false,
        mensagem: '',
        tipo: 'success',
        aoConfirmar: null
    });

    const timerRef = useRef(null)

    // Abre o alerta (fica fixo até clicar no OK)
    const mostrarAlerta = (mensagem, tipo = 'success', aoConfirmar = null) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        
        setAlerta({
            visivel: true,
            mensagem: mensagem,
            tipo: tipo
        });

        timerRef.current = setTimeout(() => {
            setAlerta({
                visivel: false,
                mensagem: '',
                tipo: 'success'
            });

            if (aoConfirmar){
                aoConfirmar();
            }
        }, 2000);        
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