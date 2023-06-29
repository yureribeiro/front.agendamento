import './globals.css'
import { Poppins } from 'next/font/google'
import { Providers } from '@/providers'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Natalia Ribeiro',
  description: 'Agende seu horário online!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="PT-BR">
      <Providers>
        <body className={poppins.className}>{children}</body>
      </Providers>
    </html>
  )
}
