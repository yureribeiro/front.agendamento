import CalendarDay from "@/components/calendarDay/calendarDay"
import styles from './cliente.module.css'
import Link from "next/link"
import Image from "next/image"
import ArrowLeft from '../../../public/arrow-left.svg'

export const metadata = {
  title: 'NR | Agendamento',
  description: 'Agendamento manicure',
}

export default function ClientPage() {
  return (
    <div className={styles.container}>
      <Link
        className={styles.link}
        href={'/painel'}
      >
        <Image src={ArrowLeft} alt="Voltar" />
        Voltar</Link>
      <CalendarDay />
    </div>
  )
}