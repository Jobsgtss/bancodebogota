import { useState } from 'react'
import { Banca } from './components/Banca'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HelpWidget } from './components/HelpWidget'
import { Hero } from './components/Hero'
import { Login } from './components/Login'
import { Products } from './components/Products'
import { PromoToast } from './components/PromoToast'
import { Why } from './components/Why'
import { useHash } from './lib/hash'
import { getSession, type Audience } from './lib/session'

export default function App() {
  const hash = useHash()
  const [audience, setAudience] = useState<Audience>('personas')
  const session = getSession()

  if (hash === '#login') {
    return <Login audience={audience} />
  }

  if (hash === '#banca') {
    if (!session) {
      return <Login audience={audience} />
    }
    return <Banca session={session} />
  }

  return (
    <div className="min-h-svh bg-white">
      <Header audience={audience} onAudience={setAudience} />
      <main>
        <Hero audience={audience} />
        <Products audience={audience} />
        <Why />
        <FAQ />
      </main>
      <Footer />
      <PromoToast />
      <HelpWidget />
    </div>
  )
}
