import styles from './homePageHeader.module.css'

function HomePageHeader({ title, subtitle, img }) {

    return (
        <div className={styles.header} style={{ backgroundImage: `url(${img})` }}>
            <div className={styles.headerContent}>
                <img className={styles.logo} src="/assets/img/logo/logo.png" alt="Logo" />
                <h3>{subtitle}</h3>
                <h1>{title}</h1>
                <div className={styles.bookButton}>Book nu</div>
            </div>
        </div>
    )
}

export default HomePageHeader