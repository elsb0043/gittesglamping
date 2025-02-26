import styles from './stay.module.css'
import StayPakke from "./StayPackage"

function StayPackages() {

    return (
        <div className={styles.stayPakkerContainer}>
            <StayPakke />
        </div>
    )
}

export default StayPackages