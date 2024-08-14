'use client'

import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { Button, TextField, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material'

export default function PatientRegister() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [occupation, setOccupation] = useState('')
  const [emergencyContactName, setEmergencyContactName] = useState('')
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('')
  const [primaryPhysician, setPrimaryPhysician] = useState('')
  const [insuranceProvider, setInsuranceProvider] = useState('')
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState('')
  const [allergies, setAllergies] = useState('')
  const [currentMedication, setCurrentMedication] = useState('')
  const [familyMedicalHistory, setFamilyMedicalHistory] = useState('')
  const [pastMedicalHistory, setPastMedicalHistory] = useState('')
  const [identificationType, setIdentificationType] = useState('')
  const [identificationNumber, setIdentificationNumber] = useState('')
  const [consentToTreatment, setConsentToTreatment] = useState(false)
  const [consentToDisclosure, setConsentToDisclosure] = useState(false)
  const [consentToPrivacy, setConsentToPrivacy] = useState(false)
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await addDoc(collection(db, 'patients'), {
        fullName,
        email,
        phone,
        dob,
        gender,
        address,
        occupation,
        emergencyContactName,
        emergencyContactNumber,
        primaryPhysician,
        insuranceProvider,
        insurancePolicyNumber,
        allergies,
        currentMedication,
        familyMedicalHistory,
        pastMedicalHistory,
        identificationType,
        identificationNumber,
        consentToTreatment,
        consentToDisclosure,
        consentToPrivacy
      })
      alert('Patient registered successfully')
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />
          <Select
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <TextField
            label="Occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
          />
          <TextField
            label="Emergency Contact Name"
            value={emergencyContactName}
            onChange={(e) => setEmergencyContactName(e.target.value)}
            required
          />
          <TextField
            label="Emergency Contact Number"
            value={emergencyContactNumber}
            onChange={(e) => setEmergencyContactNumber(e.target.value)}
            required
          />
          <TextField
            label="Primary Physician"
            value={primaryPhysician}
            onChange={(e) => setPrimaryPhysician(e.target.value)}
            required
          />
          <TextField
            label="Insurance Provider"
            value={insuranceProvider}
            onChange={(e) => setInsuranceProvider(e.target.value)}
            required
          />
          <TextField
            label="Insurance Policy Number"
            value={insurancePolicyNumber}
            onChange={(e) => setInsurancePolicyNumber(e.target.value)}
            required
          />
          <TextField
            label="Allergies (if any)"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
          <TextField
            label="Current Medication (if any)"
            value={currentMedication}
            onChange={(e) => setCurrentMedication(e.target.value)}
          />
          <TextField
            label="Family Medical History"
            value={familyMedicalHistory}
            onChange={(e) => setFamilyMedicalHistory(e.target.value)}
          />
          <TextField
            label="Past Medical History"
            value={pastMedicalHistory}
            onChange={(e) => setPastMedicalHistory(e.target.value)}
          />
          <TextField
            label="Identification Type"
            value={identificationType}
            onChange={(e) => setIdentificationType(e.target.value)}
            required
          />
          <TextField
            label="Identification Number"
            value={identificationNumber}
            onChange={(e) => setIdentificationNumber(e.target.value)}
            required
          />
          <div className="col-span-2">
            <FormControlLabel
              control={
                <Checkbox
                  checked={consentToTreatment}
                  onChange={(e) => setConsentToTreatment(e.target.checked)}
                />
              }
              label="I consent to treatment"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={consentToDisclosure}
                  onChange={(e) => setConsentToDisclosure(e.target.checked)}
                />
              }
              label="I consent to disclosure of information"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={consentToPrivacy}
                  onChange={(e) => setConsentToPrivacy(e.target.checked)}
                />
              }
              label="I consent to privacy policy"
            />
          </div>
        </div>
        <Button type="submit" color="primary" variant="contained" className="mt-4">
          Register
        </Button>
      </form>
    </div>
  )
}
