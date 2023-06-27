import WishProvider from '../context/wish-context'
import LanguageProvider from '../context/language-context'
import './globals.css'
import { Inter} from 'next/font/google'

const inter = Inter({ subsets: ['latin']})

export const metadata = {
  title: 'Wish list',
  description: 'Generated by create next app',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <WishProvider>
            {children}
          </WishProvider>
          </LanguageProvider>
      </body>
    </html>
  )
}
