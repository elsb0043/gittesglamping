import { useFetchReviews } from '../../hooks/useFetchReviews'
import styles from './reviews.module.css'

function Reviews() {
    const { reviews } = useFetchReviews()

    return (
        <div className={styles.udtalelserContainer}>
            <div className={styles.udtalelser}>
                <h2>Vores gæster udtaler</h2>
                <div className={styles.udtalelserContent}>
                {reviews.map(review => 
                    <div key={review._id} className={styles.udtalelserColumns}>
                        <div className={styles.udtalelserText}>
                            <h3>{review.name}, {review.age} år</h3>
                            <h3>Har været på {review.stay}</h3>
                            <p>{review.review}</p>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default Reviews