import styles from './contact.module.css'
import { Link } from 'react-router-dom'

function Contact() {

    return (
        <div className={styles.kontaktContainer}>
            <div className={styles.kontaktContent}>
                <div className={styles.kontaktText}>
                    <h2>Vil du booke et ophold? Eller har du blot et spørgsmål?</h2>
                    <p>Så tøv ikke med at tage kontakt til os herunder. 
                    Vi bestræber os på at svare på henvendelser indenfor 24 timer, men op til ferier kan der være travlt, og svartiden kan derfor være op til 48 timer.</p>
                </div>
                
                <form className={styles.contactForm}>
                    <div className={styles.label}>
                        <p>Navn</p>
                        <input
                            required
                            type="text"
                            name="name"
                            className={styles.name}
                        />
                    </div>

                    <div className={styles.label}>
                        <p>Email</p>
                        <input
                            required
                            type="email"
                            name="email"
                            className={styles.email}
                        />
                    </div>

                    <div className={styles.label}>
                        <p>Hvad drejer henvendelsen om?</p>
                        <input
                            required
                            type="text"
                            name="name"
                            className={styles.name}
                        />
                    </div>

                    <div className={styles.label}>
                        <p>Besked (Skriv dato'er, hvis det drejer sig om en booking)</p>
                        <textarea
                            required
                            type="text"
                            name="message"
                            className={styles.message}
                        />
                    </div>

                    
                </form>
                <button type="submit" className={styles.indsendButton}>
                    <Link to='/succes' className={styles.linkBtn} type='submit'>Indsend</Link>
                </button>
            </div>
        </div>
    )
}

export default Contact