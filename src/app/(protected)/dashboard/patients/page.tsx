'use client'

import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface Patient {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  gender: string
  address: string
  occupation: string
  emergencyContactName: string
  emergencyContactNumber: string
  primaryPhysician: string
  insuranceProvider: string
  insurancePolicyNumber: string
  allergies: string
  currentMedication: string
  familyMedicalHistory: string
  pastMedicalHistory: string
  identificationType: string
  identificationNumber: string
  identificationDocument: string
  consentTreatment: boolean
  consentDisclosure: boolean
  consentPrivacyPolicy: boolean
}

export default function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchPatients = async () => {
      const patientsCollection = collection(db, 'patients')
      const patientsSnapshot = await getDocs(patientsCollection)
      const patientsList = patientsSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Patient,
      )
      setPatients(patientsList)
    }

    fetchPatients()
  }, [])

  function openDialog(patient: Patient) {
    setSelectedPatient(patient)
    setIsOpen(true)
  }

  function closeDialog() {
    setIsOpen(false)
  }

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Patients
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all registered patients including their name, email,
              phone number, and more.
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Full Name
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Phone Number
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date of Birth
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {patient.fullName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {patient.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {patient.phoneNumber}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {patient.dateOfBirth}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => openDialog(patient)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                          <span className="sr-only">, {patient.fullName}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDialog}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Patient Details
                      </Dialog.Title>
                      {selectedPatient && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            <strong>Full Name:</strong>{' '}
                            {selectedPatient.fullName}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Email:</strong> {selectedPatient.email}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Phone Number:</strong>{' '}
                            {selectedPatient.phoneNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Date of Birth:</strong>{' '}
                            {selectedPatient.dateOfBirth}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Gender:</strong> {selectedPatient.gender}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Address:</strong> {selectedPatient.address}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Occupation:</strong>{' '}
                            {selectedPatient.occupation}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Emergency Contact Name:</strong>{' '}
                            {selectedPatient.emergencyContactName}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Emergency Contact Number:</strong>{' '}
                            {selectedPatient.emergencyContactNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Primary Physician:</strong>{' '}
                            {selectedPatient.primaryPhysician}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Insurance Provider:</strong>{' '}
                            {selectedPatient.insuranceProvider}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Insurance Policy Number:</strong>{' '}
                            {selectedPatient.insurancePolicyNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Allergies:</strong>{' '}
                            {selectedPatient.allergies}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Current Medication:</strong>{' '}
                            {selectedPatient.currentMedication}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Family Medical History:</strong>{' '}
                            {selectedPatient.familyMedicalHistory}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Past Medical History:</strong>{' '}
                            {selectedPatient.pastMedicalHistory}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Identification Type:</strong>{' '}
                            {selectedPatient.identificationType}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Identification Number:</strong>{' '}
                            {selectedPatient.identificationNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Consent to Treatment:</strong>{' '}
                            {selectedPatient.consentTreatment ? 'Yes' : 'No'}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Consent to Disclosure:</strong>{' '}
                            {selectedPatient.consentDisclosure ? 'Yes' : 'No'}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Consent to Privacy Policy:</strong>{' '}
                            {selectedPatient.consentPrivacyPolicy
                              ? 'Yes'
                              : 'No'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:text-sm"
                      onClick={closeDialog}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  )
}
