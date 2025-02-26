import { Link } from "react-router-dom"
import styles from './stay.module.css'
import { useFetchStays } from "../../hooks/useFetchStays"

function StayPackage() {
    const { stays } = useFetchStays()

    return (
        <div className={styles.stayPakkerContent}>
            <div className={styles.stays}>
                {stays.map(st =>
                <div key={st._id} className={styles.stay}>
                    <div className={styles.stayPakkerText}>
                        <h2>{st.title}</h2>
                        <p>{st.numberOfPersons} personer</p>
                        <p>Fra {st.price},-</p>
                    </div>
                    <div className={styles.imgDiv}>
                        <img src={st.image} alt={st.title} />
                    </div>
                    <div className={styles.læsMereButton}>
                        <Link to={`/stay/${st._id}`} className={styles.linkBtn}>Læs mere</Link>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default StayPackage