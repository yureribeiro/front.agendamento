import Link from "next/link"
import Image from "next/image"

import Calendar from '../../../public/calendar-add.svg'
import Whatsapp from '../../../public/whatsapp-icon.svg'
import Apple from '../../../public/apple-logo.svg'
import Android from '../../../public/android-logo.svg'

import Perfil from "@/components/perfilUser/parfil"
import Nav from "@/components/nav/nav"

import styles from './painel.module.css'
import HistoryClient from "@/components/historyClient/historyClient"

export default function PainelPage() {
  return (
    <main className={styles.container}>
      <Nav />
      <Perfil />

      <Link className={styles.appointment} href={'/cliente'}>
        <Image src={Calendar} alt="Agendar" />
        Agendar meu Horário
      </Link>

      <section className={styles.sectionCards}>
        <Link className={styles.card} href={'/cliente'}>
          <Image src={Whatsapp} alt="suporte whatsapp" />
        </Link>
        <Link className={styles.card} href={'/cliente'}>
          <Image src={Apple} alt="Baixe o app para IOS" />
        </Link>
        <Link className={styles.card} href={'/cliente'}>
          <Image src={Android} alt="Baixe o app para Android" />
        </Link>
      </section>

      <section className={styles.history}>
        <HistoryClient />
      </section>
    </main>
  )
}