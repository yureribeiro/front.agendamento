import Link from "next/link"

import Perfil from "@/components/perfilUser/parfil"
import Nav from "@/components/nav/nav"
import styles from './painel.module.css'

export default function PainelPage() {
  return (
    <main className={styles.container}>
      <Nav />
      <Perfil />
      <Link className={styles.card} href={'/cliente'}>Agendar meu Horário</Link>
    </main>
  )
}