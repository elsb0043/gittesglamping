import useAuth from '../../hooks/useAuth'
import styles from './login.module.css'

function Login() {
    const {setEmail, setPassword, error, signIn} = useAuth()

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginContent}>
                <form className={styles.loginForm} onSubmit={signIn}>
                    {error && <p className={styles.failedLogin}>{error}</p>}
                    <input 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder='Email' 
                    />
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder='Password' 
                    />
                    <button type="submit" className={styles.loginButton}>
                        Log Ind
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login