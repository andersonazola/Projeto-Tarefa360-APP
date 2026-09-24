import React from 'react';
import styles from './Alert.module.css'

export function Alert({ mensagem, tipo = 'success', visivel, onFechar}) {
    if(!visivel) return null;

    const classeTipo = styles[tipo] || styles.success;

    return (
        <div 
            className={`${styles.alerta_container} ${classeTipo}`}
            onClick={onFechar}
            title="Clique para fechar"
            style={{cursor: 'pointer'}}
        >
            <span>{mensagem}</span>
        </div>    
    );
}