'use client'
import React, { useState, createContext, useCallback, useContext } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState(0)

  const handleChangeUser = useCallback((userName, userId) => {
    setUserName(userName)
    setUserId(userId)
  }, [])

  return (
    <UserContext.Provider value={{ userName, userId, handleChangeUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)