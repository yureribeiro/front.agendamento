'use client'
import Image from "next/image"
import React, { useState, useEffect } from "react"
import { useUserContext } from "@/context"
import { format, parseISO } from 'date-fns'

import CalendarDelete from '../../../public/calendar-x.svg'

import styles from './historyClient.module.css'

export default function HistoryClient() {
  const { userId } = useUserContext()
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    async function fetchAppointments() {
      const appointments = await fetch(`https://natalia-api.vercel.app/appointments/${userId}`, {
        method: 'GET'
      })
      setAppointments(await appointments.json())
    }
    fetchAppointments()
  }, [])


  const handleDeleteAppointment = (appointmentId) => {
    const confirm = window.confirm('tem certeza que deseja deletar este agendamento?')

    if (confirm) {
      fetch(`https://natalia-api.vercel.app/appointments/${userId}/${appointmentId}`, {
        method: 'DELETE'
      }).then(() => {
        setAppointments(prevAppointments =>
          prevAppointments.filter(appointment => appointment.id !== appointmentId)
        )
      })
        .catch((err) => {
          console.log(err)
        })
    } else {
      return
    }
  }


  return (
    <div className={styles.container}>
      {appointments.length > 0 ? (
        appointments.map((appointment) => {
          return (
            <div className={styles.appointment} key={appointment.id}>
              <div className={styles.appointmentInfo}>
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
              <div className={styles.deleteAppointment} onClick={() => handleDeleteAppointment(appointment.id)}>
                <Image src={CalendarDelete} alt="deletar agendamento" />
                <small>Deletar</small>
              </div>
            </div>
          )
        })
      ) : (
        <p className={styles.noHistory}>Você ainda não fez nenhum agendamento...</p>
      )}
    </div>
  )
}