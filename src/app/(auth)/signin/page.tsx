'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { setCookie } from 'nookies'
import { doc, getDoc } from 'firebase/firestore'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { app, db } from '@/firebase/config'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const auth = getAuth(app)

export default function SignIn() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential.user) {
        const user = userCredential.user
        const token = await user.getIdToken()

        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const userData = userDoc.data()

        if (!userData) {
          throw new Error('User data not found.')
        }

        if (!userData.activated) {
          throw new Error('Account not activated. Please check your email for activation instructions.')
        }

        if (userData.role !== 'user') {
          throw new Error('Please log in with a user account.')
        }

        // Set the token, role, and user ID in cookies
        setCookie(null, 'userAuthToken', token, {
          path: '/',
          maxAge: 30 * 24 * 60 * 60, // 30 days
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        })

        setCookie(null, 'role', userData.role, {
          path: '/',
          maxAge: 30 * 24 * 60 * 60, // 30 days
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        })

        setCookie(null, 'userID', user.uid, {
          path: '/',
          maxAge: 30 * 24 * 60 * 60, // 30 days
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        })

        toast.success('Sign-in successful!')
        router.push('/')
      }
    } catch (err: any) {
      console.error('Error signing in: ', err.message || err)
      setError('Error signing in: ' + (err.message || err))
      toast.error('Error signing in: ' + (err.message || err))
    }
  }

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>
          New here?{' '}
          <Link href="/register" className="text-cyan-600">
            Sign up
          </Link>{' '}
          to create an account.
        </>
      }
    >
      <ToastContainer />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Sign In
        </Button>
      </form>
    </AuthLayout>
  )
}
