'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { withAuth } from '@/components/AuthContactDashboard'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon as XMarkIconOutline, BellIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import LogoImage from '@/images/logo.png'

function ContactDashboard() {
  const [contactData, setContactData] = useState<any[]>([])
  const [selectedContact, setSelectedContact] = useState<any>(null)
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contact_form'))
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setContactData(data)
      } catch (error) {
        console.error('Error fetching contact data: ', error)
      }
    }

    fetchContactData()
  }, [])

  const handleViewClick = (contact: any) => {
    setSelectedContact(contact)
    setShowInfo(true)
  }

  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Contact Form Data
                  </h1>
                  <p className="mt-2 text-sm text-gray-700">
                    A list of all the Contact form submissions in Opera Surgical Centre.
                  </p>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Message
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Website
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                          >
                            <span className="sr-only">View</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {contactData.map((contact) => (
                          <tr key={contact.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              {contact.firstName} {contact.lastName}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {contact.email}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {contact.message}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {contact.website}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <button
                                type="button"
                                className="text-indigo-600 hover:text-indigo-900"
                                onClick={() => handleViewClick(contact)}
                              >
                                View
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
          </div>
        </div>
      </main>

      {showInfo && selectedContact && (
        <Dialog open={showInfo} onClose={() => setShowInfo(false)}>
          <DialogPanel className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative rounded-lg bg-white p-8">
              <button
                onClick={() => setShowInfo(false)}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIconOutline className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Contact Form Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Details of the selected contact form submission.
                </p>
              </div>
              <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Full Name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedContact.firstName} {selectedContact.lastName}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Email
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedContact.email}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Message
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedContact.message || 'No message provided'}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Website
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {selectedContact.website || 'No website provided'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </>
  )
}

export default withAuth(ContactDashboard)
