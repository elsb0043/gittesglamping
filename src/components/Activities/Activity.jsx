import styles from './akt.module.css'
import { icons } from "../../services/Icons"
import { useMyList } from "../../context/myListContext"
import { useFetchActivities } from '../../hooks/useFetchActivities'

function Activity({ title, image, date, time }) {
  const { list, addToList, removeFromList } = useMyList()
  const isList = list.some((list) => list.title === title)
  const { activities } = useFetchActivities()

  // Tilføj til Min Liste siden
  const handleHeartClick = () => {
    const activity = { title, image, date, time }
    if (isList) {
      removeFromList(title)
    } else {
      addToList(activity)
    }
  }

  return (
    <div className={styles.aktContent}>
      <div className={styles.aktiviteter}>
        {activities.map(ac => 
        <div className={styles.aktivitet}> 
          <div key={ac._id} className={styles.aktTitle}>
            <h3>{ac.title}</h3>
          </div>
          <div className={styles.imgDiv}>
            <img src={ac.image} alt={title} />
          </div>
          <div className={styles.aktText}>
            <div className={styles.aktTextContent}>
              <div className={styles.alleDage}>
                <p>{ac.date}</p>
                <h4>{ac.time}</h4>
              </div>
                <div className={styles.heartDiv}>
                  <div
                    className={`${styles.heart} ${isList ? styles.filledHeart : ""}`}
                    onClick={handleHeartClick}
                  >
                    {isList ? icons['FullHeart'] : icons['EmptyHeart']}
                  </div>
                </div>
            </div>
            <div className={styles.læsMereButton}>
              <div className={styles.linkBtn}>
                Læs mere {icons['ArrowDown']}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default Activity