import styles from './feedback.module.css'

export default function Feedback(title, description) {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
      <button className={styles.button}>Ok</button>
    </div>
  )
}