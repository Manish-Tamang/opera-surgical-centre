'use client'
import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import Image from 'next/image'
import LogoImage from '@/images/logo.png'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Add the form data to Firestore
      await addDoc(collection(db, 'contact_form'), formData)

      // Optionally send a notification email
      await fetch('/api/contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
        }),
      })

      // Show success toast and reset form
      toast.success('Your message has been sent successfully.')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        website: '',
        message: '',
      })
    } catch (error) {
      console.error('Error submitting form: ', error)
      toast.error('There was an error submitting the form.')
    }
  }

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-64}
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-64} className="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <div className="mx-auto max-w-xl lg:max-w-4xl">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          We’re Happy to Collaborate with you
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Fill up the form with your message/idea/report.
        </p>
        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <form onSubmit={handleSubmit} className="lg:flex-auto">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Website
                </label>
                <div className="mt-2.5">
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-500">
              By submitting this form, I agree to the{' '}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </p>
          </form>
          <div className="lg:mt-6 lg:w-80 lg:flex-none">
            <Image
              alt="Logo of Opera Surgical Centre"
              src={LogoImage}
              className="h-12 w-auto"
            />
            <figure className="mt-10">
              <blockquote className="text-lg font-semibold leading-8 text-gray-900">
                <p>
                  “Opera Surgical Centre is the major healthcare provider to one
                  of the fastest growing and most diverse regions of Australia.
                  The catchment population is nearing 900,000 and the birth rate
                  and movement into this region means that strong growth will
                  continue in the years ahead.”
                </p>
              </blockquote>
              <figcaption className="mt-10 flex gap-x-6">
                <img
                  alt="Rita Didi ko dummy image hehe"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=96&h=96&q=80"
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div>
                  <div className="text-base font-semibold text-gray-900">
                    Rita Sherpa
                  </div>
                  <div className="text-sm leading-6 text-gray-600">
                    CEO of Opera Surgical Centre
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
