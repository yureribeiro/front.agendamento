'use client'
import React, { useState } from 'react'
import styles from './form.module.css'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/context'
export default function Form() {
  const [telNumber, setTelNumber] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { handleChangeUser } = useUserContext()
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telNumber }),
      })
      const data = await response.json()

      if (data.exists === false) {
        setLoading(false)
        setError('Número de telefone inválido.')
      } else if (data.exists === true) {
        setLoading(false)
        handleChangeUser(data.name, data.userId)
        router.push('/painel')
      }
    } catch (error) {
      setLoading(false)
      console.error(error.message)
      setError('Ouve um erro no servidor, tente novamente por favor.')
    }
  }

  return (
    <form className={styles.form}>
      <label className={styles.label}>Número de telefone</label>
      <input
        className={styles.input}
        type="text"
        value={telNumber}
        placeholder='digite seu número'
        required={true}
        onChange={(e) => setTelNumber(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className={styles.button}
      > {loading
        ? 'Carregando...'
        : 'Entrar'}
      </button>
      {error && <small className={styles.error}>{error}</small>}
    </form>
  )
}