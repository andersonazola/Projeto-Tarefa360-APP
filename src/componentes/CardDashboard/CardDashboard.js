import styles from './CardDashboard.module.css';

function CardDashboard({ titulo, total, concluidos, abertos, cor }) {
    return (
        <div className={styles.card} style={{ backgroundColor: cor }}>
            {/* Topo do card com nome do indicador */}
            <div className={styles.cabecalho}>                
                <h4 className={styles.titulo}>{titulo}</h4>
            </div> 

            {/* Número que representa o total geral */}
            <p className={styles.total}>{total}</p>

            <hr className={styles.divisor} />

            {/* Rodapé do card com Concluídos e Abertos */}
            <div className={styles.detalhes}>
                <div className={styles.item_detalhe}>
                    <span className={styles.label}>Concluídos</span>
                    <span className={styles.valor_concluidos}>{concluidos}</span>
                </div>
                <div className={styles.item_detalhe}>
                    <span className={styles.label}>Abertos</span>
                    <span className={styles.valor_abertos}>{abertos}</span>
                </div>
            </div>
        </div>
    );
}

export default CardDashboard;