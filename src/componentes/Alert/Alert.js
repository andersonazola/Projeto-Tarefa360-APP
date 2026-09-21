import React from 'react';
import styles from './Alert.module.css'

export function Alert({ mensagem, tipo = 'success', visivel, onFechar}) {
    if(!visivel) return null;

    const classeTipo = styles[tipo] || styles.success;

    return (
        <div className={`${styles.alerta_container} ${classeTipo}`}>
            <span>{mensagem}</span>
            <button className={styles.botao_ok} onClick={onFechar}>
                OK
            </button>
        </div>
    )
}