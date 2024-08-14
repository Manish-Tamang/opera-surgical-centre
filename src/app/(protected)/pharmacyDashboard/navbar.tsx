'use client'

import { useEffect, useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
} from '@headlessui/react'
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import LogoImage from '@/images/logo.png'
import { useRouter } from 'next/navigation'
import nookies from 'nookies'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<{
    email: string
    imageUrl: string | null
  } | null>(null)
  const [activeTab, setActiveTab] = useState<string>('pharmacyDashboard')

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const cookies = nookies.get()
        const userId = cookies.userID

        if (userId) {
          const userDoc = await getDoc(doc(db, 'users', userId))
          if (userDoc.exists()) {
            setUser(
              userDoc.data() as { email: string; imageUrl: string | null },
            )
          }
        }
      } catch (error) {
        console.error('Error fetching user details: ', error)
      }
    }

    fetchUserDetails()
  }, [])

  const handleSignOut = () => {
    nookies.destroy(null, 'userAuthToken')
    nookies.destroy(null, 'role')
    nookies.destroy(null, 'userID')
    router.push('/pharmacistLogin')
  }

  return (
    <Disclosure as="nav" className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Image
                src={LogoImage}
                alt="Opera SC logo"
                width={500}
                height={300}
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/pharmacyDashboard"
                onClick={() => setActiveTab('pharmacyDashboard')}
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${activeTab === 'pharmacyDashboard' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
              >
                Pharmacy Dashboard
              </a>
              <a
                href="/pharmacyDashboard/medications"
                onClick={() => setActiveTab('medications')}
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${activeTab === 'medications' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
              >
                Medications
              </a>
              <a
                href="/pharmacyDashboard/orders"
                onClick={() => setActiveTab('orders')}
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${activeTab === 'orders' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
              >
                Orders
              </a>
              <a
                href="/pharmacyDashboard/calendar"
                onClick={() => setActiveTab('calendar')}
                className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${activeTab === 'calendar' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
              >
                Calendar
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              type="button"
              className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  {user?.imageUrl ? (
                    <Image
                      height={8}
                      width={8}
                      className="h-8 w-8 rounded-full"
                      src={user.imageUrl}
                      alt="User profile picture"
                      priority={true}
                    />
                  ) : (
                    <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2a5 5 0 015 5 5 5 0 01-4.042 4.912c.066.062.129.127.192.195a7.002 7.002 0 010 8.41A5 5 0 017 12h2a3 3 0 100-6 3 3 0 103 3h2a7 7 0 110 8 7 7 0 010-8.41 7.003 7.003 0 01-.192-.195A5.002 5.002 0 0112 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </MenuButton>
              </div>
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleSignOut}
                      className={`block w-full px-4 py-2 text-left text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pb-3 pt-2">
          <Disclosure.Button
            as="a"
            href="/pharmacyDashboard"
            onClick={() => setActiveTab('pharmacyDashboard')}
            className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${activeTab === 'pharmacyDashboard' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'}`}
          >
            Pharmacy Dashboard
          </Disclosure.Button>
          <Disclosure.Button
            as="a"
            href="/pharmacyDashboard/medications"
            onClick={() => setActiveTab('medications')}
            className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${activeTab === 'medications' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'}`}
          >
            Medications
          </Disclosure.Button>
          <Disclosure.Button
            as="a"
            href="/pharmacyDashboard/orders"
            onClick={() => setActiveTab('orders')}
            className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${activeTab === 'orders' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'}`}
          >
            Orders
          </Disclosure.Button>
          <Disclosure.Button
            as="a"
            href="/pharmacyDashboard/calendar"
            onClick={() => setActiveTab('calendar')}
            className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${activeTab === 'calendar' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'}`}
          >
            Calendar
          </Disclosure.Button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navbar
