import styles from './nav.module.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { GiHamburgerMenu } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNav = () => {
    setIsOpen((prev) => !prev)
  }

  const closeNav = () => {
    setIsOpen(false)
  }

  const Nav = [
    { 
        path: "/", 
        title: "Home" 
    },
    { 
        path: "/activitiespage", 
        title: "Aktiviteter" 
    },
    { 
        path: "/stay", 
        title: "Ophold" 
    },
    { 
        path: "/contact", 
        title: "Kontakt" 
    },
    { 
        path: "/mylist", 
        title: "Min Liste" 
    },
    { 
        path: "/backoffice", 
        title: "Backoffice" 
    },
  ]

  return (
    <nav className={styles.navBar}>
      <img className={styles.navLogo} src="/assets/img/logo/logo.png" alt="Logo" />

      <div className={styles.hamburger} onClick={toggleNav}>
        {isOpen ? <RxCross2 size={30} /> : <GiHamburgerMenu size={25} />}
      </div>

      <div className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
        {Nav.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={closeNav}
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            {item.title}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navigation