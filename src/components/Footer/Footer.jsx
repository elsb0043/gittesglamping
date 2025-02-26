import styles from './footer.module.css'
import { icons } from "../../services/Icons"

function Footer() {

    return (
        <footer>
            <div className={styles.footerContent}>
                <div className={styles.footerSocials}>
                    <div className={styles.footerIcons}>{icons['Facebook']}</div>
                    <div className={styles.footerIcons}>{icons['Instagram']}</div>
                </div>
                <div className={styles.footerInfo}>
                    <img className={styles.footerLogo} src="/assets/img/logo/logo.png" alt="Logo" />
                    <h3>Gittes Glamping</h3>
                </div>
            </div>
        </footer>
    )
}

export default Footer