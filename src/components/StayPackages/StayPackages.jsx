import styles from './stay.module.css'
import StayPackage from './StayPackage'

function StayPackages() {

    return (
        <div className={styles.stayPakkerContainer}>
            <StayPackage />
        </div>
    )
}

export default StayPackages