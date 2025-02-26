import styles from './akt.module.css'
import { icons } from "../../services/Icons"
import { useMyList } from "../../context/myListContext"
import { useFetchActivities } from '../../hooks/useFetchActivities'

function Activity() {
  const { list, addToList, removeFromList } = useMyList()
  const { activities } = useFetchActivities()

  // Funktion til at håndtere hjertetryk
  const handleHeartClick = (activityTitle) => {
    const activity = activities.find(ac => ac.title === activityTitle)
    if (activity) {
      if (list.some(item => item.title === activity.title)) {
        removeFromList(activity.title)
      } else {
        addToList(activity)
      }
    }
  }

  return (
    <div className={styles.aktContent}>
      <div className={styles.aktiviteter}>
        {activities.map(ac => 
        <div key={ac._id} className={styles.aktivitet}> 
          <div className={styles.aktTitle}>
            <h3>{ac.title}</h3>
          </div>
          <div className={styles.imgDiv}>
            <img src={ac.image} alt={ac.title} />
          </div>
          <div className={styles.aktText}>
            <div className={styles.aktTextContent}>
              <div className={styles.alleDage}>
                <p>{ac.date}</p>
                <h4>{ac.time}</h4>
              </div>
              <div className={styles.heartDiv}>
                <div
                  className={`${styles.heart} ${list.some(item => item.title === ac.title) ? styles.filledHeart : ""}`}
                  onClick={() => handleHeartClick(ac.title)} // Brug den specifikke aktivitet
                >
                  {list.some(item => item.title === ac.title) ? icons['FullHeart'] : icons['EmptyHeart']}
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