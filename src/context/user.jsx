'use client'
import React, { useState, createContext, useCallback, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
const UserContext = createContext()

export function UserProvider({ children }) {
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState(0)
  const router = useRouter()
  useEffect(() => {
    const storageUserName = localStorage.getItem('userName')
    const storageUserId = localStorage.getItem('userId')
    if (storageUserName && storageUserId) {
      setUserName(storageUserName)
      setUserId(storageUserId)
    }
  }, [])


  const handleChangeUser = useCallback((userName, userId) => {
    setUserName(userName)
    setUserId(userId)

    localStorage.setItem('userName', userName)
    localStorage.setItem('userId', userId)
  }, [])

  const handleLogout = (userName, userId) => {
    localStorage.removeItem('userName',)
    localStorage.removeItem('userId')
    setUserName('')
    setUserId(0)
    router.push('/')
  }


  return (
    <UserContext.Provider value={{ userName, userId, handleChangeUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)