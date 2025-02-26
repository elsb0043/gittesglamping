import { NavLink } from "react-router-dom"
import styles from "./backofficeNavigation.module.css"

const BackofficeNavigation = () => {
  return (
    <ul className={styles.backofficeNavigation}>
      <li>
        <NavLink
          to='/backoffice/activities'
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Aktiviteter
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/backoffice/stays'
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Ophold
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/backoffice/reviews'
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Udtalelser
        </NavLink>
      </li>
    </ul>
  )
}

export default BackofficeNavigation