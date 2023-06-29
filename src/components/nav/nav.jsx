'use client'
import { useState } from "react"
import { useUserContext } from "@/context"
import Link from "next/link"
import Image from "next/image"

import styles from './nav.module.css'
import menuIcon from '../../../public/user-list.svg'

const Nav = () => {
  const { userName } = useUserContext()
  const [showmenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showmenu)
  }

  return (
    <>
      <button className={styles.menu} onClick={toggleMenu}>
        <Image src={menuIcon} />
      </button>
      {showmenu && (
        <nav className={styles.nav}>
          <h3 className={styles.name}>{userName || 'Menu'}</h3>
          <Link className={styles.link} href="/cliente">Agendar</Link>
          <Link className={styles.link} href="/config">Configurações</Link>
        </nav>
      )
      }
    </>
  )
}

export default Nav