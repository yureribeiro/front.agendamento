'use client'
import { useUserContext } from "@/context"
export default function PainelPage() {
  const { userName, userId } = useUserContext()

  return (
    <div>
      <h1>painel logado</h1>
      <p>usuario: {userName}</p>
      <p>id: {userId}</p>
    </div>
  )
}