'use client'
import React, { useState, useEffect } from "react"
import { useUserContext } from "@/context"
import { format, parseISO } from 'date-fns'
import styles from './historyClient.module.css'

export default function HistoryClient() {
  const { userId } = useUserContext()
  const [appointments, setAppointments] = useState([])
  useEffect(() => {
    async function fetchAppointments() {
      const appointments = await fetch(`http://localhost:3001/appointments/${userId}`)
      setAppointments(await appointments.json())
    }
    fetchAppointments()
  }, [])

  return (
    <div className={styles.container}>
      {appointments ? (
        appointments.map((appointment) => {
          return (
            <div className={styles.appointment} key={appointment.id}>
              <p className={styles.date}>
                {format(parseISO(appointment.dayOfWeek), 'dd/MM/yyyy')}
              </p>
              <div className={styles.contentTime}>
                <p className={styles.time}>{appointment.startTime}H</p>
                <p className={styles.time}> - </p>
                <p className={styles.time}>{appointment.endTime}H</p>
              </div>
              <p className={styles.service}>{appointment.serviceType}</p>
            </div>
          )
        })
      ) : (
        <p>Você ainda não fez nenhum agendamento...</p>
      )}
    </div>
  )
}