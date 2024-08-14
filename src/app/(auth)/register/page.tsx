'use client'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth, db, storage } from '@/firebase/config'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import Link from 'next/link'
import nookies from 'nookies'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface FormData {
  first_name: string
  last_name: string
  email: string
  password: string
  address: string
  job_title: string
  image: File | null
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    job_title: '',
    image: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const {
      email,
      password,
      first_name,
      last_name,
      address,
      job_title,
      image,
    } = formData

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const userId = userCredential.user.uid
      const registered_at = new Date().toISOString()

      let imageUrl = ''
      if (image) {
        const imageRef = ref(storage, `user_images/${userId}`)
        await uploadBytes(imageRef, image)
        imageUrl = await getDownloadURL(imageRef)
      }

      await setDoc(doc(db, 'users', userId), {
        first_name,
        last_name,
        email,
        address,
        job_title,
        registered_at,
        activated: false,
        imageUrl,
      })

      // Store the user ID in a cookie
      nookies.set(null, 'userId', userId, { path: '/' })

      // Trigger the email API
      await fetch('/api/signup-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, email }),
      })

      toast.success('Registration successful! Please wait for activation.')
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error registering user: ', error.message)
        toast.error('Error registering user: ' + error.message)
      } else {
        console.error('Unexpected error registering user: ', error)
        toast.error('Unexpected error registering user')
      }
    }
  }

  return (
    <AuthLayout
      title="Sign up as a user"
      subtitle={
        <>
          Already registered?{' '}
          <Link href="/signin" className="text-cyan-600">
            Sign in
          </Link>{' '}
          to your account.
        </>
      }
    >
       <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <TextField
            label="First name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
            value={formData.first_name}
            onChange={handleChange}
          />
          <TextField
            label="Last name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            required
            value={formData.last_name}
            onChange={handleChange}
          />
          <TextField
            className="col-span-full"
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            className="col-span-full"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            className="col-span-full"
            label="Address"
            name="address"
            type="text"
            autoComplete="street-address"
            required
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            className="col-span-full"
            label="Job Title"
            name="job_title"
            type="text"
            autoComplete="organization-title"
            required
            value={formData.job_title}
            onChange={handleChange}
          />
          <div className="col-span-full">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full"
            />
          </div>
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Get started today
        </Button>
      </form>
    </AuthLayout>
  )
}
