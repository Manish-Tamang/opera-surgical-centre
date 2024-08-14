'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { useRouter } from 'next/navigation'
import { parseCookies } from 'nookies'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface FormData {
  patient_name: string
  patient_email: string
  appointment_date: string
  doctor_id: string
  note: string
  custom_address: string
}

interface Doctor {
  id: string
  first_name: string
  last_name: string
  specialization: string
}

export default function BookAppointment() {
  const [formData, setFormData] = useState<FormData>({
    patient_name: '',
    patient_email: '',
    appointment_date: '',
    doctor_id: '',
    note: '',
    custom_address: '',
  })
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [reminder, setReminder] = useState('')

  const router = useRouter()
  const cookies = parseCookies()
  const userEmail = cookies.userEmail || ''

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'doctors'))
        const doctorsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Doctor[]
        setDoctors(doctorsData)
      } catch (error) {
        console.error('Error fetching doctors: ', error)
        toast.error('Error fetching doctors')
      }
    }

    fetchDoctors()
  }, [])

  useEffect(() => {
    if (formData.doctor_id) {
      const selectedDoctorData =
        doctors.find((doctor) => doctor.id === formData.doctor_id) || null
      setSelectedDoctor(selectedDoctorData)
    } else {
      setSelectedDoctor(null)
    }
  }, [formData.doctor_id, doctors])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        user_email: userEmail,
        approval: 'pending',
      })

      // Send email notification
      await fetch('/api/appointment-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient_email: formData.patient_email,
          patient_name: formData.patient_name,
          appointment_date: formData.appointment_date,
        }),
      })

      toast.success('Appointment booked successfully!')
    } catch (error) {
      console.error('Error booking appointment: ', error)
      toast.error('Error booking appointment')
    }
  }

  useEffect(() => {
    if (formData.custom_address) {
      setReminder('Custom address filled, this may cost extra.')
    } else {
      setReminder('')
    }
  }, [formData.custom_address])

  return (
    <AuthLayout title="Book Appointment">
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="patient_name"
            className="block text-sm font-medium text-gray-700"
          >
            Patient Name
          </label>
          <input
            id="patient_name"
            name="patient_name"
            type="text"
            required
            value={formData.patient_name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="patient_email"
            className="block text-sm font-medium text-gray-700"
          >
            Patient Email
          </label>
          <input
            id="patient_email"
            name="patient_email"
            type="email"
            required
            value={formData.patient_email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="appointment_date"
            className="block text-sm font-medium text-gray-700"
          >
            Appointment Date
          </label>
          <input
            id="appointment_date"
            name="appointment_date"
            type="date"
            required
            value={formData.appointment_date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="doctor_id"
            className="block text-sm font-medium text-gray-700"
          >
            Choose Doctor
          </label>
          <select
            id="doctor_id"
            name="doctor_id"
            required
            value={formData.doctor_id}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.first_name} {doctor.last_name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700"
          >
            Note to Doctor (Optional)
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="custom_address"
            className="block text-sm font-medium text-gray-700"
          >
            Custom Address for Doctor Visit (Optional)
          </label>
          <input
            id="custom_address"
            name="custom_address"
            type="text"
            value={formData.custom_address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {reminder && <p className="mt-2 text-sm text-red-600">{reminder}</p>}

        <Button type="submit" color="cyan" className="mt-8 w-full">
          Book Appointment
        </Button>
      </form>
    </AuthLayout>
  )
}
