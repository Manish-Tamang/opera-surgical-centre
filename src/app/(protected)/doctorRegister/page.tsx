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
import { withAuth } from '@/components/AuthDoctorRegister'

function RegisterDoctor() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    specialization: '',
    registration_date: '',
  })
  const [image, setImage] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { email, password, first_name, last_name, specialization } = formData

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      const userId = userCredential.user.uid

      const registrationDate = new Date().toISOString()

      let imageUrl = ''
      if (image) {
        const imageRef = ref(storage, `doctors/${userId}/${image.name}`)
        await uploadBytes(imageRef, image)
        imageUrl = await getDownloadURL(imageRef)
      }

      await setDoc(doc(db, 'doctors', userId), {
        first_name,
        last_name,
        email,
        specialization,
        registration_date: registrationDate,
        image_url: imageUrl || '',
        role: 'doctor',
      })

      alert('Registration successful!')
    } catch (error) {
      console.error('Error registering doctor: ', error)
      alert('Error registering doctor')
    }
  }

  return (
    <AuthLayout
      title="Sign up as a doctor"
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
            label="Specialization"
            name="specialization"
            type="text"
            autoComplete="specialization"
            required
            value={formData.specialization}
            onChange={handleChange}
          />
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border file:border-gray-300 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-600 hover:file:bg-gray-50"
              />
            </label>
          </div>
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Get started today
        </Button>
      </form>
    </AuthLayout>
  )
}
export default withAuth(RegisterDoctor)
