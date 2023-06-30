'use client'
import React, { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import { useUserContext } from "@/context"

import pt from 'date-fns/locale/PT'
import "../../../node_modules/react-datepicker/dist/react-datepicker.css"
import styles from './calendarDary.module.css'

import { registerLocale, setDefaultLocale } from "react-datepicker"
import { addDays } from "date-fns"

export default function CalendarDay() {
  const [startDate, setStartDate] = useState(null)
  const [startTime, setStartTime] = useState(new Date())
  const [serviceType, setServiceType] = useState('')

  const { userName, userId } = useUserContext()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  registerLocale('pt', pt)
  setDefaultLocale('pt')

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
      const response = await fetch(`http://localhost:3001/appointments/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      })

      if (response.ok) {
        setLoading(false)
        const appointment = await response.json()
        console.log(appointment)
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

  return (
    <div className={styles.container}>
      <h2>Agendamento</h2>
      <p className={styles.name}>{userName}</p>
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
    </div>
  )
}
