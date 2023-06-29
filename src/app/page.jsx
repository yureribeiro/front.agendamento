import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Natalia Ribeiro</h1>
      <p className={styles.subtitle}>Agende seu Horário</p>
      <Link
        href={'/login'}
        className={styles.button}
      >
        Login
      </Link>
    </main>
  )
}
