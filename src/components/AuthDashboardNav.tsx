'use client'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import nookies from 'nookies'
import { app } from '@/firebase/config'

const auth = getAuth(app)

interface WithAuthProps {}

export function withAuth<P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>,
) {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
      const cookies = nookies.get()
      const role = cookies.role

      if (role === 'admin') {
        setLoading(false)
        setAuthenticated(true)
        return
      }

      const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        setLoading(false)
        if (user) {
          if (role === 'admin') {
            setAuthenticated(true)
          } else {
            router.push('/login')
          }
        } else {
          router.push('/login')
        }
      })

      return () => unsubscribe()
    }, [router])

    if (loading) {
      return 
    }

    if (authenticated) {
      return <WrappedComponent {...props} />
    }

    return null
  }

  return AuthenticatedComponent
}
