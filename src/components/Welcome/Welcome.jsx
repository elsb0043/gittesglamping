import { Link } from 'react-router-dom'
import styles from './welcome.module.css'

function Welcome() {

    return (
        <div className={styles.komOgPrøv}>
            <div className={styles.prøvContainer}>
                <div className={styles.prøvContent}>
                    <h2>Kom og prøv glamping hos Gitte!</h2>
                    <div className={styles.prøvPImg}>
                        <p>Vi er stolte af at byde dig velkommen til Gitte’s Glamping, hvor hjertevarme og omsorg møder naturens skønhed og eventyr. Vores dedikerede team, anført af Gitte selv, er her for at skabe den perfekte ramme om din luksuriøse udendørsoplevelse. Vi stræber efter at skabe minder og fordybelse, uanset om du besøger os som par, familie eller soloeventyrer. Vi tilbyder en bred vifte af aktiviteter og arrangementer, der passer til alle aldre og interesser. Udforsk naturen, slap af ved bålet, del historier med nye venner, eller find indre ro med vores wellnessaktiviteter.</p>
                        <img src="/assets/img/gitte.jpg" />
                    </div>
                    <Link to='/stay' className={styles.seOpholdButton}>Se vores ophold</Link>
                </div>
            </div>
        </div>
    )
}

export default Welcome