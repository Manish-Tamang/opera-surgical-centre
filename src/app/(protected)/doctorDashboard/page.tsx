'use client'
import { useState, useEffect } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  MapPinIcon,
  PencilSquareIcon,
  CheckIcon,
  EllipsisHorizontalIcon,
  UserIcon,
  PaperClipIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import LogoImage from '@/images/logo.png'
import User from '@/images/user.png'
import { db } from '@/firebase/config'
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { parseCookies } from 'nookies'
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import { withAuth } from '@/components/AuthDoctorDashboard'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Appointment {
  id: string
  patient_name: string
  patient_email: string
  appointment_date: string
  approval: string
  note: string
  custom_address: string
}

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

async function sendApprovalEmail(appointment: Appointment) {
  try {
    const response = await fetch('/api/appointment-approve-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_name: appointment.patient_name,
        patient_email: appointment.patient_email,
        appointment_date: appointment.appointment_date,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }
    alert('Approval email sent successfully!')
  } catch (error) {
    console.error('Error sending approval email: ', error)
    alert('Error sending approval email')
  }
}

function DoctorDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [doctorId, setDoctorId] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const [days, setDays] = useState<
    { date: string; isCurrentMonth: boolean; isToday: boolean }[]
  >([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showInfo, setShowInfo] = useState<boolean>(false)
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null)

  useEffect(() => {
    const cookies = parseCookies()
    setUserEmail(cookies.userEmail || '')
    setDoctorId(cookies.doctorID)
    const fetchAppointments = async () => {
      if (doctorId) {
        const q = query(
          collection(db, 'appointments'),
          where('doctor_id', '==', doctorId),
        )
        const querySnapshot = await getDocs(q)

        const fetchedAppointments: Appointment[] = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          fetchedAppointments.push({
            id: doc.id,
            patient_name: data.patient_name,
            patient_email: data.patient_email,
            appointment_date: data.appointment_date,
            note: data.note,
            approval: data.approval,
            custom_address: data.custom_address,
          })
        })

        setAppointments(fetchedAppointments)
      }
    }

    fetchAppointments()
  }, [doctorId])

  useEffect(() => {
    const start = startOfMonth(selectedDate)
    const end = endOfMonth(selectedDate)
    const daysArray = eachDayOfInterval({ start, end }).map((day) => ({
      date: format(day, 'yyyy-MM-dd'),
      isCurrentMonth: true,
      isToday: format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
    }))
    setDays(daysArray)
  }, [selectedDate])

  const handleDateChange = (direction: number) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() + direction)
      return newDate
    })
  }

  const handleViewClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setShowInfo(true)
  }

  const handleCancel = async (appointment: Appointment) => {
    try {
      const appointmentDoc = doc(db, 'appointments', appointment.id)
      await updateDoc(appointmentDoc, { approval: 'cancelled' })
      alert('Appointment cancelled successfully!')
      setAppointments(
        appointments.map((appt) =>
          appt.id === appointment.id
            ? { ...appt, approval: 'cancelled' }
            : appt,
        ),
      )
    } catch (error) {
      console.error('Error cancelling appointment: ', error)
      alert('Error cancelling appointment')
    }
  }

  const handleApprove = async (appointment: Appointment) => {
    try {
      const appointmentDoc = doc(db, 'appointments', appointment.id)
      await updateDoc(appointmentDoc, { approval: 'approved' })
      alert('Appointment approved successfully!')
      setAppointments(
        appointments.map((appt) =>
          appt.id === appointment.id ? { ...appt, approval: 'approved' } : appt,
        ),
      )
      await sendApprovalEmail(appointment)
    } catch (error) {
      console.error('Error approving appointment: ', error)
      alert('Error approving appointment')
    }
  }

  return (
    <div className="min-h-full">
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-6 text-gray-900">
                Upcoming Appointments
              </h2>
              <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                  <div className="flex items-center text-gray-900">
                    <button
                      type="button"
                      className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                      onClick={() => handleDateChange(-1)}
                    >
                      <span className="sr-only">Previous month</span>
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <div className="flex-auto text-sm font-semibold">
                      {format(selectedDate, 'MMMM yyyy')}
                    </div>
                    <button
                      type="button"
                      className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                      onClick={() => handleDateChange(1)}
                    >
                      <span className="sr-only">Next month</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                    <div>M</div>
                    <div>T</div>
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>
                    <div>S</div>
                    <div>S</div>
                  </div>
                  <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                    {days.map((day, dayIdx) => (
                      <button
                        key={day.date}
                        type="button"
                        className={classNames(
                          'py-1.5 hover:bg-gray-100 focus:z-10',
                          day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                          day.isToday ? 'font-semibold text-indigo-600' : '',
                          dayIdx === 0 && 'rounded-tl-lg',
                          dayIdx === 6 && 'rounded-tr-lg',
                          dayIdx === days.length - 7 && 'rounded-bl-lg',
                          dayIdx === days.length - 1 && 'rounded-br-lg',
                        )}
                      >
                        <time
                          dateTime={day.date}
                          className={classNames(
                            'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                            day.isToday
                              ? 'bg-indigo-600 text-white'
                              : 'text-gray-900',
                          )}
                        >
                          {format(new Date(day.date), 'd')}
                        </time>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-8 lg:row-start-1">
                  <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
                    {appointments.map((appointment) => (
                      <li
                        key={appointment.id}
                        className="relative flex space-x-6 py-6 xl:static"
                      >
                        <Image
                          src={User}
                          alt="user"
                          className="h-14 w-14 flex-none rounded-full"
                        />
                        <div className="flex-auto">
                          <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                            {appointment.patient_name}
                          </h3>
                          <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                            <div className="flex items-start space-x-3">
                              <dt className="mt-0.5">
                                <span className="sr-only">Date</span>
                                <CalendarIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </dt>
                              <dd>
                                <time dateTime={appointment.appointment_date}>
                                  {appointment.appointment_date}
                                </time>
                              </dd>
                            </div>
                            <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                              <dt className="mt-0.5">
                                <span className="sr-only">Location</span>
                                <MapPinIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </dt>
                              <dd>
                                {appointment.custom_address ||
                                  'Opera Surgical Centre'}
                              </dd>
                            </div>
                            <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                              <dt className="mt-0.5">
                                <span className="sr-only">Note</span>
                                <PencilSquareIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </dt>
                              <dd>
                                {appointment.note || 'No additional notes'}
                              </dd>
                            </div>
                            <div className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                              <dt className="mt-0.5">
                                <span className="sr-only">Approval Status</span>
                              </dt>
                              <span
                                className={`inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                                  appointment.approval === 'cancelled'
                                    ? 'bg-red-50 text-red-700 ring-red-600/20'
                                    : appointment.approval === 'approved'
                                      ? 'bg-blue-50 text-blue-700 ring-blue-600/20'
                                      : 'bg-green-50 text-green-700 ring-green-600/20'
                                }`}
                              >
                                <dd>{appointment.approval || 'pending'}</dd>
                              </span>
                            </div>
                          </dl>
                        </div>
                        <Menu
                          as="div"
                          className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center"
                        >
                          <div>
                            <MenuButton className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                              <span className="sr-only">Open options</span>
                              <EllipsisHorizontalIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </MenuButton>
                          </div>
                          <MenuItems className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                            <div className="py-1">
                              <MenuItem>
                                <button
                                  type="button"
                                  className="block px-4 py-2 text-sm text-gray-700"
                                  onClick={() => handleViewClick(appointment)}
                                >
                                  View
                                </button>
                              </MenuItem>
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleApprove(appointment)}
                                    className={classNames(
                                      'block px-4 py-2 text-sm',
                                      active
                                        ? 'bg-green-100 text-green-900'
                                        : 'text-green-700',
                                    )}
                                  >
                                    Approve
                                  </button>
                                )}
                              </MenuItem>
                              <MenuItem>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleCancel(appointment)}
                                    className={classNames(
                                      'block px-4 py-2 text-sm',
                                      active
                                        ? 'bg-red-100 text-red-900'
                                        : 'text-red-700',
                                    )}
                                  >
                                    Cancel
                                  </button>
                                )}
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </Menu>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {showInfo && selectedAppointment && (
                <Dialog open={showInfo} onClose={() => setShowInfo(false)}>
                  <DialogPanel className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative rounded-lg bg-white p-8">
                      <button
                        onClick={() => setShowInfo(false)}
                        className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                      >
                        <EllipsisHorizontalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                      <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                          Appointment Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                          Personal details and Note.
                        </p>
                      </div>
                      <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              Full name
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {selectedAppointment.patient_name}
                            </dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              Patient email
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {selectedAppointment.patient_email}
                            </dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              Appointment Date
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {selectedAppointment.appointment_date}
                            </dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              Note to Doctor
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {selectedAppointment.note ||
                                'No additional notes'}
                            </dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              Custom Address for Doctor Visit
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {selectedAppointment.custom_address ||
                                'Opera Surgical Centre'}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </DialogPanel>
                </Dialog>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default withAuth(DoctorDashboard)
