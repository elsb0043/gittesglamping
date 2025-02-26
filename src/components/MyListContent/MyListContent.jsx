import { useMyList } from "../../context/myListContext"
import { icons } from "../../services/Icons"
import styles from './myList.module.css'

function MyListContent() {
  const { list, removeFromList } = useMyList()

  return (
      <div className={styles.aktContainer}>
        {list?.length > 0 ? (
          list.map(list => (
            <div key={list._id} className={styles.aktContent}>
              <div className={styles.aktTitle}>
                <h3>{list.title}</h3>
              </div>
              <div className={styles.imgDiv}>
                <img src={list.image} alt={list.title} />
              </div>
              <div className={styles.aktText}>
                <div className={styles.aktTextContent}>
                  <div className={styles.alleDage}>
                    <p>{list.date}</p>
                    <h4>{list.time}</h4>
                  </div>
                  <div className={styles.removeDiv}>
                    <button
                        className={styles.removeButton}
                        onClick={() => removeFromList(list.title)}
                    >
                        {icons['Remove']}
                    </button>
                  </div>
                </div>
                <div className={styles.læsMereButton}>
                  <div className={styles.linkBtn}>
                    Læs mere {icons['ArrowDown']}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.ingenAktiviteter}>Du har ikke tilføjet nogen aktiviteter endnu.</p>
        )}
      </div>
  )
}

export default MyListContent