'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { setCookie } from 'nookies'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import Link from 'next/link'

interface FormData {
  email: string
  password: string
}

export default function SignIn() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { email, password } = formData

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user
      const token = await user.getIdToken()

      const userDoc = await getDoc(doc(db, 'users', user.uid))
      const userData = userDoc.data()

      if (userData?.role !== 'admin') {
        throw new Error('You do not have admin access')
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

      alert('Sign-in successful!')
      router.push('/dashboard')
    } catch (err: any) {
      console.error('Error signing in: ', err.message || err)
      setError('Error signing in: ' + (err.message || err))
    }
  }

  return (
    <AuthLayout
      title="Sign in as admin"
      subtitle={
        <>
          Not an admin?{' '}
          <Link href="/register" className="text-cyan-600">
            Sign up
          </Link>{' '}
          to create a user account.
        </>
      }
    >
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
        <div className="grid grid-cols-1 gap-6">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
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
