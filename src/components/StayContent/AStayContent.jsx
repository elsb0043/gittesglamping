import { useFetchStays } from '../../hooks/useFetchStays'
import styles from './ophold.module.css'

function AStayContent({ description, includes, price }) {
    const { stays } = useFetchStays()

    return (
        <div className={styles.aStayContainer}>
            {stays?.map(st => 
                <div key={st._id} className={styles.aStayContent}>
                    <div className={styles.aStayText}>
                        <h2>Tag væk en weekend, med én du holder af</h2>
                        <p>{st.description}</p>
                    </div>

                    <div className={styles.aStayBundle}>
                        <p>{st.includes}</p>
                        <h3>Pris {st.price},-</h3>
                    </div>

                    <button type="submit" className={styles.bookButton}>Book nu</button>
                </div>
            )}
        </div>
    )
}

export default AStayContent