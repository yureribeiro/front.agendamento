'use client'
import { useState } from "react"
import { useUserContext } from "@/context"
import Link from "next/link"
import Image from "next/image"
import bell from '../../../public/bell.svg'
import styles from './nav.module.css'
import menuIcon from '../../../public/user-list.svg'

const Nav = () => {
  const { userName } = useUserContext()
  const [showmenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showmenu)
  }

  return (
    <section className={styles.header}>
      <button className={styles.menu} onClick={toggleMenu}>
        <Image src={menuIcon} />
      </button>
      <button className={styles.menu}>
        <Image src={bell} />
      </button>


      {showmenu && (
        <nav className={styles.nav}>
          <h3 className={styles.name}>{userName || 'Menu'}</h3>
          <Link className={styles.link} href="/cliente">Agendar</Link>
          <Link className={styles.link} href="/config">Configurações</Link>
        </nav>
      )
      }
    </section>
  )
}

export default Nav