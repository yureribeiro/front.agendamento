'use client'
import { useUserContext } from "@/context"
import styles from './perfil.module.css'

export default function Perfil() {
  const { userName } = useUserContext()

  return (
    <section className={styles.container}>
      <p className={styles.text}>Olá, <span className={styles.name}>{userName}</span></p>
      <h1 className={styles.text}>Seja bem vinda!</h1>
    </section>
  )
}