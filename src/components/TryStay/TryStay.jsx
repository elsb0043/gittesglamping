import styles from './try.module.css'

function TryStay({title, text}) {

    return (
        <div className={styles.prøvOphold}>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    )
}

export default TryStay