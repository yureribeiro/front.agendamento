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

export const metadata = {
  title: 'NR | Painel'
}

export default function PainelPage() {
  return (
    <main className={styles.container}>
      <Nav />
      <Perfil />

      <Link className={styles.appointment} href={'/cliente'}>
        <Image src={Calendar} alt="icone de um calendario com sinal de mais" />
        Agende seu horário
      </Link>

      <section className={styles.sectionCards}>
        <Link className={styles.card} href={'#'}>
          <Image src={Whatsapp} alt="suporte whatsapp" />
        </Link>
        <Link className={styles.card} href={'#'}>
          <Image src={Apple} alt="Baixe o app para IOS" />
        </Link>
        <Link className={styles.card} href={'#'}>
          <Image src={Android} alt="Baixe o app para Android" />
        </Link>
      </section>

      <section className={styles.history}>
        <h4 className={styles.label}>Meus Agendamentos:</h4>
        <HistoryClient />
      </section>
    </main>
  )
}