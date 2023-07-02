'use client'
import React, { useState, useEffect } from "react"
import { useUserContext } from "@/context"
import { format, parseISO } from 'date-fns'
import styles from './historyClient.module.css'
import Image from "next/image"
import CalendarDelete from '../../../public/calendar-x.svg'

export default function HistoryClient() {
  const { userId } = useUserContext()
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    async function fetchAppointments() {
      const appointments = await fetch(`http://localhost:3001/appointments/${userId}`, {
        method: 'GET'
      })
      setAppointments(await appointments.json())
    }
    fetchAppointments()
  }, [])


  const handleDeleteAppointment = (appointmentId) => {
    fetch(`http://localhost:3001/appointments/${userId}/${appointmentId}`, {
      method: 'DELETE'
    }).then(() => {
      console.log(appointmentId)
      setAppointments(prevAppointments =>
        prevAppointments.filter(appointment => appointment.id !== appointmentId)
      )
    })
      .catch((err) => {
        console.log(err)
      })
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
              <Image src={CalendarDelete} onClick={() => handleDeleteAppointment(appointment.id)} alt="deletar agendamento" />
            </div>
          )
        })
      ) : (
        <p className={styles.noHistory}>Você ainda não fez nenhum agendamento...</p>
      )}
    </div>
  )
}