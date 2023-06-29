import CalendarDay from "@/components/calendarDay/calendarDay"
import styles from './cliente.module.css'

export default function ClientPage() {
  return (
    <div className={styles.container}>
      <CalendarDay />
    </div>
  )
}