import Form from '@/components/form/form'
import styles from './login.module.css'

export const metadata = {
  title: 'NR | login',
  description: 'Agendamento manicure',
}

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Acesse sua conta</h1>
      <Form />
      <div className={styles.details}>
        <p className={styles.textDetails}>Todas as clientes já estão cadastradas</p>
        <p className={styles.textDetails}>Digite seu numero de telefone ex: 62911223344 para acessar sua conta.</p>
      </div>
    </main>
  )
}