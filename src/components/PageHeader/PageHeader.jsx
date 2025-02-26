import styles from './pageHeader.module.css'

function PageHeader({ title, img }) {

    return (
        <div className={styles.header} style={{ backgroundImage: `url(${img})` }}>
            <div className={styles.headerContent}>
                <h1>{title}</h1>
            </div>
        </div>
    )
}

export default PageHeader