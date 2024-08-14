'use client'
import { useState, useEffect } from 'react'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { Dialog, DialogPanel, Label } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon as XMarkIconOutline,
  BellIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import LogoImage from '@/images/logo.png'
import { addDoc } from 'firebase/firestore'
import { withAuth } from '@/components/AuthDashboard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  address: string
  job_title: string
  activated: boolean
  role?: string
  imageUrl?: string
  registered_at?: string
}

interface Doctor {
  id: string
  first_name: string
  last_name: string
  email: string
  specialization: string
  registration_date: string
}

interface FormData {
  first_name: string
  last_name: string
  email: string
  address: string
  job_title: string
}

interface NewUserFormData extends FormData {
  role: string
  password: string
}

interface NewDoctorFormData {
  first_name: string
  last_name: string
  email: string
  specialization: string
  registration_date: string
  password: string
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [editUser, setEditUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    job_title: '',
  })
  const [showAddUserForm, setShowAddUserForm] = useState(false)
  const [newUserFormData, setNewUserFormData] = useState<NewUserFormData>({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    role: 'user',
    job_title: '',
    password: '',
  })
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false)
  const [newDoctorFormData, setNewDoctorFormData] = useState<NewDoctorFormData>(
    {
      first_name: '',
      last_name: '',
      email: '',
      specialization: '',
      registration_date: '',
      password: '',
    },
  )
  const [doctors, setDoctors] = useState<Doctor[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'))
        const usersData = querySnapshot.docs.map((doc) => {
          const data = doc.data() as User
          return {
            id: doc.id,
            ...data,
          }
        })
        setUsers(usersData)

        // Update each user's document in Firestore with additional fields if needed
        usersData.forEach(async (user) => {
          if (!user.activated) {
            // Example of updating the user's document in Firestore
            await updateDoc(doc(db, 'users', user.id), {
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              registered_at: new Date().toISOString(), // Adjust the date format as needed
              activated: false,
              imageUrl: user.imageUrl || '', // Assuming you have an image URL field
            })
          }
        })
      } catch (error) {
        console.error('Error fetching users: ', error)
      }
    }

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
      }
    }

    fetchUsers()
    fetchDoctors()
  }, [])

  const handleEdit = (user: User) => {
    setEditUser(user)
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      address: user.address,
      job_title: user.job_title,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewUserFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleAddUser = async () => {
    try {
      const docRef = await addDoc(collection(db, 'users'), newUserFormData)
      setUsers((prevUsers) => [
        ...prevUsers,
        { id: docRef.id, ...newUserFormData },
      ])
      setShowAddUserForm(false)
      setNewUserFormData({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        job_title: '',
        role: 'user',
        password: '',
      })
      alert('User added successfully!')
    } catch (error) {
      console.error('Error adding user: ', error)
      alert('Error adding user')
    }
  }

  const handleUpdate = async () => {
    if (!editUser) return
    try {
      const userDoc = doc(db, 'users', editUser.id)
      await updateDoc(userDoc, formData)
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editUser.id ? { ...user, ...formData } : user,
        ),
      )
      setEditUser(null)
      alert('User updated successfully!')
    } catch (error) {
      console.error('Error updating user: ', error)
      alert('Error updating user')
    }
  }

  const handleNewDoctorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewDoctorFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleAddDoctor = async () => {
    try {
      const docRef = await addDoc(collection(db, 'doctors'), newDoctorFormData)
      setDoctors((prevDoctors) => [
        ...prevDoctors,
        { id: docRef.id, ...newDoctorFormData },
      ])
      setShowAddDoctorForm(false)
      setNewDoctorFormData({
        first_name: '',
        last_name: '',
        email: '',
        specialization: '',
        registration_date: '',
        password: '',
      })
      alert('Doctor added successfully!')
    } catch (error) {
      console.error('Error adding doctor: ', error)
      alert('Error adding doctor')
    }
  }

  const handleToggle = async (
    userId: string,
    currentStatus: boolean,
    first_name: string,
    last_name: string,
    email: string,
  ) => {
    try {
      const userDoc = doc(db, 'users', userId)
      await updateDoc(userDoc, {
        activated: !currentStatus,
        role: !currentStatus ? 'user' : '',
      })
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? {
                ...user,
                activated: !currentStatus,
                role: !currentStatus ? 'user' : '',
              }
            : user,
        ),
      )
      toast.success(
        `User ${!currentStatus ? 'activated' : 'deactivated'} successfully!`,
      )
    } catch (error) {
      console.error('Error updating user status:', error)
      toast.error('Error updating user status')
    }
  }
  return (
    <>
      <main>
        <ToastContainer />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Users
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the users including their name, job, email and
                  address.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  onClick={() => setShowAddUserForm(true)}
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add user
                </button>
              </div>

              {showAddUserForm && (
                <Dialog
                  open={showAddUserForm}
                  onClose={() => setShowAddUserForm(false)}
                >
                  <DialogPanel className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="rounded-lg bg-white p-8">
                      <h2 className="mb-4 text-xl font-semibold">
                        Add New User
                      </h2>
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4">
                          <label
                            htmlFor="first_name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First Name
                          </label>
                          <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            value={newUserFormData.first_name}
                            onChange={handleNewUserChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="last_name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last Name
                          </label>
                          <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            value={newUserFormData.last_name}
                            onChange={handleNewUserChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={newUserFormData.email}
                            onChange={handleNewUserChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={newUserFormData.password}
                            onChange={handleNewUserChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Password"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="job_title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Job Title
                          </label>
                          <input
                            id="job_title"
                            name="job_title"
                            type="text"
                            value={newUserFormData.job_title}
                            onChange={handleNewUserChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Address
                          </label>
                          <input
                            id="address"
                            name="address"
                            type="text"
                            value={newUserFormData.address}
                            onChange={handleNewUserChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setShowAddUserForm(false)}
                            className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleAddUser}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-white"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </DialogPanel>
                </Dialog>
              )}
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
                          Job
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
                          Address
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Activation
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {user.first_name} {user.last_name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.job_title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {user.address}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <label className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition">
                              <input
                                className="peer sr-only"
                                type="checkbox"
                                checked={user.activated}
                                onChange={() =>
                                  handleToggle(user.id, user.activated)
                                }
                              />
                              <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
                            </label>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              onClick={() => handleEdit(user)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                              <span className="sr-only">
                                , {user.first_name}
                              </span>
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
          <div className="mt-8 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Doctors
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the registered doctors including Name, Email,
                  and Specialization.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  onClick={() => setShowAddDoctorForm(true)}
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Doctor
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr className="divide-x divide-gray-200">
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Specialization
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                        >
                          Date of Registration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {doctors.map((doctor) => (
                        <tr
                          key={doctor.id}
                          className="divide-x divide-gray-200"
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                            {doctor.first_name} {doctor.last_name}
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                            {doctor.specialization}
                          </td>
                          <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                            {doctor.email}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                            {doctor.registration_date
                              ? new Date(
                                  doctor.registration_date,
                                ).toLocaleDateString()
                              : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {showAddDoctorForm && (
            <Dialog
              open={showAddDoctorForm}
              onClose={() => setShowAddDoctorForm(false)}
            >
              <DialogPanel className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="rounded-lg bg-white p-8">
                  <h2 className="mb-4 text-xl font-semibold">Add New Doctor</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={newDoctorFormData.first_name}
                        onChange={handleNewDoctorChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={newDoctorFormData.last_name}
                        onChange={handleNewDoctorChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={newDoctorFormData.email}
                        onChange={handleNewDoctorChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={newDoctorFormData.password}
                        onChange={handleNewDoctorChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Password"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="specialization"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Specialization
                      </label>
                      <input
                        id="specialization"
                        name="specialization"
                        type="text"
                        value={newDoctorFormData.specialization}
                        onChange={handleNewDoctorChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="registration_date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date of Registration
                      </label>
                      <input
                        id="registration_date"
                        name="registration_date"
                        type="date"
                        value={newDoctorFormData.registration_date}
                        onChange={handleNewDoctorChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowAddDoctorForm(false)}
                        className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddDoctor}
                        className="rounded-md bg-indigo-600 px-4 py-2 text-white"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </Dialog>
          )}
        </div>
      </main>

      {editUser && (
        <Dialog open={Boolean(editUser)} onClose={() => setEditUser(null)}>
          <DialogPanel className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-8">
              <h2 className="mb-4 text-xl font-semibold">Edit User</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="job_title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    id="job_title"
                    name="job_title"
                    type="text"
                    value={formData.job_title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setEditUser(null)}
                    className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="rounded-md bg-indigo-600 px-4 py-2 text-white"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </>
  )
}

export default withAuth(Dashboard)
