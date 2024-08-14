'use client'
import { useEffect, useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
} from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import LogoImage from '@/images/logo.png'
import { useRouter } from 'next/navigation'
import nookies from 'nookies'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'

interface User {
  email: string
  image_url: string | null
}

const Navbar: React.FC = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const cookies = nookies.get()
        const doctorId = cookies.doctorID

        if (doctorId) {
          const userDoc = await getDoc(doc(db, 'doctors', doctorId))
          if (userDoc.exists()) {
            setUser(userDoc.data() as User)
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
    nookies.destroy(null, 'doctorID')
    router.push('/doctorLogin')
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
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  {user?.image_url ? (
                    <img
                      height={32}
                      width={32}
                      className="h-8 w-8 rounded-full"
                      src={user.image_url}
                      alt="Profile"
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
                      className={`block w-full px-4 py-2 text-left text-sm text-gray-700 ${
                        active ? 'bg-gray-100' : ''
                      }`}
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
        <div className="border-t border-gray-200 pb-3 pt-4">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              {user?.image_url ? (
                <Image
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                  src={user.image_url}
                  alt="Profile"
                />
              ) : (
                <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
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
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                {user?.email}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <Disclosure.Button
              as="button"
              onClick={handleSignOut}
              className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              Sign out
            </Disclosure.Button>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navbar
