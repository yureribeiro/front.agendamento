import Link from "next/link"
import Calendar from '../../../public/calendar-add.svg'
import Whatsapp from '../../../public/whatsapp-icon.svg'
import Perfil from "@/components/perfilUser/parfil"
import Nav from "@/components/nav/nav"
import styles from './painel.module.css'
import Image from "next/image"

export default function PainelPage() {
  return (
    <main className={styles.container}>
      <Nav />
      <Perfil />
      <Link className={styles.card} href={'/cliente'}>
        <Image src={Calendar} alt="Agendar" />
        Agendar meu Horário
      </Link>

    </main>
  )
}