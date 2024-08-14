'use client'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import Link from 'next/link'
import { setCookie } from 'nookies'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

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

      const q = query(collection(db, 'doctors'), where('email', '==', email))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        throw new Error('You do not have this access')
      }

      const doctorDoc = querySnapshot.docs[0]
      const doctorData = doctorDoc.data()

      if (doctorData.role !== 'doctor') {
        throw new Error('You do not have this access')
      }

      // Set the token, role, and doctor ID in cookies
      setCookie(null, 'userAuthToken', token, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })

      setCookie(null, 'role', doctorData.role, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })

      setCookie(null, 'doctorID', doctorDoc.id, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })

      alert('Logged In successfully!')
      router.push('/doctorDashboard')
    } catch (err: any) {
      console.error('Error signing in: ', err.message || err)
      setError('Error signing in: ' + (err.message || err))
    }
  }

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href="/register" className="text-cyan-600">
            Sign up
          </Link>{' '}
          for an account.
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
        <div className="grid gap-6">
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
          Sign in
        </Button>
      </form>
    </AuthLayout>
  )
}
