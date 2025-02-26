import useAuth from '../../hooks/useAuth'
import styles from './logout.module.css'

function Logout() {
    const {signOut} = useAuth()

    return (
        <button className={styles.logoutButton} onClick={signOut}>Log ud</button>
    )
}

export default Logout