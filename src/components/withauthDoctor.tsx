'use client'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { app } from '@/firebase/config'

const auth = getAuth(app)

interface WithAuthProps {
}

export function withAuth<P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        setLoading(false)
        if (user) {
          setAuthenticated(true)
        } else {
          router.push('/doctorLogin')
        }
      })

      return () => unsubscribe()
    }, [router])

    if (loading) {
      return <p>Loading...</p>
    }

    if (authenticated) {
      return <WrappedComponent {...props} />
    }

    return null
  }

  return AuthenticatedComponent
}
