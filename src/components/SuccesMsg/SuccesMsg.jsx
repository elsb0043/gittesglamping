import styles from './succes.module.css'
import { Link } from 'react-router-dom'

function SuccesMsg() {

    return (
        <div className={styles.succesContainer}>
            <div className={styles.succesText}>
                <p>Hej Lars,</p>
                <p>Tak for din besked!</p>
                <p>Du hører fra os snarest.</p>
            </div>

            <div className={styles.tilbageButton}>
                <Link to='/' className={styles.linkBtn}>Tilbage</Link>
            </div>
        </div>
    )
}

export default SuccesMsg