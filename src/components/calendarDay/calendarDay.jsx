'use client'
import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import { useUserContext } from "@/context"

import "../../../node_modules/react-datepicker/dist/react-datepicker.css"
import styles from './calendarDary.module.css'
import calendarAdd from '../../../public/calendar-add.svg'

import { registerLocale, setDefaultLocale } from "react-datepicker"
import { addDays } from "date-fns"
import Image from "next/image"
import Feedback from "../feedback/feedback"

import { pt } from 'date-fns/locale/pt'

registerLocale('pt', pt)
setDefaultLocale('pt')

export default function CalendarDay() {
  const [startDate, setStartDate] = useState(null)
  const [startTime, setStartTime] = useState(new Date())
  const [serviceType, setServiceType] = useState('')

  const { userName, userId } = useUserContext()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState(false)


  const handleSubmit = async (event) => {
    event.preventDefault()

    const endTime = new Date(startTime)
    if (serviceType === "HAND" || serviceType === "FOOT") {
      endTime.setHours(startTime.getHours() + 1)
    } else if (serviceType === "HAND_AND_FOOT") {
      endTime.setHours(startTime.getHours() + 2)
    }

    const appointmentData = {
      startTime: startTime,
      endTime: endTime,
      dayOfWeek: startDate,
      serviceType: serviceType,
    }

    try {
      setLoading(true)
      const response = await fetch(`https://natalia-api.vercel.app/appointments/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      })

      if (response.ok) {
        setLoading(false)
        await response.json()
        setFeedback(true)
      } else if (response.status === 400) {
        setLoading(false)
        setError('esse horário já foi agendado, tente 2 horas mais tarde ou mais cedo')
      } else {
        setLoading(false)
        setError('Verifique se preencheu corretamente os campos')
      }
    } catch (error) {
      setLoading(false)
      setError('tente novamente ou contate o suporte')
    }
  }

  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value)
  }

  useEffect(() => {
    setFeedback(false)
  }, [])


  return (
    <main className={styles.container}>
      <h2>Agendamento</h2>
      <div className={styles.contentName}>
        <Image src={calendarAdd} alt="Agendar" />
        <p className={styles.name}>{userName}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Dia:</label>
        <DatePicker
          className={styles.datePicker}
          locale="pt"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          maxDate={addDays(new Date(), 5)}
          placeholderText="Selecione o Dia"
        />
        <label className={styles.label}>Horário:</label>
        <DatePicker
          className={styles.datePicker}
          selected={startTime}
          onChange={(date) => setStartTime(date)}
          showTimeSelect
          showTimeSelectOnly
          minTime={new Date().setHours(7, 0)}
          maxTime={new Date().setHours(17, 0)}
          timeIntervals={60}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
        <label className={styles.label}>Serviço:</label>
        <select className={styles.select} value={serviceType} onChange={handleServiceTypeChange}>
          <option value="HAND_AND_FOOT">Pé e Mão</option>
          <option value="FOOT">Pé</option>
          <option value="HAND">Mão</option>
        </select>
        <button
          className={styles.button}
          type="submit"
        > {loading
          ? 'Carregando...'
          : 'Agendar Horário'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      {feedback ? <Feedback title={'Tudo certo 💖'} description={'Horário agendado com sucesso!'} /> : null}
    </main>
  )
}
