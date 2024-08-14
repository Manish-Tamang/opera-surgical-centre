'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { getAuth } from 'firebase/auth'
import { parseCookies } from 'nookies'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField, SelectField } from '@/components/Fields'
import Link from 'next/link'
import { withAuth } from '@/components/withauthRegister'

const auth = getAuth()

function PatientRegistration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    occupation: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    primaryPhysician: '',
    insuranceProvider: '',
    insurancePolicyNumber: '',
    allergies: '',
    currentMedication: '',
    familyMedicalHistory: '',
    pastMedicalHistory: '',
    identificationType: '',
    identificationNumber: '',
    identificationDocument: '',
    consentTreatment: false,
    consentDisclosure: false,
    consentPrivacyPolicy: false,
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const token = parseCookies()['userAuthToken']
      const { currentUser } = auth
      if (!currentUser || !token) {
        throw new Error('User not authenticated')
      }

      await addDoc(collection(db, 'patients'), formData)
      alert('Patient registration successful!')
      // Optionally, redirect the user or clear the form
    } catch (error) {
      console.error('Error registering patient: ', error)
      setError('Error registering patient')
    }
  }

  return (
    <AuthLayout
      title="Register a new patient"
      subtitle={
        <>
          Back to{' '}
          <Link href="/dashboard" className="text-cyan-600">
            Dashboard
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <TextField
            label="Full Name"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            type="text"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            required
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <SelectField
            label="Gender"
            name="gender"
            required
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select a gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </SelectField>
          <TextField
            label="Address"
            name="address"
            type="text"
            required
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            label="Occupation"
            name="occupation"
            type="text"
            required
            value={formData.occupation}
            onChange={handleChange}
          />
          <TextField
            label="Emergency Contact Name"
            name="emergencyContactName"
            type="text"
            required
            value={formData.emergencyContactName}
            onChange={handleChange}
          />
          <TextField
            label="Emergency Contact Number"
            name="emergencyContactNumber"
            type="text"
            required
            value={formData.emergencyContactNumber}
            onChange={handleChange}
          />
          <TextField
            label="Primary Physician"
            name="primaryPhysician"
            type="text"
            required
            value={formData.primaryPhysician}
            onChange={handleChange}
          />
          <TextField
            label="Insurance Provider"
            name="insuranceProvider"
            type="text"
            required
            value={formData.insuranceProvider}
            onChange={handleChange}
          />
          <TextField
            label="Insurance Policy Number"
            name="insurancePolicyNumber"
            type="text"
            required
            value={formData.insurancePolicyNumber}
            onChange={handleChange}
          />
          <TextField
            label="Allergies"
            name="allergies"
            type="text"
            value={formData.allergies}
            onChange={handleChange}
          />
          <TextField
            label="Current Medication"
            name="currentMedication"
            type="text"
            value={formData.currentMedication}
            onChange={handleChange}
          />
          <TextField
            label="Family Medical History"
            name="familyMedicalHistory"
            type="text"
            value={formData.familyMedicalHistory}
            onChange={handleChange}
          />
          <TextField
            label="Past Medical History"
            name="pastMedicalHistory"
            type="text"
            value={formData.pastMedicalHistory}
            onChange={handleChange}
          />
          <SelectField
            label="Identification Type"
            name="identificationType"
            required
            value={formData.identificationType}
            onChange={handleChange}
          >
            <option value="">Select an identification type</option>
            <option value="birth certificate">Birth Certificate</option>
            <option value="passport">Passport</option>
            <option value="driver's license">Driver's License</option>
          </SelectField>
          <TextField
            label="Identification Number"
            name="identificationNumber"
            type="text"
            required
            value={formData.identificationNumber}
            onChange={handleChange}
          />
          <TextField
            label="Scanned Copy of Identification Document"
            name="identificationDocument"
            type="file"
            onChange={(e) => setFormData({ ...formData, identificationDocument: e.target.files[0] })}
          />
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="consentTreatment"
                checked={formData.consentTreatment}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-cyan-600"
              />
              <span>I consent to treatment</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="consentDisclosure"
                checked={formData.consentDisclosure}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-cyan-600"
              />
              <span>I consent to disclosure of information</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="consentPrivacyPolicy"
                checked={formData.consentPrivacyPolicy}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-cyan-600"
              />
              <span>I consent to the privacy policy</span>
            </label>
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Get Started
        </Button>
      </form>
    </AuthLayout>
  )
}

export default withAuth(PatientRegistration)
