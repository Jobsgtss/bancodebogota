import { useEffect, useState } from 'react'

export function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return hash
}

export function goTo(hash: string) {
  window.location.hash = hash
}
