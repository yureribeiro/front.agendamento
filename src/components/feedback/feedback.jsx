'use client'
import { useState } from 'react';
import styles from './feedback.module.css'

export default function Feedback({ title, description }) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClick = () => {
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
      <button className={styles.button} onClick={handleClick}>Ok</button>
    </div>
  )
}