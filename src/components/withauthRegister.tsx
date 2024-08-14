'use client'
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import nookies from 'nookies'
import { app } from '@/firebase/config'
import '@/styles/loader.css'

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
      const path = router.asPath || ''

      if (path.startsWith('/patientRegister')) {
        if (role !== 'user') {
          router.push('/signin')
          return
        }
        setLoading(false)
        setAuthenticated(true)
        return
      }

      const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        setLoading(false)
        if (user) {
          if (role === 'user') {
            setAuthenticated(true)
          } else {
            router.push('/signin')
          }
        } else {
          router.push('/signin')
        }
      })

      return () => unsubscribe()
    }, [router])

    if (loading) {
      return (
        <div className="loading-container">
          <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
            <circle
              className="pl__ring pl__ring--a"
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 660"
              strokeDashoffset="-330"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--b"
              cx="120"
              cy="120"
              r="35"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 220"
              strokeDashoffset="-110"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--c"
              cx="85"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            ></circle>
            <circle
              className="pl__ring pl__ring--d"
              cx="155"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              strokeWidth="20"
              strokeDasharray="0 440"
              strokeLinecap="round"
            ></circle>
          </svg>
        </div>
      )
    }

    if (authenticated) {
      return <WrappedComponent {...props} />
    }

    return null
  }

  return AuthenticatedComponent
}
