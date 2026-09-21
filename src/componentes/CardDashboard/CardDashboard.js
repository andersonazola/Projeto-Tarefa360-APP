import styles from './CardDashboard.module.css';

//Importa os arquivos .svg
import fundoHoras from '../../assets/card-horas.svg';
import fundoHistorias from '../../assets/card-historias.svg';
import fundoBugs from '../../assets/card-bugs.svg';

function CardDashboard({ titulo, total, concluidos, abertos }) {

    //Variáveis para guardar os fundos e textos que serão exibidos no card.
    let imagemFundo = fundoHoras;
    let textoConcluidos = "Concluídos";
    let textoAbertos = "Abertas";

    //Se for Histórias, altera o fundo e os textos
    if (titulo === "Histórias") {
        imagemFundo = fundoHistorias;
        textoConcluidos = "Concluídas";
        textoAbertos = "Abertas";
    }

    //Se for Bugs, altera o fundo e os textos
    if (titulo === "Bugs") {
        imagemFundo = fundoBugs;
        textoConcluidos = "Fechados";
        textoAbertos = "Abertos";
    }

    //Se for Horas, altera o fundo e os textos
    if (titulo === "Horas") {
        imagemFundo = fundoHoras;
        textoConcluidos = "Entregues";
        textoAbertos = "Restantes";
    }

    return (
        <div
            className={styles.card}
            style={{ backgroundImage: `url(${imagemFundo})` }}
        >
            {/* Topo do card */}
            <div className={styles.topo}>
                <h4 className={styles.titulo}>{titulo}</h4>
                <span className={styles.total_topo}>{total}</span>
            </div>

            {/* Conteudo do card */}
            <div className={styles.conteudo}>

                {/* Colunas de informações */}
                <div className={styles.colunas_detalhes}>
                    <div className={styles.item_detalhe}>
                        <span className={styles.label}>{textoConcluidos}</span>
                        <span className={styles.valor_concluidos}>{concluidos}</span>
                    </div>
                    <div className={styles.item_detalhe}>
                        <span className={styles.label}>{textoAbertos}</span>
                        <span className={styles.valor_abertos}>{abertos}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDashboard;